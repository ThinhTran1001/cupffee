import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CartPageClient from "@/components/cart/CartPageClient";
import type { ListingProduct } from "@/components/products/ProductListingCard";

export const metadata: Metadata = {
  title: "Giỏ hàng — CUPFFEE",
  description: "Xem và chỉnh sửa giỏ hàng của bạn.",
};

export const dynamic = "force-dynamic";

function toListingProduct(p: {
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

export default async function CartPage() {
  const products = await prisma.product.findMany({
    where: { inStock: true, limitedEdition: true },
    take: 3,
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const recommended: ListingProduct[] = products.map(toListingProduct);

  return <CartPageClient recommendedProducts={recommended} />;
}
