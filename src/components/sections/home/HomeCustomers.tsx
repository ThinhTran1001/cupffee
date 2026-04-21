import { prisma } from "@/lib/prisma";
import HomeReviewSubmit from "./HomeReviewSubmit";

function Verified() {
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#2d6a4f] text-white text-[10px]"
      title="Đã xác minh"
      aria-label="Đã xác minh"
    >
      ✓
    </span>
  );
}

export default async function HomeCustomers() {
  const reviews = await prisma.review.findMany({
    where: { approved: true, featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-10 text-center">
          KHÁCH HÀNG CHÚNG TÔI
        </h2>
        
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-[#e8dfd6] bg-white p-6 lg:p-7 shadow-sm flex flex-col"
              >
                <div className="flex gap-0.5 text-amber-400 mb-4" aria-hidden>
                  {"★".repeat(r.rating || 5)}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-[#4a2c20]">{r.name}</span>
                  <Verified />
                </div>
                <p className="text-[#5c4033]/90 text-sm leading-relaxed whitespace-pre-wrap">{r.content}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-[#5c4033]/60 italic py-8">
            Chưa có đánh giá nào được hiển thị. Hãy là người đầu tiên để lại đánh giá nhé!
          </div>
        )}

        <HomeReviewSubmit />
      </div>
    </section>
  );
}
