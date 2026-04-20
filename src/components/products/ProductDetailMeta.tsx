"use client";

import { useState } from "react";

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M14 18a2 2 0 1 1-4 0M5 18a2 2 0 1 1-4 0M3 8h11v10H3V8Zm11 0h3l4 4v6h-3M3 8V6a1 1 0 0 1 1-1h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductDetailMeta() {
  const [fav, setFav] = useState(false);

  return (
    <div className="mt-8 flex flex-col gap-6 border-t border-[#e8dfd6] pt-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#4a2c20]">
        <TruckIcon className="text-[#4a2c20] shrink-0" />
        Giao Hàng Nhanh
      </div>
      <button
        type="button"
        onClick={() => setFav((f) => !f)}
        className="flex items-center gap-2 text-sm font-semibold text-[#4a2c20] hover:text-[#6d3018] transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={fav ? "currentColor" : "none"}
          className="text-[#4a2c20] shrink-0"
          aria-hidden
        >
          <path
            d="M12 21s-7-4.35-7-10a5 5 0 0 1 9.09-2.91A5 5 0 0 1 19 11c0 5.65-7 10-7 10Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        {fav ? "Đã thêm vào yêu thích" : "Thêm Vào Yêu Thích"}
      </button>
    </div>
  );
}
