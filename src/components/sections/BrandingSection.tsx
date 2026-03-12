import Link from "next/link";
import Image from "next/image";

export default function BrandingSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#6d3018] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8b4513]/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4a1f0a]/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#e8c49a] font-semibold text-sm uppercase tracking-widest">
              Custom Branding
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
              Make it your own
            </h2>
            <p className="text-[#e8c49a] text-lg leading-relaxed mb-6">
              Associate your company with the mission of sustainability. Put your
              brand in the hands of your customers. Literally.
            </p>
            <p className="text-[#c8956c] leading-relaxed mb-8">
              The paper label is completely customizable. Need your own custom
              Cupffee? No problem! Our team will help you create the perfect
              branded edible cup experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-[#f6ece0] text-[#6d3018] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all text-center"
              >
                Contact Us
              </Link>
              <Link
                href="/products"
                className="border-2 border-[#f6ece0] text-[#f6ece0] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#f6ece0] hover:text-[#6d3018] transition-all text-center"
              >
                View Products
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 bg-[#4a1f0a]/50 rounded-3xl flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Branded Cupffee"
                  width={220}
                  height={220}
                  className="w-44 h-44 object-contain brightness-0 invert opacity-60"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-[#e8c49a] rounded-2xl px-4 py-2 text-[#3d1a08] text-sm font-bold shadow-lg">
                Your Logo Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
