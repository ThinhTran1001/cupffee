import type { Metadata } from "next";
import QrOrderClient from "@/components/order/QrOrderClient";

import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Cảm ơn & tạo QR — CUPFFEE",
  description: "Để lại lời nhắn và hình ảnh cho sản phẩm khi quét QR.",
};

export default async function OrderQrPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  let orderItems: any[] = [];
  if (orderId) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });
    if (order) {
      orderItems = order.items;
    }
  }

  return <QrOrderClient initialItems={orderItems} />;
}
