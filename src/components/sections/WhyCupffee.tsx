const features = [
  {
    icon: "🌡️",
    title: "Thermo Resistant",
    desc: "Cupffee resists high temps up to 85°C, making sure your hot drink stays contained.",
  },
  {
    icon: "💧",
    title: "Leak-Proof",
    desc: "Thanks to our unique recipe, Cupffee cups won't leak for hours. No leaks, no worries!",
  },
  {
    icon: "☕",
    title: "No Taste Change",
    desc: "Not a fan of sugar? Cupffee won't change the taste of your coffee or tea.",
  },
  {
    icon: "🥗",
    title: "Low Calorie",
    desc: "Grab your coffee in a Cupffee for a guilt-free indulgence. Sip and snack away!",
  },
  {
    icon: "🍪",
    title: "Crunchy",
    desc: "Tasty as a cookie, Cupffee will be crunchy from the first sip till the last bite.",
  },
  {
    icon: "🌿",
    title: "100% Vegan",
    desc: "Only the best plant-based ingredients, including natural grains and coconut oil.",
  },
];

export default function WhyCupffee() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3d1a08] mt-3 mb-4">
            Why Cupffee?
          </h2>
          <p className="text-[#6d3018]/70 text-lg max-w-2xl mx-auto">
            The cup is the snack. Cupffee is the world&#39;s first edible cup
            that gives you a delicious and crunchy experience while caring for
            the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-[#f6ece0] rounded-2xl p-6 hover:bg-[#6d3018] transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#3d1a08] group-hover:text-[#f6ece0] mb-2 transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#6d3018]/70 group-hover:text-[#e8c49a] text-sm leading-relaxed transition-colors">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
