"use client";

import { useState } from "react";

export default function CustomerLoveSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      console.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#f6ece0]" id="share-love">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
              Share Your Experience
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#3d1a08] mt-3 mb-6">
              Share your love for Cupffee 💛
            </h2>
            <p className="text-[#6d3018]/70 text-lg leading-relaxed mb-8">
              Have you tried Cupffee? We&#39;d love to hear your thoughts! Share
              your experience with the world and inspire others to join the green
              revolution.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "🌱",
                  text: "Help others discover the sustainable choice",
                },
                { icon: "⭐", text: "Rate your Cupffee experience" },
                {
                  icon: "💬",
                  text: "Your review might be featured on our website",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[#6d3018]/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-[#e8d5c0]">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-[#3d1a08] mb-2">
                  Thank you!
                </h3>
                <p className="text-[#6d3018]/70">
                  Your review has been submitted and is pending approval. We
                  appreciate your love for Cupffee!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      message: "",
                      rating: 5,
                    });
                  }}
                  className="mt-6 bg-[#6d3018] text-[#f6ece0] px-6 py-3 rounded-full font-semibold hover:bg-[#8b4513] transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-sm border border-[#e8d5c0] space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/50 text-[#3d1a08]"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/50 text-[#3d1a08]"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                    Company / Role
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/50 text-[#3d1a08]"
                    placeholder="CEO, Awesome Coffee Co."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3d1a08] mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className={`text-2xl transition-transform hover:scale-110 ${
                          star <= formData.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/50 text-[#3d1a08] resize-none"
                    placeholder="Tell us about your Cupffee experience..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6d3018] text-[#f6ece0] py-4 rounded-full font-bold hover:bg-[#8b4513] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Share Your Love ❤️"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
