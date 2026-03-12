import { prisma } from "@/lib/prisma";
import AdminReviewActions from "@/components/admin/AdminReviewActions";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: [{ approved: "asc" }, { createdAt: "desc" }],
  });

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1">
          {pending.length} pending · {approved.length} approved
        </p>
      </div>

      {pending.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            Pending Approval ({pending.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pending.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-orange-200 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    {review.company && (
                      <div className="text-sm text-gray-400">{review.company}</div>
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-sm">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mb-4 line-clamp-3">
                  &ldquo;{review.content}&rdquo;
                </p>
                <div className="text-xs text-gray-400 mb-4">
                  {new Date(review.createdAt).toLocaleDateString()}
                  {review.email && ` · ${review.email}`}
                </div>
                <AdminReviewActions
                  reviewId={review.id}
                  approved={review.approved}
                  featured={review.featured}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Approved Reviews ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
            No approved reviews yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approved.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-2xl border p-5 ${review.featured ? "border-[#6d3018]/30" : "border-gray-100"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{review.name}</span>
                      {review.featured && (
                        <span className="text-xs bg-[#6d3018]/10 text-[#6d3018] px-2 py-0.5 rounded-full font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    {review.company && (
                      <div className="text-sm text-gray-400">{review.company}</div>
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-sm">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mb-4 line-clamp-3">
                  &ldquo;{review.content}&rdquo;
                </p>
                <AdminReviewActions
                  reviewId={review.id}
                  approved={review.approved}
                  featured={review.featured}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
