"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  readCart,
  removeFromCart,
  setCartLineQuantity,
  CART_UPDATE_EVENT,
  type CartLine,
} from "@/lib/cart";
import { formatPriceVndFromEur } from "@/lib/formatPrice";
import CheckerboardStrip from "@/components/ui/CheckerboardStrip";
import ProductListingCard, {
  type ListingProduct,
} from "@/components/products/ProductListingCard";

type ResolvedLine = CartLine & {
  name: string;
  unitPriceEur: number;
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

  const resolveCart = useCallback(async () => {
    const raw = readCart();
    const out: ResolvedLine[] = [];

    for (const line of raw) {
      let name = line.name ?? "";
      let unitPriceEur = line.price ?? 0;
      let imageUrl: string | null = line.imageUrl ?? null;

      if (!name || !line.price) {
        try {
          const res = await fetch(`/api/storefront/product/${line.productId}`);
          if (res.ok) {
            const p = (await res.json()) as {
              name: string;
              price: number;
              imageUrl: string | null;
            };
            name = p.name;
            unitPriceEur = p.price;
            imageUrl = p.imageUrl;
          }
        } catch {
          /* ignore */
        }
      }

      if (!name) name = "Sản phẩm";

      out.push({
        ...line,
        name,
        unitPriceEur,
        imageUrl,
      });
    }

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

  const totalEur = lines.reduce(
    (s, l) => s + l.unitPriceEur * l.quantity,
    0
  );

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
                        key={line.productId}
                        className="border-b border-[#e8dfd6] last:border-0"
                      >
                        <td className="align-middle py-6 pl-4">
                          <button
                            type="button"
                            onClick={() => removeFromCart(line.productId)}
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
                          {formatPriceVndFromEur(line.unitPriceEur)}
                        </td>
                        <td className="align-middle py-6">
                          <div className="flex justify-center">
                            <div className="inline-flex items-stretch overflow-hidden rounded border border-[#d5cfc8] bg-[#e8e4df] shadow-inner">
                              <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center text-lg font-medium text-[#4a2c20] transition hover:bg-[#ded9d3]"
                                onClick={() =>
                                  setCartLineQuantity(
                                    line.productId,
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
                                    line.productId,
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
                          {formatPriceVndFromEur(
                            line.unitPriceEur * line.quantity
                          )}
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
                {formatPriceVndFromEur(totalEur)}
              </span>
            </div>

            <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4">
              <button
                type="button"
                onClick={() => router.push("/order/qr")}
                className="w-full rounded-sm bg-[#4a2c20] py-4 text-center text-sm font-bold tracking-wide text-white shadow-sm transition hover:bg-[#3d2418]"
              >
                Mua Sản Phẩm
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
