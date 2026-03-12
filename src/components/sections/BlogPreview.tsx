import Link from "next/link";

const posts = [
  {
    title: "Cupffee Secures Grant for Groundbreaking Sustainable Innovation",
    category: "News",
    date: "Jan 29, 2025",
    excerpt:
      "We are thrilled to announce that Cupffee has secured a significant grant to further our mission of sustainable innovation in the edible cup space.",
    slug: "cupffee-secures-grant",
  },
  {
    title: "What Makes Cupffee Special?",
    category: "Green Revolution",
    date: "Jul 06, 2024",
    excerpt:
      "Discover the unique blend of taste, sustainability and innovation that sets Cupffee apart from all other eco-friendly alternatives on the market.",
    slug: "what-makes-cupffee-special",
  },
  {
    title: "The Power of Sustainable Choices with Cupffee",
    category: "Green Revolution",
    date: "Jul 01, 2024",
    excerpt:
      "Every cup of coffee can be a statement. Learn how choosing Cupffee helps reduce plastic waste and makes a meaningful impact on our planet.",
    slug: "power-of-sustainable-choices",
  },
];

const categoryColors: Record<string, string> = {
  News: "bg-blue-100 text-blue-700",
  "Green Revolution": "bg-green-100 text-green-700",
  Recipe: "bg-orange-100 text-orange-700",
};

export default function BlogPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
              Latest Updates
            </span>
            <h2 className="text-4xl font-bold text-[#3d1a08] mt-3">
              Welcome to our Cupffee blog!
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[#6d3018] font-semibold hover:underline flex items-center gap-2"
          >
            Go to Blog →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-[#f6ece0] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 bg-gradient-to-br from-[#6d3018]/20 to-[#c8956c]/30 flex items-center justify-center">
                <div className="text-5xl">☕</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}
                  >
                    #{post.category}
                  </span>
                  <span className="text-[#6d3018]/50 text-xs">{post.date}</span>
                </div>
                <h3 className="font-bold text-[#3d1a08] mb-2 text-lg leading-snug line-clamp-2 group-hover:text-[#6d3018] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#6d3018]/70 text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-[#6d3018] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
