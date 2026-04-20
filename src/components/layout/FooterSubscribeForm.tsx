"use client";

export default function FooterSubscribeForm() {
  return (
    <form
      className="flex flex-col gap-3"
      action="#"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex border border-white/70 rounded-sm overflow-hidden max-w-md">
        <label htmlFor="footer-email" className="sr-only">
          Email
        </label>
        <input
          id="footer-email"
          type="email"
          placeholder="Nhập địa chỉ email"
          className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm placeholder:text-white/45 outline-none"
        />
        <button
          type="submit"
          className="px-3 border-l border-white/40 hover:bg-white/10 transition-colors"
          aria-label="Đăng ký"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
            aria-hidden
          >
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-white/75 cursor-pointer max-w-md">
        <input type="checkbox" className="mt-0.5 rounded border-white/50" />
        <span>
          Bằng việc gửi email, bạn đồng ý nhận email quảng cáo từ CUPFFEE.
        </span>
      </label>
    </form>
  );
}
