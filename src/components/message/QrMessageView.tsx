import Link from "next/link";
import CheckerboardStrip from "@/components/ui/CheckerboardStrip";

type Props = {
  content: string;
  fontSize: number;
  color: string;
  createdAt: Date;
  imageUrl?: string | null;
};

export default function QrMessageView({
  content,
  fontSize,
  color,
  createdAt,
  imageUrl,
}: Props) {
  const formatted = createdAt.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeFormatted = createdAt.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="flex min-h-[calc(100dvh-5rem)] flex-col bg-[#faf8f5] lg:min-h-[calc(100dvh-5.5rem)]"
      aria-label="Lời nhắn từ CUPFFEE"
    >
      <CheckerboardStrip cellSize={10} heightClass="h-4" />

      <div className="relative flex flex-1 flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#4B2C20]/4 blur-3xl" />
          <div className="absolute -right-16 bottom-32 h-64 w-64 rounded-full bg-[#c17a4a]/8 blur-3xl" />
        </div>

        <header className="relative z-10 mb-10 max-w-lg text-center sm:mb-12">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#4B2C20]/80">
            Thông điệp từ CUPFFEE
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-2xl font-bold tracking-tight text-[#4B2C20] transition-opacity hover:opacity-80 sm:text-3xl"
          >
            CUPFFEE
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-[#5c4037]/90">
            Ai đó đã để lại lời nhắn này cho bạn qua mã QR trên sản phẩm.
          </p>
        </header>

        <article
          className="relative z-10 w-full max-w-2xl rounded-2xl border border-[#e8dfd6] bg-white/90 px-6 py-10 shadow-[0_4px_40px_-12px_rgba(75,44,32,0.15)] backdrop-blur-sm sm:px-10 sm:py-12"
        >
          <span
            className="pointer-events-none absolute left-4 top-4 font-serif text-[5rem] leading-none text-[#4B2C20]/8 select-none sm:left-6 sm:top-6 sm:text-[6rem]"
            aria-hidden
          >
            &ldquo;
          </span>

          <div className="relative pt-4 sm:pt-2">
            <p
              className="text-center leading-[1.75] tracking-wide whitespace-pre-wrap"
              style={{
                fontSize: Math.min(Math.max(fontSize, 14), 28),
                color,
              }}
            >
              {content}
            </p>
            {imageUrl && (
              <div className="mt-8 relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                {/* We use standard img because we don't know dimensions, or we can use next/image with object-contain */}
                <img src={imageUrl} alt="Đính kèm" className="w-full h-full object-contain bg-neutral-100" loading="lazy" />
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center gap-1 border-t border-[#efe8e0] pt-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8a7268]">
              Gửi lúc
            </p>
            <time
              dateTime={createdAt.toISOString()}
              className="text-sm text-[#5c4037]"
            >
              {formatted}
              <span className="mx-2 text-[#c9bfb6]">·</span>
              {timeFormatted}
            </time>
          </div>
        </article>

        <div className="relative z-10 mt-12 flex flex-col items-center gap-4 sm:mt-14">
          <Link
            href="/products"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#4B2C20] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-[#3d2419] hover:shadow-lg"
          >
            Xem sản phẩm
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#6d4c3d] underline-offset-4 transition hover:text-[#4B2C20] hover:underline"
          >
            Về trang chủ
          </Link>
        </div>
      </div>

      <footer className="mt-auto bg-[#faf8f5]">
        <div className="border-t border-[#e8dfd6]/80 py-8 text-center">
          <p className="text-xs text-[#8a7268]">
            © {new Date().getFullYear()} CUPFFEE — The World&apos;s First Edible
            Cup
          </p>
        </div>
        <CheckerboardStrip cellSize={10} heightClass="h-4" />
      </footer>
    </div>
  );
}
