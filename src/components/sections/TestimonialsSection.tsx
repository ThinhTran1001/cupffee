"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Miguel Vallejo",
    role: "CEO, ZEMIYA",
    country: "Mexico",
    initial: "M",
    content:
      "I'm thrilled with your innovative Cupffee edible cup. Its uniqueness and positive environmental impact impressed me from the first taste. Not only is it a great alternative to single-use cups, but it also provides a one-of-a-kind experience.",
    rating: 5,
  },
  {
    name: "David Morales",
    role: "CEO, Cupcoffe Peru",
    country: "Peru",
    initial: "D",
    content:
      "Since we started our collaboration with you, the quality of the vegan edible cookie cups has exceeded our expectations and has been a key factor in the success of our company. The acceptance of these products has been exceptional.",
    rating: 5,
  },
  {
    name: "Maxim Gelmann",
    role: "CEO, Stroodles",
    country: "UK",
    initial: "M",
    content:
      "I love the edible Cupffee cups and my customers love stroodling with them also! They are so versatile in being used for hot and cold drinks and offer such a memorable, unique and above all fun experience.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3d1a08] mt-3 mb-4">
            Our clients, our power
          </h2>
          <p className="text-[#6d3018]/70 text-lg">
            Together we can make a difference.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f6ece0] rounded-3xl p-8 lg:p-12 relative min-h-[260px]">
            <div className="absolute top-8 left-8 text-6xl text-[#6d3018]/20 font-serif leading-none">
              &ldquo;
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#6d3018] rounded-full flex items-center justify-center text-[#f6ece0] text-xl font-bold flex-shrink-0">
                {testimonials[active].initial}
              </div>
              <div>
                <h4 className="font-bold text-[#3d1a08] text-lg">
                  {testimonials[active].name}
                </h4>
                <p className="text-[#6d3018]/70 text-sm">
                  {testimonials[active].role} · {testimonials[active].country}
                </p>
                <div className="flex gap-1 mt-1">
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[#3d1a08] leading-relaxed text-base italic pl-4">
              {testimonials[active].content}
            </p>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all rounded-full ${
                  i === active
                    ? "bg-[#6d3018] w-8 h-3"
                    : "bg-[#6d3018]/30 w-3 h-3 hover:bg-[#6d3018]/60"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() =>
                setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
              }
              className="w-10 h-10 rounded-full border-2 border-[#6d3018] text-[#6d3018] hover:bg-[#6d3018] hover:text-[#f6ece0] transition-colors flex items-center justify-center font-bold"
            >
              ‹
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border-2 border-[#6d3018] text-[#6d3018] hover:bg-[#6d3018] hover:text-[#f6ece0] transition-colors flex items-center justify-center font-bold"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
