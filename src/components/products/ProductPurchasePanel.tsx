"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

const QTY_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);

export default function ProductPurchasePanel({
  productId,
  disabled,
  productName,
  priceEur,
  imageUrl,
}: {
  productId: string;
  disabled?: boolean;
  /** Truyền để hiển thị đúng trong giỏ (không cần gọi API) */
  productName?: string;
  priceEur?: number;
  imageUrl?: string | null;
}) {
  const [qty, setQty] = useState(1);
  const [feedback, setFeedback] = useState<"idle" | "added">("idle");

  const handleAdd = () => {
    if (disabled) return;
    addToCart(productId, qty, {
      ...(productName != null ? { name: productName } : {}),
      ...(priceEur != null ? { price: priceEur } : {}),
      imageUrl: imageUrl ?? null,
    });
    setFeedback("added");
    window.setTimeout(() => setFeedback("idle"), 2200);
  };

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="product-qty"
          className="mb-2 block text-sm font-semibold text-[#4a2c20]"
        >
          Số Lượng
        </label>
        <div className="relative">
          <select
            id="product-qty"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            disabled={disabled}
            className="h-12 w-full cursor-pointer appearance-none rounded-sm border border-[#c4bbb4] bg-white px-4 pr-10 text-sm font-medium text-[#4a2c20] outline-none focus:border-[#4a2c20] disabled:opacity-50"
          >
            {QTY_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#4a2c20]" aria-hidden>
            ▼
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="h-12 w-full rounded-sm bg-[#4a2c20] text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#3d2418] disabled:opacity-50 disabled:pointer-events-none"
      >
        {feedback === "added" ? "Đã thêm vào giỏ" : "Thêm Vào Giỏ"}
      </button>
    </div>
  );
}
