import Link from "next/link";
import Image from "next/image";

const sizes = [
  {
    name: "Small Cup",
    volume: "110ml",
    description:
      "Perfect for espresso and short drinks. The ideal size for a quick coffee moment.",
    price: "From €13.29 / 10 cups",
    features: ["Espresso-friendly", "Compact size", "Thermo resistant"],
  },
  {
    name: "Large Cup",
    volume: "220ml",
    description:
      "For your regular coffee or tea. The perfect companion for a longer break.",
    price: "From €13.29 / 12 cups",
    features: ["Full-size coffee", "Leak-proof hours", "Crunchy till the end"],
  },
];

export default function ProductSizes() {
  return (
    <section className="py-20 lg:py-28 bg-[#f6ece0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
            Our Products
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3d1a08] mt-3 mb-4">
            Different sizes, same crunchiness
          </h2>
          <p className="text-[#6d3018]/70 text-lg max-w-xl mx-auto">
            Comes in two convenient cup sizes to suit every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sizes.map((size, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-[#e8d5c0] group"
            >
              <div className="bg-[#6d3018]/5 h-56 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8c49a]/30 to-transparent" />
                <div className="relative z-10 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt={size.name}
                    width={160}
                    height={160}
                    className="w-32 h-32 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 right-8 bg-[#6d3018] text-[#f6ece0] text-xs font-bold px-3 py-1 rounded-full">
                    {size.volume}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#3d1a08] mb-1">
                  {size.name}
                </h3>
                <p className="text-[#6d3018] font-semibold text-sm mb-3">
                  {size.volume}
                </p>
                <p className="text-[#6d3018]/70 text-sm mb-4 leading-relaxed">
                  {size.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {size.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-[#6d3018] rounded-full" />
                      <span className="text-[#6d3018]/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-[#6d3018] font-bold text-sm">
                    {size.price}
                  </span>
                  <Link
                    href="/products"
                    className="bg-[#6d3018] text-[#f6ece0] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#8b4513] transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
