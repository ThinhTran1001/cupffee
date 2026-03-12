"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  productId: string;
  onDelete: (productId: string) => Promise<void>;
}

export default function AdminProductActions({ productId, onDelete }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    startTransition(async () => {
      await onDelete(productId);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-400 transition-colors disabled:opacity-50"
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}

