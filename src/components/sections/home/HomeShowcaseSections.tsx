"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomeShowcaseProduct } from "@/lib/homeShowcaseProducts";

function HeartButton() {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#4a2c20] shadow-sm transition-colors hover:bg-white"
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

function ProductRow({
  heading,
  products,
}: {
  heading: string;
  products: HomeShowcaseProduct[];
}) {
  if (products.length === 0) {
    return (
      <div className="mb-20 last:mb-0">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-[#1a1a1a] lg:text-2xl">
            {heading}
          </h2>
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-[#4a2c20] hover:underline"
          >
            Xem Tất Cả
          </Link>
        </div>
        <p className="rounded-xl border border-dashed border-[#e8dfd6] bg-white/60 px-4 py-10 text-center text-sm text-[#6d4c3d]">
          Chưa có sản phẩm phù hợp. Thêm sản phẩm trong admin hoặc bật cờ phù hợp
          (nổi bật / giới hạn).
        </p>
      </div>
    );
  }

  return (
    <div className="mb-20 last:mb-0">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-[#1a1a1a] lg:text-2xl">
          {heading}
        </h2>
        <Link
          href="/products"
          className="shrink-0 text-sm font-semibold text-[#4a2c20] hover:underline"
        >
          Xem Tất Cả
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-10">
        {products.map((p) => (
          <article key={p.id} className="group">
            <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-white">
              <Link
                href={`/products/${p.id}`}
                className="absolute inset-0 block"
                aria-label={`Xem ${p.title}`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>
              <HeartButton />
            </div>
            <Link href={`/products/${p.id}`} className="block">
              <h3 className="mb-1 text-lg font-bold text-[#4a2c20]">{p.title}</h3>
              <p className="mb-2 text-sm text-[#5c4033]/80">{p.subtitle}</p>
              <p className="text-lg font-bold text-[#4a2c20]">{p.price}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function HomeShowcaseSections({
  best,
  limited,
}: {
  best: HomeShowcaseProduct[];
  limited: HomeShowcaseProduct[];
}) {
  return (
    <>
      <ProductRow heading="BÁN CHẠY" products={best} />
      <ProductRow heading="SẢN PHẨM GIỚI HẠN" products={limited} />
    </>
  );
}
