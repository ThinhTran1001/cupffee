import { prisma } from "@/lib/prisma";
import { formatPriceVnd } from "@/lib/formatPrice";
import { QRCodeSVG } from "qrcode.react";
import { headers } from "next/headers";

export default async function AdminOrdersPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const orders = await prisma.order.findMany({
    take: 50,
    include: {
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản Lí Đơn Hàng</h1>
        <p className="text-gray-500 mt-1">
          {orders.length} đơn hàng
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có đơn hàng</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Khi khách đặt hàng từ giỏ, đơn sẽ xuất hiện tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Mã đơn
                  </p>
                  <p className="text-base font-bold text-gray-900">{order.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Thời gian</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 mb-1">{item.productName}</p>
                      <p className="text-gray-500">
                        SL: {item.quantity} x {formatPriceVnd(item.unitPriceVnd)}
                      </p>
                      <p className="font-bold text-[#6d3018] tabular-nums mt-1">
                        Tổng cộng: {formatPriceVnd(item.unitPriceVnd * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm shrink-0">
                      <QRCodeSVG
                        value={item.qrMessageId ? `${baseUrl}/m/${item.qrMessageId}` : `${baseUrl}/products/${item.productId}`}
                        size={64}
                        level="M"
                        includeMargin
                        fgColor="#4a2c20"
                        bgColor="#ffffff"
                      />
                      <div className="max-w-[150px]">
                        <p className="text-xs font-semibold text-gray-900">
                          {item.qrMessageId ? "QR Sản Phẩm" : "QR Mặc Định"}
                        </p>
                        <a
                          href={item.qrMessageId ? `${baseUrl}/m/${item.qrMessageId}` : `${baseUrl}/products/${item.productId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-blue-600 hover:underline break-all"
                        >
                          Tới link
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-600">
                  Tổng sản phẩm: <strong>{order.totalItems}</strong>
                </span>
                <span className="text-base font-bold text-[#6d3018]">
                  {formatPriceVnd(order.totalVnd)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
