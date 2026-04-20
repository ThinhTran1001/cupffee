"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPriceVndFromEur } from "@/lib/formatPrice";

export type ListingProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  volume: number;
  unit: string;
  imageUrl: string | null;
  featured: boolean;
  categoryName: string | null;
};

function HeartButton() {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#4a2c20] shadow-sm hover:bg-white transition-colors"
      aria-label="Yêu thích"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 21s-7-4.35-7-10a5 5 0 0 1 9.09-2.91A5 5 0 0 1 19 11c0 5.65-7 10-7 10Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function ProductListingCard({
  product,
  priceDisplay = "eur",
}: {
  product: ListingProduct;
  /** "vnd" = quy đổi từ EUR trong DB; "eur" = hiển thị € */
  priceDisplay?: "eur" | "vnd";
}) {
  const subtitle = product.categoryName
    ? product.categoryName
    : product.description.slice(0, 60) +
      (product.description.length > 60 ? "…" : "");

  const priceLabel =
    priceDisplay === "vnd"
      ? formatPriceVndFromEur(product.price)
      : `€${product.price.toFixed(2)}`;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white mb-4 ring-1 ring-[#e8dfd6]">
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 block"
          aria-label={`Xem ${product.name}`}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#e8c49a]/25 to-[#4a2c20]/10">
              <span className="text-[#4a2c20]/40 text-sm font-medium">CUPFFEE</span>
            </div>
          )}
        </Link>
        {product.featured && (
          <span className="pointer-events-none absolute top-3 left-3 z-10 bg-[#4a2c20] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
            HOT
          </span>
        )}
        <HeartButton />
      </div>
      <Link href={`/products/${product.id}`} className="block">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-bold text-[#4a2c20] text-base lg:text-lg leading-snug mb-0.5 group-hover:underline underline-offset-2">
              {product.name}
            </h2>
            <p className="text-sm text-[#5c4033]/80 line-clamp-1">{subtitle}</p>
          </div>
          <p className="text-base lg:text-lg font-bold text-[#4a2c20] shrink-0 tabular-nums">
            {priceLabel}
          </p>
        </div>
      </Link>
    </article>
  );
}
