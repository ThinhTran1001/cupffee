"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function ProductGallery({
  productName,
  imageUrl,
  images,
}: {
  productName: string;
  imageUrl: string | null;
  images: string[];
}) {
  const urls = useMemo(() => {
    const list = [imageUrl, ...images].filter((u): u is string => Boolean(u));
    return list.length > 0 ? list : [];
  }, [imageUrl, images]);

  const [active, setActive] = useState(0);
  const mainSrc = urls[active] ?? null;
  const thumbs = urls.slice(0, 4);

  if (!mainSrc) {
    return (
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
        <div className="relative aspect-square w-full rounded-xl bg-gradient-to-br from-[#e8c49a]/20 to-[#4a2c20]/10 flex items-center justify-center">
          <span className="text-[#4a2c20]/35 font-semibold">CUPFFEE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-5">
      {thumbs.length > 1 && (
        <div className="flex lg:flex-col gap-3 lg:w-24 shrink-0 justify-center lg:justify-start">
          {thumbs.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 lg:h-[4.75rem] lg:w-full rounded-lg overflow-hidden border-2 transition-colors shrink-0 ${
                active === i
                  ? "border-[#4a2c20] ring-2 ring-[#4a2c20]/20"
                  : "border-[#e8dfd6] hover:border-[#4a2c20]/50"
              }`}
              aria-label={`Ảnh ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${productName} — ảnh ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
      <div className="relative flex-1 aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden bg-white">
        <Image
          src={mainSrc}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>
    </div>
  );
}
