"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  readCart,
  removeFromCart,
  setCartLineQuantity,
  clearCart,
  CART_UPDATE_EVENT,
  type CartLine,
} from "@/lib/cart";
import { convertEurToVnd, formatPriceVnd } from "@/lib/formatPrice";
import CheckerboardStrip from "@/components/ui/CheckerboardStrip";
import ProductListingCard, {
  type ListingProduct,
} from "@/components/products/ProductListingCard";

type ResolvedLine = CartLine & {
  name: string;
  unitPriceVnd: number;
  imageUrl: string | null;
};

export default function CartPageClient({
  recommendedProducts = [],
}: {
  recommendedProducts?: ListingProduct[];
}) {
  const router = useRouter();
  const [lines, setLines] = useState<ResolvedLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const resolveCart = useCallback(async () => {
    const raw = readCart();

    const missingProductIds = [
      ...new Set(
        raw.filter((l) => !l.name || !l.price).map((l) => l.productId)
      ),
    ];

    const productDataMap = new Map();

    if (missingProductIds.length > 0) {
      await Promise.all(
        missingProductIds.map(async (id) => {
          try {
            const res = await fetch(`/api/storefront/product/${id}`);
            if (res.ok) {
              productDataMap.set(id, await res.json());
            }
          } catch {
            /* ignore */
          }
        })
      );
    }

    const out: ResolvedLine[] = raw.map((line) => {
      let name = line.name ?? "";
      // Backward compatible: older carts may still store EUR unit price.
      let unitPriceVnd =
        typeof line.price === "number"
          ? line.price < 1000
            ? convertEurToVnd(line.price)
            : line.price
          : 0;
      let imageUrl: string | null = line.imageUrl ?? null;

      const fetched = productDataMap.get(line.productId);
      if (fetched) {
        name = fetched.name;
        unitPriceVnd = convertEurToVnd(fetched.price);
        imageUrl =
          fetched.imageUrl ||
          (fetched.images && fetched.images.length > 0
            ? fetched.images[0]
            : null) ||
          line.imageUrl ||
          null;
      }

      if (!name) name = "Sản phẩm";

      return {
        ...line,
        name,
        unitPriceVnd,
        imageUrl,
      };
    });

    setLines(out);
    setLoading(false);
  }, []);

  useEffect(() => {
    void resolveCart();
  }, [resolveCart]);

  useEffect(() => {
    const onUpdate = () => {
      setLoading(true);
      void resolveCart();
    };
    window.addEventListener(CART_UPDATE_EVENT, onUpdate);
    return () => window.removeEventListener(CART_UPDATE_EVENT, onUpdate);
  }, [resolveCart]);

  const totalVnd = lines.reduce(
    (s, l) => s + l.unitPriceVnd * l.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (ordering || lines.length === 0) return;
    setOrderError(null);
    setOrdering(true);
    try {
      const res = await fetch("/api/storefront/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { id?: string; code?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Không tạo được đơn hàng.");
      }

      clearCart();
      setLines([]);
      setOrderCode(data.code ?? null);
      router.push(`/order/qr?orderId=${data.id}`);
    } catch (error) {
      setOrderError(
        error instanceof Error ? error.message : "Đã xảy ra lỗi khi đặt hàng."
      );
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-16">
      <CheckerboardStrip />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <h1 className="mb-10 text-center text-2xl font-bold tracking-tight text-[#4a2c20] lg:mb-12 lg:text-3xl">
          Giỏ hàng
        </h1>

        {loading ? (
          <p className="py-16 text-center text-[#5c4033]/70">Đang tải…</p>
        ) : lines.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#e8dfd6] bg-white py-16 text-center shadow-sm">
            <p className="mb-6 text-[#5c4033]">Giỏ hàng của bạn đang trống.</p>
            <Link
              href="/products"
              className="inline-flex rounded-sm bg-[#4a2c20] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3d2418]"
            >
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-[#e8dfd6] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8dfd6] bg-white">
                      <th className="w-14 py-5 pl-4">
                        <span className="sr-only">Xóa</span>
                      </th>
                      <th className="w-24 py-5">
                        <span className="sr-only">Ảnh</span>
                      </th>
                      <th className="py-5 font-bold text-[#1a1a1a]">
                        <span className="border-b-2 border-[#4a2c20] pb-1">
                          Sản Phẩm
                        </span>
                      </th>
                      <th className="whitespace-nowrap py-5 text-center font-bold text-[#1a1a1a]">
                        Đơn Giá
                      </th>
                      <th className="whitespace-nowrap py-5 text-center font-bold text-[#1a1a1a]">
                        Số Lượng
                      </th>
                      <th className="whitespace-nowrap py-5 pr-4 text-right font-bold text-[#1a1a1a]">
                        Giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((line) => (
                      <tr
                        key={line.id || line.productId}
                        className="border-b border-[#e8dfd6] last:border-0"
                      >
                        <td className="align-middle py-6 pl-4">
                          <button
                            type="button"
                            onClick={() => removeFromCart(line.id || line.productId)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4a2c20] text-lg leading-none text-white shadow-sm transition hover:bg-[#3d2418]"
                            aria-label="Xóa sản phẩm"
                          >
                            ×
                          </button>
                        </td>
                        <td className="align-middle py-6">
                          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[#f5f2ef] ring-1 ring-[#e8dfd6]">
                            {line.imageUrl ? (
                              <Image
                                src={line.imageUrl}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="72px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[10px] text-[#4a2c20]/35">
                                CUPFFEE
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="align-middle py-6 pr-4">
                          <span className="font-bold text-[#1a1a1a]">
                            {line.name}
                          </span>
                        </td>
                        <td className="align-middle py-6 text-center tabular-nums text-[#4a2c20]">
                          {formatPriceVnd(line.unitPriceVnd)}
                        </td>
                        <td className="align-middle py-6">
                          <div className="flex justify-center">
                            <div className="inline-flex items-stretch overflow-hidden rounded border border-[#d5cfc8] bg-[#e8e4df] shadow-inner">
                              <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center text-lg font-medium text-[#4a2c20] transition hover:bg-[#ded9d3]"
                                onClick={() =>
                                  setCartLineQuantity(
                                    line.id || line.productId,
                                    line.quantity - 1
                                  )
                                }
                                aria-label="Giảm"
                              >
                                −
                              </button>
                              <span className="flex min-w-[2.75rem] items-center justify-center bg-[#f0eeeb] px-2 text-center text-sm font-semibold tabular-nums text-[#1a1a1a]">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center text-lg font-medium text-[#4a2c20] transition hover:bg-[#ded9d3]"
                                onClick={() =>
                                  setCartLineQuantity(
                                    line.id || line.productId,
                                    line.quantity + 1
                                  )
                                }
                                aria-label="Tăng"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle py-6 pr-4 text-right font-bold tabular-nums text-[#4a2c20]">
                          {formatPriceVnd(line.unitPriceVnd * line.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-[#e8dfd6] pt-8">
              <span className="text-lg font-bold text-[#1a1a1a]">Tổng</span>
              <span className="text-2xl font-bold tabular-nums text-[#4a2c20]">
                {formatPriceVnd(totalVnd)}
              </span>
            </div>

            <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4">
              {orderCode ? (
                <p className="rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  Đặt hàng thành công: <span className="font-bold">{orderCode}</span>
                </p>
              ) : null}
              {orderError ? (
                <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {orderError}
                </p>
              ) : null}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={ordering}
                className="w-full rounded-sm bg-[#4a2c20] py-4 text-center text-sm font-bold tracking-wide text-white shadow-sm transition hover:bg-[#3d2418]"
              >
                {ordering ? "Đang gửi đơn…" : "Mua Sản Phẩm"}
              </button>
              <Link
                href="/products"
                className="block w-full rounded-sm border border-[#d5cfc8] bg-[#ebe8e4] py-4 text-center text-sm font-bold text-[#4a2c20] transition hover:bg-[#e3ded9]"
              >
                Tiếp Tục Mua Sắm
              </Link>
            </div>
          </>
        )}
      </div>

      {recommendedProducts.length > 0 && (
        <>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <CheckerboardStrip />
          </div>
          <section className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-xl font-bold text-[#1a1a1a] lg:text-2xl">
              Có Thể Bạn Cũng Thích
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
              {recommendedProducts.map((p) => (
                <ProductListingCard
                  key={p.id}
                  product={p}
                  priceDisplay="vnd"
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
