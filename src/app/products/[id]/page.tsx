import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: id },
      categoryId: product.categoryId || undefined,
      inStock: true,
    },
    take: 3,
    include: { category: true },
  });

  return (
    <div className="min-h-screen bg-[#f6ece0] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-[#6d3018]/60 mb-8">
          <Link href="/" className="hover:text-[#6d3018]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#6d3018]">
            Products
          </Link>
          <span>/</span>
          <span className="text-[#6d3018] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="bg-white rounded-3xl overflow-hidden aspect-square flex items-center justify-center border border-[#e8d5c0]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8c49a]/20 to-[#6d3018]/10">
                  <Image
                    src="/logo.png"
                    alt={product.name}
                    width={280}
                    height={280}
                    className="w-56 h-56 object-contain opacity-70"
                  />
                </div>
              )}
            </div>

            {product.images.length > 0 && (
              <div className="flex gap-3">
                {product.images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#e8d5c0] flex-shrink-0"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              {product.category && (
                <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-4xl font-bold text-[#3d1a08] mt-2 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="bg-[#f6ece0] text-[#6d3018] px-3 py-1 rounded-full text-sm font-medium border border-[#e8d5c0]">
                  {product.volume}
                  {product.unit}
                </span>
                {product.inStock ? (
                  <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-500 font-medium text-sm">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="text-4xl font-bold text-[#6d3018]">
              €{product.price.toFixed(2)}
            </div>

            <p className="text-[#6d3018]/80 leading-relaxed text-base">
              {product.description}
            </p>

            {product.features.length > 0 && (
              <div>
                <h3 className="font-bold text-[#3d1a08] mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 bg-[#6d3018] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-[#3d1a08]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="flex-1 bg-[#6d3018] text-[#f6ece0] py-4 rounded-full font-bold text-center hover:bg-[#8b4513] transition-colors text-lg"
              >
                Order Now
              </Link>
              <Link
                href="/contact?type=sample"
                className="flex-1 border-2 border-[#6d3018] text-[#6d3018] py-4 rounded-full font-bold text-center hover:bg-[#6d3018] hover:text-[#f6ece0] transition-colors text-lg"
              >
                Request Sample
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#e8d5c0]">
              {[
                { icon: "🌡️", text: "Thermo Resistant up to 85°C" },
                { icon: "💧", text: "Leak-Proof for hours" },
                { icon: "🌿", text: "100% Vegan & GMO Free" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-[#6d3018]/70 leading-tight">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#3d1a08] mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.id}`}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all border border-[#e8d5c0] group"
                >
                  <div className="h-40 bg-[#f6ece0] flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt={rp.name}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-contain opacity-60 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#3d1a08]">{rp.name}</h3>
                    <p className="text-[#6d3018] font-semibold text-sm mt-1">
                      €{rp.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
