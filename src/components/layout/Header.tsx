"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#f6ece0]/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Cupffee Logo"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
            />
            <span className="text-xl lg:text-2xl font-bold text-[#6d3018]">
              CUPFFEE
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#6d3018] font-medium hover:text-[#8b4513] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6d3018] transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/products"
              className="bg-[#6d3018] text-[#f6ece0] px-5 py-2 rounded-full font-semibold hover:bg-[#8b4513] transition-colors text-sm"
            >
              Order Now
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#6d3018]"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`h-0.5 bg-[#6d3018] transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-[#6d3018] transition-all ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-[#6d3018] transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-[#f6ece0] border-t border-[#e8d5c0] py-4 px-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-[#6d3018] font-medium py-2 hover:text-[#8b4513] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="block bg-[#6d3018] text-[#f6ece0] px-5 py-2 rounded-full font-semibold text-center hover:bg-[#8b4513] transition-colors text-sm mt-4"
            >
              Order Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
