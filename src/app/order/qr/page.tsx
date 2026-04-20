import type { Metadata } from "next";
import QrOrderClient from "@/components/order/QrOrderClient";

export const metadata: Metadata = {
  title: "Cảm ơn & tạo QR — CUPFFEE",
  description: "Để lại lời nhắn và hình ảnh cho sản phẩm khi quét QR.",
};

export default function OrderQrPage() {
  return <QrOrderClient />;
}
