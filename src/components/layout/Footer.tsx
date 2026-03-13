import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3d1a08] text-[#f6ece0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-cupffee-without-bg.png"
                alt="Cupffee"
                width={48}
                height={48}
                className="w-10 h-10 object-contain brightness-200"
              />
              <span className="text-2xl font-bold text-[#e8c49a]">CUPFFEE</span>
            </Link>
            <p className="text-[#c8956c] text-sm leading-relaxed mb-6">
              The world&#39;s first edible cup — tasty as a cookie, green as the
              planet.
            </p>
            <div className="flex gap-4">
              {["facebook", "instagram", "tiktok", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-[#6d3018] flex items-center justify-center hover:bg-[#8b4513] transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs text-[#f6ece0] font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#e8c49a] font-bold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/reviews", label: "Reviews" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#c8956c] hover:text-[#f6ece0] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#e8c49a] font-bold mb-4 text-sm uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-2">
              {[
                "Edible Cup 110ml",
                "Edible Cup 220ml",
                "Sample Pack",
                "Branded Cups",
                "Bulk Orders",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-[#c8956c] hover:text-[#f6ece0] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#e8c49a] font-bold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-[#c8956c]">
              <div className="flex items-start gap-2">
                <span className="mt-0.5">📧</span>
                <span>info@cupffee.me</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5">📞</span>
                <span>+359 884 931 183</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>Bulgaria, Europe</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-6 block bg-[#6d3018] text-[#f6ece0] px-5 py-2 rounded-full text-sm font-semibold text-center hover:bg-[#8b4513] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="border-t border-[#6d3018] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#c8956c] text-sm">
            © 2024 Cupffee. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[#c8956c] hover:text-[#f6ece0] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#c8956c] hover:text-[#f6ece0] text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
