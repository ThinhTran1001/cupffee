import Image from "next/image";

const cup = "/cup.png";

const features = [
  {
    title: "Thân thiện với môi trường",
    image: "/feature1.png",
  },
  {
    title: "An toàn với sức khỏe",
    image: "/feature2.png",
  },
  {
    title: "Đa dạng và tiện dụng",
    image: "/feature3.png",
  },
];

export default function HomeEcoStatement() {
  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          <p className="text-[#5c4033] text-2xl sm:text-3xl lg:text-[1.85rem] leading-snug font-medium rounded-2xl">
            Nơi mỗi chiếc cốc không chỉ giữ cà phê, mà còn giữ lại một phần tương
            lai xanh.
          </p>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-md">
            <Image
              src={cup}
              alt="Cốc tái sử dụng CUPFFEE"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center text-center gap-5 px-2"
            >
              <div className="relative h-40 w-40 sm:h-44 sm:w-44 lg:h-48 lg:w-48 shrink-0 overflow-hidden rounded-full bg-[#e8f0ec] ring-2 ring-[#e8dfd6]">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 176px, 192px"
                />
              </div>
              <p className="text-[#4a2c20] font-semibold text-base lg:text-lg max-w-[18rem]">
                {f.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
