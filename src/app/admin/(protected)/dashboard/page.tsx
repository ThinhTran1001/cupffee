import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const [productCount, reviewCount, messageCount, pendingReviews] =
    await Promise.all([
      prisma.product.count(),
      prisma.review.count({ where: { approved: true } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.review.count({ where: { approved: false } }),
    ]);

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentReviews = await prisma.review.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    {
      label: "Tổng Sản Phẩm",
      value: productCount,
      icon: "📦",
      href: "/admin/products",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Đánh Giá Đã Duyệt",
      value: reviewCount,
      icon: "⭐",
      href: "/admin/reviews",
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "Tin Nhắn Chưa Đọc",
      value: messageCount,
      icon: "💬",
      href: "/admin/messages",
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Đánh Giá Chờ Duyệt",
      value: pendingReviews,
      icon: "⏳",
      href: "/admin/reviews",
      color: "bg-orange-50 text-orange-700",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tổng Quan</h1>
        <p className="text-gray-500 mt-1">
          Chào mừng trở lại, {session?.user?.name || "Admin"}! Dưới đây là tình hình hiện tại.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.color}`}
              >
                Xem tất cả
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Đánh Giá Chờ Duyệt</h2>
            <Link
              href="/admin/reviews"
              className="text-sm text-[#6d3018] hover:underline font-medium"
            >
              Xem Tất Cả →
            </Link>
          </div>
          {recentReviews.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm">Không có đánh giá chờ duyệt</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentReviews.map((r: any) => (
                <div key={r.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#6d3018] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {r.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-900">
                          {r.name}
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(r.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-500 text-xs">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {r.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Tin Nhắn Gần Đây</h2>
            <Link
              href="/admin/messages"
              className="text-sm text-[#6d3018] hover:underline font-medium"
            >
              Xem Tất Cả →
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <div className="text-3xl mb-2">📭</div>
              <p className="text-sm">Chưa có tin nhắn nào</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentMessages.map((msg: any) => (
                <div key={msg.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="w-2 h-2 bg-[#6d3018] rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{msg.email}</div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {msg.message}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/admin/products/new"
          className="bg-[#6d3018] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8b4513] transition-colors flex items-center gap-2"
        >
          <span>+</span> Thêm Sản Phẩm Mới
        </Link>
        <Link
          href="/admin/reviews"
          className="bg-white text-[#6d3018] border border-[#6d3018] px-6 py-3 rounded-xl font-semibold hover:bg-[#f6ece0] transition-colors"
        >
          Quản Lý Đánh Giá
        </Link>
      </div>
    </div>
  );
}
