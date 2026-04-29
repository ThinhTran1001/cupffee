import { Suspense } from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductFilters from "@/components/products/ProductFilters";
import ProductsLoadMore from "@/components/products/ProductsLoadMore";
import type { ListingProduct } from "@/components/products/ProductListingCard";
import HomeNewsletterBanner from "@/components/sections/home/HomeNewsletterBanner";

export const dynamic = "force-dynamic";

function serializeProduct(p: {
  id: string;
  name: string;
  description: string;
  price: number;
  volume: number;
  unit: string;
  imageUrl: string | null;
  images?: string[];
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
    imageUrl: p.imageUrl || (p.images && p.images[0]) || null,
    featured: p.featured,
    categoryName: p.category?.name ?? null,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    volumes?: string;
    sample?: string;
  }>;
}) {
  const params = await searchParams;

  const priceFilter: Prisma.FloatFilter = {};
  if (params.minPrice) {
    const n = parseFloat(params.minPrice);
    if (!Number.isNaN(n)) priceFilter.gte = n;
  }
  if (params.maxPrice) {
    const n = parseFloat(params.maxPrice);
    if (!Number.isNaN(n)) priceFilter.lte = n;
  }

  const volumeList = params.volumes
    ? params.volumes
        .split(",")
        .map((s) => parseInt(s, 10))
        .filter((n) => !Number.isNaN(n))
    : [];

  const where: Prisma.ProductWhereInput = {
    inStock: true,
    ...(Object.keys(priceFilter).length > 0 && { price: priceFilter }),
    ...(params.category
      ? { category: { slug: params.category } }
      : {}),
    ...(volumeList.length > 0 ? { volume: { in: volumeList } } : {}),
  };

  const [products, categories, volumeGroups] = await Promise.all([
    prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        volume: true,
        unit: true,
        imageUrl: true,
        images: true,
        featured: true,
        category: {
          select: { name: true },
        },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.groupBy({
      by: ["volume"],
      where: { inStock: true },
      orderBy: { volume: "asc" },
    }),
  ]);

  const volumes = volumeGroups.map((g) => g.volume);
  const serialized = products.map(serializeProduct);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {params.sample && (
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-[#4a2c20]/20 bg-white p-5 shadow-sm">
            <span className="text-2xl" aria-hidden>
              🎁
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-[#4a2c20]">Gói dùng thử</h3>
              <p className="text-sm text-[#5c4033]/80">
                Liên hệ để đặt sample pack — trải nghiệm CUPFFEE trước khi đặt số
                lượng lớn.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-sm border-2 border-[#4a2c20] bg-[#4a2c20] px-5 py-2 text-sm font-semibold text-white hover:bg-[#3d2418] transition-colors"
            >
              Liên hệ
            </Link>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          <aside className="w-full lg:w-64 shrink-0">
            <Suspense fallback={<div className="h-48 animate-pulse rounded bg-neutral-100" />}>
              <ProductFilters categories={categories} volumes={volumes} />
            </Suspense>
          </aside>

          <div className="flex-1 min-w-0">
            {serialized.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#4a2c20]/30 bg-white py-20 text-center px-4">
                <div className="text-5xl mb-4" aria-hidden>
                  ☕
                </div>
                <h3 className="text-xl font-bold text-[#4a2c20] mb-2">
                  Không có sản phẩm phù hợp
                </h3>
                <p className="text-[#5c4033]/80 text-sm max-w-md mx-auto mb-6">
                  Thử bỏ bớt bộ lọc hoặc chọn danh mục khác.
                </p>
                <Link
                  href="/products"
                  className="inline-block text-sm font-semibold text-[#4a2c20] underline underline-offset-4"
                >
                  Xóa bộ lọc
                </Link>
              </div>
            ) : (
              <ProductsLoadMore products={serialized} />
            )}
          </div>
        </div>
      </div>

      <HomeNewsletterBanner />
    </div>
  );
}
