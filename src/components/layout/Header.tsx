"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import CheckerboardStrip from "@/components/ui/CheckerboardStrip";
import {
  readCart,
  cartTotalQuantity,
  CART_UPDATE_EVENT,
} from "@/lib/cart";

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 8V5a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v3M4 8h16l-1.2 12.1A2 2 0 0 1 16.8 22H7.2a2 2 0 0 1-1.987-1.79L4 8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartLinkHeader({
  cartCount,
  className = "",
  onNavigate,
}: {
  cartCount: number;
  className?: string;
  onNavigate?: () => void;
}) {
  const label = cartCount > 99 ? "99+" : String(cartCount);
  return (
    <Link
      href="/cart"
      onClick={onNavigate}
      className={`inline-flex items-center gap-2 text-[#4B2C20] transition-opacity hover:opacity-80 ${className}`}
    >
      <span
        className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full border border-[#4B2C20] px-1.5 text-[13px] font-semibold leading-none text-[#e11d48]"
        aria-label={`Giỏ hàng: ${cartCount} sản phẩm`}
      >
        {label}
      </span>
      <CartIcon className="shrink-0 text-[#4B2C20]" />
      <span className="text-xs font-semibold tracking-wide sm:text-sm">
        XEM GIỎ HÀNG
      </span>
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const syncCart = useCallback(() => {
    setCartCount(cartTotalQuantity(readCart()));
  }, []);

  useEffect(() => {
    syncCart();
    window.addEventListener(CART_UPDATE_EVENT, syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, [syncCart]);

  const navLinks = [
    { href: "/products", label: "SẢN PHẨM" },
    { href: "/about", label: "VỀ CUPFFEE" },
    { href: "/contact", label: "LIÊN HỆ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-[4.5rem]">
            <Link
              href="/"
              className="text-xl font-bold uppercase tracking-tight text-[#4B2C20] lg:text-2xl"
            >
              CUPFFEE
            </Link>

            <div className="hidden items-center gap-10 lg:flex">
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs font-medium uppercase tracking-wide text-[#4B2C20] transition-opacity hover:opacity-75 sm:text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <CartLinkHeader cartCount={cartCount} />
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              className="rounded-md p-2 text-[#4B2C20] lg:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Mở menu"
            >
              <div className="flex w-6 flex-col gap-1.5">
                <span
                  className={`h-0.5 bg-current transition-all ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`h-0.5 bg-current transition-all ${isMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-0.5 bg-current transition-all ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="space-y-1 border-t border-[#e8dfd6] py-4 pb-5 lg:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-sm font-medium uppercase tracking-wide text-[#4B2C20]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-1">
                <CartLinkHeader
                  cartCount={cartCount}
                  onNavigate={() => setIsMenuOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <CheckerboardStrip cellSize={10} heightClass="h-4" />
    </header>
  );
}
