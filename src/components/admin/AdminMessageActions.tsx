"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminMessageActions({
  messageId,
  read,
}: {
  messageId: string;
  read: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const markRead = async () => {
    setLoading(true);
    try {
      await fetch(`/api/admin/messages/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={markRead}
      disabled={loading}
      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 font-medium ${
        read
          ? "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
          : "bg-[#6d3018]/10 text-[#6d3018] border-[#6d3018]/30 hover:bg-[#6d3018]/20"
      }`}
    >
      {read ? "Mark Unread" : "Mark Read ✓"}
    </button>
  );
}
