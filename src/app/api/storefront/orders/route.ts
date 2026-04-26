import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { convertEurToVnd } from "@/lib/formatPrice";

type IncomingLine = {
  productId: string;
  quantity: number;
};

function isIncomingLine(value: unknown): value is IncomingLine {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as IncomingLine).productId === "string" &&
    typeof (value as IncomingLine).quantity === "number"
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { lines?: unknown; notes?: unknown };
    const linesRaw = Array.isArray(body.lines) ? body.lines : [];
    const lines = linesRaw.filter(isIncomingLine).filter((l) => l.quantity > 0);
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";

    if (lines.length === 0) {
      return NextResponse.json(
        { error: "Giỏ hàng trống hoặc dữ liệu không hợp lệ." },
        { status: 400 }
      );
    }

    const productIds = [...new Set(lines.map((l) => l.productId))];
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        inStock: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
      },
    });

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm hợp lệ để đặt hàng." },
        { status: 400 }
      );
    }

    const productMap = new Map(products.map((p) => [p.id, p]));
    const validLines = lines.filter((l) => productMap.has(l.productId));

    if (validLines.length === 0) {
      return NextResponse.json(
        { error: "Sản phẩm trong giỏ không còn khả dụng." },
        { status: 400 }
      );
    }

    const totalItems = validLines.reduce((sum, l) => sum + l.quantity, 0);
    const totalVnd = validLines.reduce((sum, l) => {
      const p = productMap.get(l.productId)!;
      return sum + convertEurToVnd(p.price) * l.quantity;
    }, 0);
    const code = `OD-${Date.now().toString().slice(-8)}`;

    const order = await prisma.order.create({
      data: {
        code,
        totalVnd,
        totalItems,
        notes: notes || null,
        items: {
          create: validLines.flatMap((line) => {
            const p = productMap.get(line.productId)!;
            return Array.from({ length: line.quantity }).map(() => ({
              productId: p.id,
              productName: p.name,
              unitPriceVnd: convertEurToVnd(p.price),
              quantity: 1,
              imageUrl: p.imageUrl,
              qrMessage: {
                create: {
                  content: `Cảm ơn bạn đã sử dụng sản phẩm ${p.name} từ CUPFFEE!`,
                  fontSize: 20,
                  color: "#4a2c20",
                },
              },
            }));
          }),
        },
      },
      select: { id: true, code: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
