import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

const staticContent: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    content: string;
    excerpt: string;
  }
> = {
  "cupffee-secures-grant": {
    title: "Cupffee Secures Grant for Groundbreaking Sustainable Innovation",
    category: "News",
    date: "January 29, 2025",
    excerpt:
      "We are thrilled to announce that Cupffee has secured a significant grant to further our mission.",
    content: `
      <p>We are thrilled to announce that Cupffee has secured a significant grant to further our mission of sustainable innovation in the edible cup space. This funding will allow us to expand our research and development efforts, scale our production capabilities, and reach even more markets around the world.</p>
      
      <h2>What This Means for Cupffee</h2>
      <p>The grant, provided by the Bulgarian Innovation Fund, recognizes Cupffee's contribution to environmental sustainability and circular economy principles. With this support, we plan to:</p>
      <ul>
        <li>Develop new cup sizes and flavors to meet diverse customer needs</li>
        <li>Invest in advanced production technology for more efficient manufacturing</li>
        <li>Expand our distribution network to new markets in Asia and North America</li>
        <li>Fund research into new biodegradable packaging materials</li>
      </ul>
      
      <h2>Our Commitment</h2>
      <p>This grant is a testament to the hard work of our entire team and the support of our loyal customers. We remain committed to our mission: eliminating single-use plastic cups one delicious Cupffee at a time.</p>
      
      <p>Join us in celebrating this milestone and continue being part of the green revolution!</p>
    `,
  },
  "what-makes-cupffee-special": {
    title: "What Makes Cupffee Special?",
    category: "Green Revolution",
    date: "July 6, 2024",
    excerpt:
      "Discover the unique blend of taste, sustainability and innovation that sets Cupffee apart.",
    content: `
      <p>At first glance, Cupffee might seem like just another eco-friendly product. But once you hold one in your hand, take your first sip, and then eat the cup itself — you understand immediately that this is something truly extraordinary.</p>
      
      <h2>A Revolution in Your Cup</h2>
      <p>What makes Cupffee special isn't just one thing — it's the combination of everything:</p>
      <ul>
        <li><strong>Taste:</strong> Our cups are made from a special wafer recipe that tastes delicious, similar to a cookie</li>
        <li><strong>Function:</strong> Despite being edible, Cupffee cups are fully waterproof and heat-resistant up to 85°C</li>
        <li><strong>Sustainability:</strong> Zero waste — even the cup gets eaten!</li>
        <li><strong>Simplicity:</strong> Made from just 7 natural ingredients, all sustainably sourced</li>
      </ul>
      
      <h2>The Perfect Coffee Companion</h2>
      <p>Cupffee was designed for coffee lovers who care about the planet. It doesn't change the taste of your drink, it stays crunchy throughout your coffee break, and when you're done — you eat the cup!</p>
    `,
  },
  "power-of-sustainable-choices": {
    title: "The Power of Sustainable Choices with Cupffee",
    category: "Green Revolution",
    date: "July 1, 2024",
    excerpt:
      "Every cup of coffee can be a statement. Learn how choosing Cupffee helps reduce plastic waste.",
    content: `
      <p>Every day, 495,000 plastic cups are used globally — and less than 1% of them are recycled. The rest end up in landfills, in our oceans, contaminating our soil for centuries. As coffee culture continues to grow worldwide, so does the plastic waste problem.</p>
      
      <h2>Your Daily Choice Matters</h2>
      <p>When you choose Cupffee, you're not just choosing a delicious cup — you're making a statement. You're saying that you care about the planet, that you value innovation, and that sustainability doesn't have to come at the cost of enjoyment.</p>
      
      <h2>The Numbers Speak</h2>
      <p>Every box of 10 small Cupffee cups saves 0.6 kg of CO₂. That might sound small, but across our 353 clients in 55 countries, that adds up to 277,000 kg of CO₂ saved — and we're just getting started.</p>
      
      <h2>Join the Movement</h2>
      <p>Sustainability isn't a sacrifice — it's an upgrade. Cupffee proves that we can have delicious drinks AND protect our planet. Join us in choosing the cup that can eat!</p>
    `,
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: {
    title: string;
    category: string;
    date: string;
    content: string;
    excerpt: string;
  } | null = null;

  const dbPost = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (dbPost) {
    post = {
      title: dbPost.title,
      category: dbPost.category,
      date:
        dbPost.publishedAt?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        }) ?? "",
      content: dbPost.content,
      excerpt: dbPost.excerpt,
    };
  } else if (staticContent[slug]) {
    post = staticContent[slug];
  }

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="flex items-center gap-2 text-sm text-[#6d3018]/60 mb-8">
          <Link href="/" className="hover:text-[#6d3018]">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#6d3018]">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#6d3018] font-medium line-clamp-1">
            {post.title}
          </span>
        </nav>

        <article>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#6d3018]/10 text-[#6d3018] text-xs font-semibold px-2.5 py-1 rounded-full">
                #{post.category}
              </span>
              <span className="text-[#6d3018]/50 text-sm">{post.date}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-[#3d1a08] leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-[#6d3018]/70 text-lg italic">{post.excerpt}</p>
          </div>

          <div className="h-64 bg-gradient-to-br from-[#6d3018]/20 to-[#c8956c]/30 rounded-2xl flex items-center justify-center mb-10">
            <span className="text-7xl">☕</span>
          </div>

          <div
            className="prose max-w-none text-[#3d1a08] prose-headings:text-[#3d1a08] prose-p:text-[#6d3018]/80 prose-li:text-[#6d3018]/80 prose-strong:text-[#6d3018]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-16 border-t border-[#e8d5c0] pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Link
            href="/blog"
            className="text-[#6d3018] font-semibold hover:underline flex items-center gap-2"
          >
            ← Back to Blog
          </Link>
          <Link
            href="/products"
            className="bg-[#6d3018] text-[#f6ece0] px-6 py-3 rounded-full font-semibold hover:bg-[#8b4513] transition-colors"
          >
            Shop Cupffee →
          </Link>
        </div>
      </div>
    </div>
  );
}
