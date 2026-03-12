import Image from "next/image";
import Link from "next/link";

const values = [
  {
    icon: "🌿",
    title: "GMO Free",
    desc: "Just nature's best — 100% GMO-free with no artificial colorants, sweeteners, or preservatives.",
  },
  {
    icon: "🌱",
    title: "100% Vegan",
    desc: "Handpicked for purity: only the best plant-based ingredients, including natural grains and coconut oil.",
  },
  {
    icon: "♻️",
    title: "Green Production",
    desc: "Our eco-friendly process generates zero waste and no pollution, only the delicious aroma of freshly baked cookies.",
  },
  {
    icon: "🌾",
    title: "Completely Natural",
    desc: "Masterfully crafted from 7 sustainable, locally sourced ingredients of natural origin.",
  },
];

const milestones = [
  { year: "2018", event: "Cupffee is founded in Bulgaria with a revolutionary idea" },
  { year: "2019", event: "First prototype tested — the edible cup is born" },
  { year: "2020", event: "Launch in European markets, gaining first 50 clients" },
  { year: "2021", event: "Expansion to 20+ countries across 4 continents" },
  { year: "2022", event: "Over 100 clients worldwide, 100k+ kg CO₂ saved" },
  { year: "2024", event: "277,000 kg CO₂ saved, 353 clients in 55+ countries" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6ece0] pt-20">
      <section className="bg-[#3d1a08] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8956c] rounded-full blur-3xl translate-x-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#c8956c] font-semibold text-sm uppercase tracking-widest">
                Our Story
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mt-3 mb-6">
                About Cupffee
              </h1>
              <p className="text-[#c8956c] text-lg leading-relaxed mb-6">
                Cupffee is a new way to enjoy your drinks while caring for our
                planet. We created the world&#39;s first edible cup that combines
                delicious taste with environmental responsibility.
              </p>
              <p className="text-[#c8956c]/80 leading-relaxed">
                Born in Bulgaria, with a vision to eliminate single-use plastic
                cups — one delicious sip at a time. Our cups are crafted from 7
                sustainably sourced natural ingredients and baked to perfection.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/logo.png"
                alt="Cupffee"
                width={280}
                height={280}
                className="w-56 h-56 lg:w-64 lg:h-64 object-contain brightness-0 invert opacity-70"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
              Our Mission
            </span>
            <h2 className="text-4xl font-bold text-[#3d1a08] mt-3 mb-4">
              Meet Cupffee
            </h2>
            <p className="text-[#6d3018]/70 text-lg max-w-3xl mx-auto leading-relaxed">
              Cupffee is the sustainable alternative to disposable cups — a
              tasty solution to plastic pollution! We believe that going green
              doesn&#39;t mean giving up on taste or convenience. Our edible cups
              prove that sustainability can be delicious.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-[#f6ece0] rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-[#3d1a08] mb-2">{value.title}</h3>
                <p className="text-[#6d3018]/70 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f6ece0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold text-[#3d1a08] mt-3">
              The Cupffee Story
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#6d3018]/20" />

            {milestones.map((m, i) => (
              <div
                key={i}
                className={`relative flex items-center gap-8 mb-8 ${
                  i % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-[#6d3018] rounded-full -translate-x-1/2 flex-shrink-0 border-4 border-[#f6ece0]" />
                <div
                  className={`pl-12 sm:pl-0 w-full sm:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-5 border border-[#e8d5c0] hover:shadow-md transition-shadow">
                    <div className="text-[#6d3018] font-bold text-lg mb-1">
                      {m.year}
                    </div>
                    <p className="text-[#3d1a08] text-sm">{m.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#6d3018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "7", label: "Natural Ingredients" },
              { num: "55+", label: "Countries" },
              { num: "353+", label: "Happy Clients" },
              { num: "277K kg", label: "CO₂ Saved" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.num}
                </div>
                <div className="text-[#c8956c] text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#3d1a08] mb-4">
            Join the Green Revolution
          </h2>
          <p className="text-[#6d3018]/70 text-lg mb-8">
            Be part of the movement that&#39;s changing how the world enjoys its
            coffee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[#6d3018] text-[#f6ece0] px-8 py-4 rounded-full font-bold hover:bg-[#8b4513] transition-colors text-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#6d3018] text-[#6d3018] px-8 py-4 rounded-full font-bold hover:bg-[#6d3018] hover:text-[#f6ece0] transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
