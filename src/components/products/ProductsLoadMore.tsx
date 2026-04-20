"use client";

import { useState } from "react";
import ProductListingCard, { type ListingProduct } from "./ProductListingCard";

const PAGE_SIZE = 8;

export default function ProductsLoadMore({ products }: { products: ListingProduct[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const slice = products.slice(0, visible);
  const hasMore = visible < products.length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {slice.map((p) => (
          <ProductListingCard key={p.id} product={p} priceDisplay="vnd" />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-14">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-sm border-2 border-[#4a2c20] bg-white px-12 py-3 text-sm font-semibold text-[#4a2c20] hover:bg-[#4a2c20]/5 transition-colors"
          >
            Xem Thêm
          </button>
        </div>
      )}
    </>
  );
}
