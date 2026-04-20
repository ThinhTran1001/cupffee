import Image from "next/image";
import Link from "next/link";

const HERO_IMG = "/heroimage.png";

function Sparkle() {
  return (
    <span className="inline-block text-[#6d3018] text-lg leading-none" aria-hidden>
      ✦
    </span>
  );
}

export default function HomeHero() {
  return (
    <section className="pt-6 pb-16 lg:pb-24 lg:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[#6d3018] text-sm font-semibold tracking-[0.2em] mb-4">
              CUPFFEE
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#4a2c20] leading-[1.1] mb-6">
              Enjoy Healthy Life &amp; Tasty Food.
            </h1>
            <div className="flex gap-2 mb-6">
              <Sparkle />
              <Sparkle />
            </div>
            <p className="text-[#5c4033]/90 text-base lg:text-lg leading-relaxed max-w-xl mb-10">
              Cốc gốm và phụ kiện cà phê được chọn lọc — an toàn, bền vững và đẹp
              cho mỗi khoảnh khắc thưởng thức hương vị của bạn.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-sm bg-[#4a2c20] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3d2418] transition-colors"
              >
                XEM THÊM
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-sm border-2 border-[#4a2c20] bg-transparent px-8 py-3 text-sm font-semibold text-[#4a2c20] hover:bg-[#4a2c20]/5 transition-colors"
              >
                ĐẶT MUA NGAY
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
            <Image
              src={HERO_IMG}
              alt="Cốc cà phê CUPFFEE"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
