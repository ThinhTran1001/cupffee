import Link from "next/link";

export default function SamplePackSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#f6ece0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#e8d5c0]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
                Try Before You Commit
              </span>
              <h2 className="text-4xl font-bold text-[#3d1a08] mt-3 mb-4">
                Try our edible Cupffee cups with a sample pack!
              </h2>
              <p className="text-[#6d3018]/70 leading-relaxed mb-8">
                Discover the extraordinary blend of design, sustainability, and
                taste with our sample pack.
              </p>

              <div className="bg-[#f6ece0] rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-[#3d1a08] mb-4">
                  Each pack includes:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#6d3018] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      10
                    </div>
                    <span className="text-[#3d1a08]">
                      Small Cupffee cups{" "}
                      <span className="text-[#6d3018] font-semibold">(110 ml)</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#6d3018] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      12
                    </div>
                    <span className="text-[#3d1a08]">
                      Large Cupffee cups{" "}
                      <span className="text-[#6d3018] font-semibold">(220 ml)</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#e8c49a] rounded-full flex items-center justify-center text-[#6d3018] text-sm font-bold flex-shrink-0">
                      +
                    </div>
                    <span className="text-[#3d1a08]">
                      Exquisite cup holders for each cup
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-[#6d3018]">€13.29</div>
                  <div className="text-sm text-[#6d3018]/60">
                    Free shipping on orders over €50
                  </div>
                </div>
                <Link
                  href="/products?sample=true"
                  className="bg-[#6d3018] text-[#f6ece0] px-8 py-4 rounded-full font-bold hover:bg-[#8b4513] transition-all transform hover:scale-105"
                >
                  Request Sample
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#6d3018] to-[#3d1a08] p-10 lg:p-14 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#e8c49a] mb-8">
                Save emissions with Cupffee
              </h3>

              <div className="space-y-4">
                {[
                  {
                    label: "1 box of 10 cups 110ml",
                    saved: "0.6 kg CO₂ saved",
                    pct: 10,
                  },
                  {
                    label: "1 box of 12 cups 220ml",
                    saved: "0.9 kg CO₂ saved",
                    pct: 15,
                  },
                  {
                    label: "1 carton of 200 cups 110ml",
                    saved: "12 kg CO₂ saved",
                    pct: 30,
                  },
                  {
                    label: "1 carton of 240 cups 220ml",
                    saved: "18 kg CO₂ saved",
                    pct: 40,
                  },
                  {
                    label: "1 pallet of 9,600 cups",
                    saved: "576 kg CO₂ saved",
                    pct: 80,
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#f6ece0]/80">{item.label}</span>
                      <span className="text-[#e8c49a] font-semibold">
                        {item.saved}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#4a1f0a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e8c49a] rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
