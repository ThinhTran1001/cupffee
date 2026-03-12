"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Category, Product } from "@prisma/client";
import Link from "next/link";

interface Props {
  categories: Category[];
  product?: Product;
  onSubmit: (
    input: {
      name: string;
      slug: string;
      description: string;
      price: number;
      volume: number;
      unit: string;
      imageUrl: string | null;
      features: string[];
      inStock: boolean;
      featured: boolean;
      categoryId: string | null;
    },
    existingId?: string
  ) => Promise<{ ok: boolean; error?: string }>;
}

export default function ProductForm({ categories, product, onSubmit }: Props) {
  const router = useRouter();
  const isEdit = !!product;

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    volume: product?.volume?.toString() ?? "",
    unit: product?.unit ?? "ml",
    imageUrl: product?.imageUrl ?? "",
    features: product?.features?.join("\n") ?? "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    categoryId: product?.categoryId ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      volume: parseInt(formData.volume),
      features: formData.features.split("\n").filter(Boolean),
      categoryId: formData.categoryId || null,
      imageUrl: formData.imageUrl || null,
    };

    setLoading(true);

    startTransition(async () => {
      const result = await onSubmit(payload, product?.id);

      if (!result.ok) {
        setError(result.error || "Failed to save product");
        setLoading(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: !isEdit ? generateSlug(e.target.value) : formData.slug,
                });
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018]"
              placeholder="Cupffee Cup 110ml"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018]"
              placeholder="cupffee-cup-110ml"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018] resize-none"
            placeholder="Describe the product..."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Price (€) *
            </label>
            <input
              type="number"
              required
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018]"
              placeholder="13.29"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Volume *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.volume}
              onChange={(e) =>
                setFormData({ ...formData, volume: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018]"
              placeholder="110"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018]"
            >
              <option value="ml">ml</option>
              <option value="oz">oz</option>
              <option value="cl">cl</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018]"
            >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
          Media & Features
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Image URL
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018]"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Features (one per line)
          </label>
          <textarea
            rows={4}
            value={formData.features}
            onChange={(e) =>
              setFormData({ ...formData, features: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d3018] resize-none"
            placeholder="Thermo resistant up to 85°C&#10;Leak-proof for hours&#10;100% Vegan"
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) =>
                setFormData({ ...formData, inStock: e.target.checked })
              }
              className="w-4 h-4 accent-[#6d3018] rounded"
            />
            <span className="text-sm font-medium text-gray-700">In Stock</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 accent-[#6d3018] rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Featured Product
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading || isPending}
          className="bg-[#6d3018] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#8b4513] transition-colors disabled:opacity-60"
        >
          {loading || isPending
            ? "Saving..."
            : isEdit
            ? "Update Product"
            : "Create Product"}
        </button>
        <Link
          href="/admin/products"
          className="text-gray-500 hover:text-gray-700 font-medium text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
