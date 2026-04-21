import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/products/ProductGallery";
import ProductPurchasePanel from "@/components/products/ProductPurchasePanel";
import ProductDetailAccordions from "@/components/products/ProductDetailAccordions";
import ProductUserGuide from "@/components/products/ProductUserGuide";
import ProductDetailMeta from "@/components/products/ProductDetailMeta";
import ProductListingCard, {
  type ListingProduct,
} from "@/components/products/ProductListingCard";
import HomeNewsletterBanner from "@/components/sections/home/HomeNewsletterBanner";
import { convertEurToVnd, formatPriceVndFromEur } from "@/lib/formatPrice";

export const dynamic = "force-dynamic";

function toListingProduct(p: {
  id: string;
  name: string;
  description: string;
  price: number;
  volume: number;
  unit: string;
  imageUrl: string | null;
  featured: boolean;
  category: { name: string } | null;
}): ListingProduct {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    volume: p.volume,
    unit: p.unit,
    imageUrl: p.imageUrl,
    featured: p.featured,
    categoryName: p.category?.name ?? null,
  };
}

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

  const relatedByCategory = await prisma.product.findMany({
    where: {
      id: { not: id },
      categoryId: product.categoryId ?? undefined,
      inStock: true,
    },
    take: 3,
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const needMore = 3 - relatedByCategory.length;
  const relatedExtra =
    needMore > 0
      ? await prisma.product.findMany({
          where: {
            id: {
              notIn: [id, ...relatedByCategory.map((r) => r.id)],
            },
            inStock: true,
          },
          take: needMore,
          include: { category: true },
          orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        })
      : [];

  const relatedProducts = [...relatedByCategory, ...relatedExtra];
  const guideTags = product.features.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#5c4033]/70 mb-8">
            <Link href="/" className="hover:text-[#4a2c20]">
              Trang chủ
            </Link>
            <span aria-hidden>/</span>
            <Link href="/products" className="hover:text-[#4a2c20]">
              Sản phẩm
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-[#4a2c20] line-clamp-1">
              {product.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <ProductGallery
              productName={product.name}
              imageUrl={product.imageUrl}
              images={product.images}
            />

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#4a2c20] leading-tight mb-5">
                {product.name}
              </h1>
              <p className="text-[#5c4033]/90 text-base leading-relaxed mb-6">
                {product.description}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-[#4a2c20] mb-8">
                {formatPriceVndFromEur(product.price)}
              </p>

              <ProductPurchasePanel
                productId={product.id}
                disabled={!product.inStock}
                productName={product.name}
                priceVnd={convertEurToVnd(product.price)}
                imageUrl={product.imageUrl}
              />

              {!product.inStock && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  Sản phẩm tạm hết hàng
                </p>
              )}

              <ProductDetailMeta />
            </div>
          </div>
        </div>
      </div>

      <section className="border-y border-[#e8dfd6] bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 items-start">
            <ProductDetailAccordions
              description={product.description}
              features={product.features}
            />
            <ProductUserGuide body={product.description} tags={guideTags} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl lg:text-2xl font-bold text-[#1a1a1a] mb-10">
              Có Thể Bạn Cũng Thích
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {relatedProducts.map((rp) => (
                <ProductListingCard
                  key={rp.id}
                  product={toListingProduct(rp)}
                  priceDisplay="vnd"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <HomeNewsletterBanner />
    </div>
  );
}
