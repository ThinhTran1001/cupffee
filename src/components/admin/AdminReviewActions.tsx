"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  reviewId: string;
  approved: boolean;
  featured: boolean;
}

export default function AdminReviewActions({ reviewId, approved, featured }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const update = async (data: Record<string, boolean>) => {
    setLoading(JSON.stringify(data));
    try {
      await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this review?")) return;
    setLoading("delete");
    try {
      await fetch(`/api/admin/reviews/${reviewId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {!approved ? (
        <button
          onClick={() => update({ approved: true, featured })}
          disabled={!!loading}
          className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 font-medium"
        >
          ✓ Approve
        </button>
      ) : (
        <button
          onClick={() => update({ approved: false, featured })}
          disabled={!!loading}
          className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 font-medium"
        >
          Unpublish
        </button>
      )}

      {approved && (
        <button
          onClick={() => update({ approved, featured: !featured })}
          disabled={!!loading}
          className={`text-xs border px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium ${
            featured
              ? "bg-[#6d3018]/10 text-[#6d3018] border-[#6d3018]/30 hover:bg-[#6d3018]/20"
              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {featured ? "★ Featured" : "☆ Feature"}
        </button>
      )}

      <button
        onClick={handleDelete}
        disabled={!!loading}
        className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 font-medium"
      >
        Delete
      </button>
    </div>
  );
}
