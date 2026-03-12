import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CustomerLoveSection from "@/components/sections/CustomerLoveSection";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="min-h-screen bg-[#f6ece0] pt-20">
      <div className="bg-[#3d1a08] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#c8956c] font-semibold text-sm uppercase tracking-widest">
            What People Say
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mt-3 mb-4">
            Customer Reviews
          </h1>
          <p className="text-[#c8956c] text-lg max-w-2xl mx-auto">
            Hear from our community of satisfied customers around the world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-[#3d1a08] mb-2">
              No reviews yet
            </h3>
            <p className="text-[#6d3018]/70 mb-6">
              Be the first to share your Cupffee experience!
            </p>
            <Link
              href="#share-love"
              className="bg-[#6d3018] text-[#f6ece0] px-8 py-4 rounded-full font-bold hover:bg-[#8b4513] transition-colors"
            >
              Write a Review
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-2xl p-6 border hover:shadow-lg transition-shadow ${
                  review.featured
                    ? "border-[#6d3018] shadow-md"
                    : "border-[#e8d5c0]"
                }`}
              >
                {review.featured && (
                  <div className="flex items-center gap-1 mb-3">
                    <span className="bg-[#6d3018] text-[#f6ece0] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      Featured
                    </span>
                  </div>
                )}

                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i} className="text-gray-200">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-[#3d1a08] text-sm leading-relaxed mb-5 italic">
                  &ldquo;{review.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-[#f6ece0] pt-4">
                  <div className="w-10 h-10 bg-[#6d3018] rounded-full flex items-center justify-center text-[#f6ece0] font-bold text-sm flex-shrink-0">
                    {review.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-[#3d1a08] text-sm">
                      {review.name}
                    </div>
                    {review.company && (
                      <div className="text-[#6d3018]/60 text-xs">
                        {review.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CustomerLoveSection />
    </div>
  );
}
