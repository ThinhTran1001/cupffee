"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Category = { id: string; name: string; slug: string };

const PRICE_OPTIONS = [
  { label: "Tất cả", min: null, max: null },
  { label: "Dưới €10", min: null, max: "10" },
  { label: "€10 – €20", min: "10", max: "20" },
  { label: "Trên €20", min: "20", max: null },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <span className="text-lg font-light leading-none w-5 text-center" aria-hidden>
      {open ? "−" : "+"}
    </span>
  );
}

function AccordionRow({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#4a2c20]/25 rounded-sm overflow-hidden bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 bg-[#4a2c20] px-4 py-3.5 text-left text-sm font-semibold text-white"
      >
        {title}
        <Chevron open={open} />
      </button>
      {open && <div className="px-4 py-3 border-t border-[#e8dfd6]">{children}</div>}
    </div>
  );
}

export default function ProductFilters({
  categories,
  volumes,
}: {
  categories: Category[];
  volumes: number[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [openPrice, setOpenPrice] = useState(false);
  const [openVolume, setOpenVolume] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);

  const currentMin = searchParams.get("minPrice");
  const currentMax = searchParams.get("maxPrice");
  const currentCategory = searchParams.get("category");
  const volumesParam = searchParams.get("volumes");
  const selectedVolumes = useMemo(
    () =>
      volumesParam
        ? volumesParam.split(",").map(Number).filter((n) => !Number.isNaN(n))
        : [],
    [volumesParam]
  );

  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      }
      const q = params.toString();
      router.push(q ? `${pathname}?${q}` : pathname);
    },
    [pathname, router, searchParams]
  );

  const applyPrice = (min: string | null, max: string | null) => {
    setParams({
      minPrice: min,
      maxPrice: max,
    });
  };

  const toggleVolume = (v: number) => {
    const next = new Set(selectedVolumes);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    const arr = [...next].sort((a, b) => a - b);
    setParams({
      volumes: arr.length ? arr.join(",") : null,
    });
  };

  const selectCategory = (slug: string | null) => {
    setParams({ category: slug });
  };

  const priceActiveIndex = PRICE_OPTIONS.findIndex((o) => {
    if (o.min === null && o.max === null)
      return currentMin === null && currentMax === null;
    return o.min === currentMin && o.max === currentMax;
  });

  return (
    <div className="lg:sticky lg:top-28 space-y-3">
      <h2 className="text-lg font-bold text-[#4a2c20] mb-4">Bộ Lọc</h2>

      <AccordionRow
        title="Giá"
        open={openPrice}
        onToggle={() => setOpenPrice((o) => !o)}
      >
        <ul className="space-y-2">
          {PRICE_OPTIONS.map((opt, i) => (
            <li key={opt.label}>
              <button
                type="button"
                onClick={() => applyPrice(opt.min, opt.max)}
                className={`w-full text-left text-sm py-1.5 rounded-sm px-2 transition-colors ${
                  priceActiveIndex === i
                    ? "bg-[#4a2c20]/10 text-[#4a2c20] font-semibold"
                    : "text-[#5c4033] hover:bg-neutral-50"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </AccordionRow>

      <AccordionRow
        title="Kích Thước"
        open={openVolume}
        onToggle={() => setOpenVolume((o) => !o)}
      >
        {volumes.length === 0 ? (
          <p className="text-sm text-[#5c4033]/70">Chưa có dữ liệu</p>
        ) : (
          <ul className="space-y-2">
            {volumes.map((v) => (
              <li key={v}>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#4a2c20]">
                  <input
                    type="checkbox"
                    checked={selectedVolumes.includes(v)}
                    onChange={() => toggleVolume(v)}
                    className="rounded border-[#4a2c20]/40 text-[#4a2c20] focus:ring-[#4a2c20]"
                  />
                  {v} ml
                </label>
              </li>
            ))}
          </ul>
        )}
      </AccordionRow>

      <AccordionRow
        title="Bộ Sưu Tập"
        open={openCollection}
        onToggle={() => setOpenCollection((o) => !o)}
      >
        <ul className="space-y-2">
          <li>
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className={`w-full text-left text-sm py-1.5 rounded-sm px-2 ${
                !currentCategory
                  ? "bg-[#4a2c20]/10 text-[#4a2c20] font-semibold"
                  : "text-[#5c4033] hover:bg-neutral-50"
              }`}
            >
              Tất cả
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => selectCategory(c.slug)}
                className={`w-full text-left text-sm py-1.5 rounded-sm px-2 ${
                  currentCategory === c.slug
                    ? "bg-[#4a2c20]/10 text-[#4a2c20] font-semibold"
                    : "text-[#5c4033] hover:bg-neutral-50"
                }`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </AccordionRow>
    </div>
  );
}
