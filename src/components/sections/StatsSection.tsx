const stats = [
  {
    number: "495,000",
    label: "plastic cups used per day globally",
    icon: "🥤",
  },
  {
    number: "Less than 1%",
    label: "of them are recycled",
    icon: "♻️",
  },
  {
    number: "99% of them",
    label: "end up in soil and oceans",
    icon: "🌊",
  },
];

const companyStats = [
  { number: "55", label: "Countries" },
  { number: "353", label: "Clients" },
  { number: "277,000 kg", label: "CO₂ Saved" },
];

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#3d1a08] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#c8956c] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e8c49a] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-[#c8956c] font-semibold text-sm uppercase tracking-widest">
            The Problem We Solve
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#f6ece0] mt-3 mb-4">
            Join the Green Revolution!
          </h2>
          <p className="text-[#c8956c] text-lg max-w-2xl mx-auto">
            Single-use plastic and laminated paper cups generate an immense
            amount of pollution daily, contaminating our soil and oceans for
            centuries. Cupffee is the solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center bg-[#6d3018]/30 rounded-2xl p-8 border border-[#6d3018]/50"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-[#e8c49a] mb-2">
                {stat.number}
              </div>
              <div className="text-[#c8956c] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#6d3018]/50 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#e8c49a]">
              Cupffee Across the World
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {companyStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-[#c8956c] text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
