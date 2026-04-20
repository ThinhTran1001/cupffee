"use client";

import Image from "next/image";

const ceramics = "/ceramics.png";

export default function HomeNewsletterBanner() {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center rounded-2xl border border-[#e8dfd6] bg-white px-6 py-10 lg:px-12 lg:py-12 shadow-sm justify-center">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-[#4a2c20] leading-tight mb-8">
              ĐĂNG KÝ NHẬN THÔNG BÁO ƯU ĐÃI
            </h2>
            <form
              className="flex max-w-md"
              action="#"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="home-newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="home-newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 min-w-0 rounded-l-md border border-[#c4bbb4] bg-white px-4 py-3 text-sm text-[#4a2c20] placeholder:text-[#8a7a72] outline-none focus:border-[#4a2c20]"
              />
              <button
                type="submit"
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-r-md bg-[#4a2c20] text-white hover:bg-[#3d2418] transition-colors"
                aria-label="Đăng ký"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] lg:min-w-0 rounded-xl overflow-hidden bg-white">
            <Image
              src={ceramics}
              alt="Bộ cốc gốm"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
