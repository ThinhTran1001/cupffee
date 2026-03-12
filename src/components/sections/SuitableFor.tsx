const categories = [
  { icon: "🏪", title: "Luxury Retail Stores", desc: "Premium presentation for premium products" },
  { icon: "☕", title: "Coffee Producers", desc: "The perfect cup for your perfect brew" },
  { icon: "🚚", title: "Distributors", desc: "Add Cupffee to your green product portfolio" },
  { icon: "🎪", title: "Event & Catering", desc: "Make your events unforgettable and sustainable" },
  { icon: "🏨", title: "HoReCa Distributors", desc: "Hotels, restaurants & cafes go green" },
  { icon: "🏢", title: "Companies", desc: "Brand your office coffee sustainably" },
];

export default function SuitableFor() {
  return (
    <section className="py-20 lg:py-28 bg-[#f6ece0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
            For Everyone
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3d1a08] mt-3 mb-4">
            We&#39;ve got you covered
          </h2>
          <p className="text-[#6d3018]/70 text-lg max-w-2xl mx-auto">
            Cupffee is suitable for any occasion and any location. Reach out to
            us and get ahead of your competitors with this unique product.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 text-center hover:shadow-md transition-all hover:-translate-y-1 border border-[#e8d5c0] group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-[#3d1a08] text-xs leading-tight mb-1">
                {cat.title}
              </h3>
              <p className="text-[#6d3018]/60 text-xs leading-tight hidden sm:block">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
