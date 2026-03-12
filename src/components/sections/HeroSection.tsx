import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#f6ece0] overflow-hidden flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#e8c49a]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c8956c]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6d3018]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-[#6d3018]/10 text-[#6d3018] px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-[#6d3018] rounded-full animate-pulse" />
              World&#39;s First Edible Cup
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#3d1a08] leading-tight">
              The Cup{" "}
              <span className="text-[#6d3018] relative">
                Can Eat
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 2 150 2 298 8"
                    stroke="#c8956c"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              with your coffee!
            </h1>

            <p className="text-lg text-[#6d3018]/80 leading-relaxed max-w-lg">
              The world&#39;s first edible cup — tasty as a cookie, green as the
              planet. Our unique recipe doesn&#39;t leak and keeps your drink
              perfect until the last sip.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-[#6d3018] text-[#f6ece0] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#8b4513] transition-all transform hover:scale-105 shadow-lg shadow-[#6d3018]/20 text-center"
              >
                Order Now
              </Link>
              <Link
                href="/products?sample=true"
                className="border-2 border-[#6d3018] text-[#6d3018] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#6d3018] hover:text-[#f6ece0] transition-all text-center"
              >
                Request a Sample
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#6d3018]">55+</div>
                <div className="text-xs text-[#6d3018]/60 font-medium">Countries</div>
              </div>
              <div className="w-px h-10 bg-[#6d3018]/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#6d3018]">353+</div>
                <div className="text-xs text-[#6d3018]/60 font-medium">Clients</div>
              </div>
              <div className="w-px h-10 bg-[#6d3018]/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#6d3018]">277K</div>
                <div className="text-xs text-[#6d3018]/60 font-medium">kg CO₂ Saved</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-[#6d3018]/10 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 flex items-center justify-center w-full h-full animate-float">
                <Image
                  src="/logo.png"
                  alt="Cupffee edible cup"
                  width={320}
                  height={320}
                  className="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            <div className="absolute top-8 -right-4 lg:right-0 bg-white rounded-2xl p-3 shadow-xl border border-[#e8d5c0]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍪</span>
                <div>
                  <div className="text-xs font-bold text-[#6d3018]">Tasty as a cookie</div>
                  <div className="text-xs text-[#6d3018]/60">100% Vegan</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 -left-4 lg:left-0 bg-white rounded-2xl p-3 shadow-xl border border-[#e8d5c0]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <div>
                  <div className="text-xs font-bold text-[#6d3018]">Zero waste</div>
                  <div className="text-xs text-[#6d3018]/60">Eco-friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#6d3018]/40 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-[#6d3018]/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
