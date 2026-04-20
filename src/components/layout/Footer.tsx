import Link from "next/link";
import FooterSubscribeForm from "@/components/layout/FooterSubscribeForm";

function SocialIcon({ name }: { name: "instagram" | "facebook" | "pinterest" | "tiktok" }) {
  const common = "h-5 w-5 fill-current";
  switch (name) {
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5ZM18 6.9a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 18 6.9Zm-6 2.1a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 9Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M13.5 22v-8.2h2.7l.5-3.3h-3.2V8.6c0-.9.25-1.5 1.6-1.5h1.7V4.1A22.9 22.9 0 0 0 14 4c-2.5 0-4.2 1.5-4.2 4.3v2.4H7v3.3h2.8V22h3.7Z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2a10 10 0 0 0-3.4 19.4c-.1-1.4-.3-3.6.1-5.1l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .9-.6 2.2-.9 3.4-.3 1 .6 1.8 1.8 1.8 2.1 0 3.8-2.2 3.8-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.4 2.6-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.3 1.3c0 .2-.2.2-.3.1-1.2-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.3-5.3 6.3-1 0-2-.5-2.3-1.2l-.6 2.4c-.2 1-1 2.3-1.5 3A10 10 0 1 0 12 2Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M16.6 5.8c.9.9 2.1 1.5 3.4 1.5V9.9a5.7 5.7 0 0 1-3.4-1.1v7.4a6.4 6.4 0 1 1-6.4-6.4c.2 0 .4 0 .6.02v3.5a3 3 0 0 0-.6-.06 2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 2.9-2.9l.05-9.2Z" />
        </svg>
      );
  }
}

export default function Footer() {
  return (
    <footer className="bg-[#4b2416] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-bold leading-snug mb-4">
              Tham gia câu lạc bộ, giảm 15% vào ngày sinh nhật
            </h2>
            <FooterSubscribeForm />
            <div className="flex gap-4 mt-8">
              {(
                [
                  ["instagram", "Instagram"],
                  ["facebook", "Facebook"],
                  ["pinterest", "Pinterest"],
                  ["tiktok", "TikTok"],
                ] as const
              ).map(([id, label]) => (
                <a
                  key={id}
                  href="#"
                  className="text-white/90 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <SocialIcon name={id} />
                </a>
              ))}
            </div>
            <p className="mt-10 text-sm text-white/60">
              © {new Date().getFullYear()} CUPFFEE. Bảo lưu mọi quyền.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Về CUPFFEE</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Bộ sưu tập
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Bền vững
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Hệ thống hỗ trợ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <span className="text-white/80">Thông báo bản quyền</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Trợ giúp</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Đơn hàng &amp; vận chuyển
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Đổi trả &amp; hoàn tiền
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Câu hỏi thường gặp
                </span>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Tham gia</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Câu lạc bộ CUPFFEE
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Tuyển dụng
                </span>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Ghé thăm chúng tôi
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
