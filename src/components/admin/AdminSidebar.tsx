"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const navItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/products", icon: "📦", label: "Products" },
  { href: "/admin/reviews", icon: "⭐", label: "Reviews" },
  { href: "/admin/orders", icon: "🛒", label: "Orders" },
  { href: "/admin/messages", icon: "💬", label: "Messages" },
  { href: "/admin/blog", icon: "📝", label: "Blog Posts" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#3d1a08] min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-[#6d3018]/50">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Cupffee"
            width={40}
            height={40}
            className="w-8 h-8 object-contain brightness-0 invert opacity-80"
          />
          <div>
            <div className="text-white font-bold text-sm">CUPFFEE</div>
            <div className="text-[#c8956c] text-xs">Admin Panel</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#6d3018] text-white"
                  : "text-[#c8956c] hover:bg-[#6d3018]/40 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#6d3018]/50 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#c8956c] hover:bg-[#6d3018]/40 hover:text-white transition-all"
        >
          <span>🌐</span> View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#c8956c] hover:bg-red-900/40 hover:text-red-300 transition-all text-left"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
