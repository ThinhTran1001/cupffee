import Image from "next/image";

const beans = "/bean.png";

const items = [
  "Giá trị cốt lõi đặt lên hàng đầu",
  "Không greenwashing",
  "Luôn phát triển để hoàn thiện hơn",
  "Minh bạch trong mọi khâu",
];

/** Mép không đều hai đầu — mỗi dòng một biến thể nhẹ */
const BANNER_CLIPS = [
  "polygon(0% 32%, 5% 6%, 22% 0%, 88% 10%, 100% 28%, 98% 58%, 100% 88%, 82% 100%, 18% 96%, 4% 82%)",
  "polygon(2% 18%, 0% 52%, 4% 88%, 16% 100%, 78% 94%, 100% 78%, 100% 28%, 92% 6%, 38% 0%, 12% 12%)",
  "polygon(0% 42%, 8% 0%, 42% 8%, 94% 0%, 100% 38%, 96% 72%, 100% 100%, 48% 92%, 6% 100%, 2% 68%)",
  "polygon(4% 0%, 28% 14%, 96% 4%, 100% 42%, 98% 70%, 100% 100%, 62% 94%, 0% 100%, 2% 58%)",
] as const;

const BANNER_OFFSETS = [
  "lg:max-w-[96%]",
  "lg:max-w-[92%] lg:translate-x-2",
  "lg:max-w-[98%] lg:-translate-x-1",
  "lg:max-w-[94%] lg:translate-x-3",
];

export default function HomeCommitment() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-2xl font-bold uppercase tracking-[0.12em] text-[#4a2c20] lg:mb-16 lg:text-3xl">
          CHÚNG TÔI CAM KẾT
        </h2>

        <div className="relative min-h-[580px] lg:min-h-[520px]">
          {/* Hạt cà phê — chồng lên mép trái các banner (z-30) */}
          <div className="relative z-30 mx-auto mb-10 h-[360px] w-full max-w-xl sm:h-[400px] lg:absolute lg:left-0 lg:top-[2%] lg:mb-0 lg:h-[min(92%,560px)] lg:max-w-[min(680px,58%)] lg:translate-y-0">
            <Image
              src={beans}
              alt="Hạt cà phê"
              fill
              className="object-contain object-left"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          <ul className="relative z-10 flex w-full flex-col gap-4 lg:ml-auto lg:w-[min(100%,580px)] lg:gap-5 lg:pl-6 xl:pl-12">
            {items.map((text, i) => (
              <li
                key={text}
                className={`w-full ${BANNER_OFFSETS[i] ?? ""} lg:ml-auto`}
              >
                <div
                  className="bg-[#4a2c20] text-center text-white shadow-md drop-shadow-sm"
                  style={{ clipPath: BANNER_CLIPS[i] ?? BANNER_CLIPS[0] }}
                >
                  <p className="px-6 py-4 text-sm font-medium leading-snug sm:px-8 sm:py-4 sm:text-base">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
