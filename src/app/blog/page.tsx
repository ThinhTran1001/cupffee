import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const staticPosts = [
  {
    id: "static-1",
    title: "Cupffee Secures Grant for Groundbreaking Sustainable Innovation",
    category: "News",
    date: "Jan 29, 2025",
    excerpt:
      "We are thrilled to announce that Cupffee has secured a significant grant to further our mission of sustainable innovation in the edible cup space.",
    slug: "cupffee-secures-grant",
    isStatic: true,
  },
  {
    id: "static-2",
    title: "What Makes Cupffee Special?",
    category: "Green Revolution",
    date: "Jul 06, 2024",
    excerpt:
      "Discover the unique blend of taste, sustainability and innovation that sets Cupffee apart from all other eco-friendly alternatives on the market.",
    slug: "what-makes-cupffee-special",
    isStatic: true,
  },
  {
    id: "static-3",
    title: "The Power of Sustainable Choices with Cupffee",
    category: "Green Revolution",
    date: "Jul 01, 2024",
    excerpt:
      "Every cup of coffee can be a statement. Learn how choosing Cupffee helps reduce plastic waste and makes a meaningful impact on our planet.",
    slug: "power-of-sustainable-choices",
    isStatic: true,
  },
];

const categoryColors: Record<string, string> = {
  News: "bg-blue-100 text-blue-700",
  "Green Revolution": "bg-green-100 text-green-700",
  Recipe: "bg-orange-100 text-orange-700",
};

export default async function BlogPage() {
  const dbPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  const allPosts = [
    ...dbPosts.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      date: p.publishedAt?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }) ?? "",
      excerpt: p.excerpt,
      slug: p.slug,
      isStatic: false,
    })),
    ...staticPosts,
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#3d1a08] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#c8956c] font-semibold text-sm uppercase tracking-widest">
            Insights & Stories
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mt-3 mb-4">
            Cupffee Blog
          </h1>
          <p className="text-[#c8956c] text-lg max-w-2xl mx-auto">
            The latest news, delicious recipes & everything from the world of
            Cupffee.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all group border border-[#e8d5c0]"
            >
              <div className="h-52 bg-gradient-to-br from-[#6d3018]/20 to-[#c8956c]/30 flex items-center justify-center relative">
                <span className="text-6xl">☕</span>
                <div
                  className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}
                >
                  #{post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="text-[#6d3018]/50 text-xs mb-3">{post.date}</div>
                <h2 className="font-bold text-[#3d1a08] text-lg leading-snug mb-3 line-clamp-2 group-hover:text-[#6d3018] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#6d3018]/70 text-sm line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-[#6d3018] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
