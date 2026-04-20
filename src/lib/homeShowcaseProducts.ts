import { prisma } from "@/lib/prisma";
import { formatPriceVndFromEur } from "@/lib/formatPrice";

const PLACEHOLDER_IMAGE = "/cup.png";

export type HomeShowcaseProduct = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
};

function mapShowcase(p: {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: { name: string } | null;
}): HomeShowcaseProduct {
  const subtitle =
    p.category?.name ??
    (p.description.length > 72
      ? `${p.description.slice(0, 72)}…`
      : p.description);
  return {
    id: p.id,
    title: p.name,
    subtitle,
    price: formatPriceVndFromEur(p.price),
    image: p.imageUrl ?? PLACEHOLDER_IMAGE,
  };
}

/** Bán chạy: ưu tiên featured, bổ sung sản phẩm còn hàng nếu chưa đủ 3. */
async function fetchBestSellers(take: number) {
  const featured = await prisma.product.findMany({
    where: { inStock: true, featured: true },
    include: { category: true },
    orderBy: { updatedAt: "desc" },
    take,
  });
  if (featured.length >= take) return featured;
  const more = await prisma.product.findMany({
    where: {
      inStock: true,
      id: { notIn: featured.map((p) => p.id) },
    },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: take - featured.length,
  });
  return [...featured, ...more];
}

/** Giới hạn: ưu tiên limitedEdition, bổ sung theo giá (cao → thấp) tránh trùng “bán chạy”. */
async function fetchLimitedEdition(bestIds: string[], take: number) {
  let rows = await prisma.product.findMany({
    where: {
      inStock: true,
      limitedEdition: true,
      id: { notIn: bestIds },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take,
  });

  if (rows.length < take) {
    const need = take - rows.length;
    const exclude = new Set([...bestIds, ...rows.map((r) => r.id)]);
    const fill = await prisma.product.findMany({
      where: {
        inStock: true,
        id: { notIn: [...exclude] },
      },
      include: { category: true },
      orderBy: { price: "desc" },
      take: need,
    });
    rows = [...rows, ...fill];
  }

  return rows;
}

export async function getHomeShowcaseProducts(): Promise<{
  best: HomeShowcaseProduct[];
  limited: HomeShowcaseProduct[];
}> {
  const bestRaw = await fetchBestSellers(3);
  const bestIds = bestRaw.map((p) => p.id);
  const limitedRaw = await fetchLimitedEdition(bestIds, 3);

  return {
    best: bestRaw.map(mapShowcase),
    limited: limitedRaw.map(mapShowcase),
  };
}
