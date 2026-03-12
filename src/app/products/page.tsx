import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sample?: string }>;
}) {
  const params = await searchParams;

  const products = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const categories = await prisma.category.findMany();

  const filteredProducts = params.category
    ? products.filter((p) => p.category?.slug === params.category)
    : products;

  return (
    <div className="min-h-screen bg-[#f6ece0] pt-24">
      <div className="bg-[#3d1a08] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#c8956c] font-semibold text-sm uppercase tracking-widest">
            Our Collection
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mt-3 mb-4">
            Edible Cupffee Cups
          </h1>
          <p className="text-[#c8956c] text-lg max-w-2xl mx-auto">
            Discover our range of sustainable, edible cups. Perfect for coffee,
            tea, and more.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {params.sample && (
          <div className="bg-[#6d3018] text-[#f6ece0] rounded-2xl p-6 mb-8 flex items-center gap-4">
            <span className="text-3xl">🎁</span>
            <div>
              <h3 className="font-bold text-lg">Request a Sample Pack</h3>
              <p className="text-[#e8c49a] text-sm">
                Try Cupffee before you commit — 10 small + 12 large cups for
                just €13.29
              </p>
            </div>
            <Link
              href="/contact"
              className="ml-auto bg-[#f6ece0] text-[#6d3018] px-5 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors flex-shrink-0"
            >
              Get Sample
            </Link>
          </div>
        )}

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/products"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                !params.category
                  ? "bg-[#6d3018] text-[#f6ece0]"
                  : "bg-white text-[#6d3018] hover:bg-[#6d3018] hover:text-[#f6ece0] border border-[#e8d5c0]"
              }`}
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  params.category === cat.slug
                    ? "bg-[#6d3018] text-[#f6ece0]"
                    : "bg-white text-[#6d3018] hover:bg-[#6d3018] hover:text-[#f6ece0] border border-[#e8d5c0]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-2xl font-bold text-[#3d1a08] mb-2">
              No products yet
            </h3>
            <p className="text-[#6d3018]/70">
              Check back soon for our amazing edible cups!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-16 bg-[#3d1a08] rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-bold text-[#e8c49a] mb-3">
            Bulk Delights for Businesses
          </h3>
          <p className="text-[#c8956c] mb-6 max-w-xl mx-auto">
            Unlock exclusive discounts on larger orders. Elevate your business
            with our edible cups and enjoy cost savings that scale with your
            success.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#e8c49a] text-[#3d1a08] px-8 py-4 rounded-full font-bold hover:bg-[#f6ece0] transition-colors"
          >
            Get Bulk Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
