import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_LEN = 8000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const content = typeof body.content === "string" ? body.content.trim() : "";
    if (!content) {
      return NextResponse.json(
        { error: "Nội dung lời nhắn không được để trống." },
        { status: 400 }
      );
    }
    if (content.length > MAX_LEN) {
      return NextResponse.json(
        { error: `Nội dung tối đa ${MAX_LEN} ký tự.` },
        { status: 400 }
      );
    }

    const rawSize = Number(body.fontSize);
    const fontSize = Number.isFinite(rawSize)
      ? Math.min(48, Math.max(12, Math.round(rawSize)))
      : 16;

    const rawColor = typeof body.color === "string" ? body.color : "#4a2c20";
    const color = /^#[0-9A-Fa-f]{6}$/.test(rawColor) ? rawColor : "#4a2c20";

    const msg = await prisma.qrMessage.create({
      data: {
        content,
        fontSize,
        color,
      },
    });

    return NextResponse.json({ id: msg.id });
  } catch (e) {
    console.error("qr-messages POST", e);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
