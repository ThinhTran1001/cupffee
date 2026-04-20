import Image from "next/image";

const tall = "/tall.png";
const g1 = "/g1.png";
const g2 = "/g2.png";
const g3 = "/g3.png";
const g4 = "/g4.png";

export default function HomeNewCollection() {
  return (
    <section className="py-14 lg:py-20 border-x-[3px] border-[#d45a32]/50 mx-4 sm:mx-6 lg:mx-8 rounded-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <h2 className="text-xl lg:text-2xl font-bold text-[#1a1a1a] mb-8">
          BỘ SƯU TẬP MỚI
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-white">
            <Image
              src={tall}
              alt="Bộ cốc tumbler gốm"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-5">
            {[g1, g2, g3, g4].map((src, i) => (
              <div
                key={src}
                className="relative aspect-square rounded-2xl overflow-hidden bg-white"
              >
                <Image
                  src={src}
                  alt={`Ảnh bộ sưu tập ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 35vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
