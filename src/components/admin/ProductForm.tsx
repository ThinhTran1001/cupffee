"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Category, Product } from "@prisma/client";
import Image from "next/image";
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
      limitedEdition: boolean;
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
    limitedEdition: product?.limitedEdition ?? false,
    categoryId: product?.categoryId ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const uploadImageToCloudinary = async (file: File) => {
    setUploadingImage(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
      credentials: "same-origin",
    });
    const data = (await res.json()) as { url?: string; error?: string };
    setUploadingImage(false);
    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }
    if (!data.url) {
      throw new Error("No image URL returned");
    }
    setFormData((prev) => ({ ...prev, imageUrl: data.url! }));
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      await uploadImageToCloudinary(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

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

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Product image
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Ảnh được tải lên Cloudinary (JPEG, PNG, WebP, GIF — tối đa 8MB).
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#6d3018] hover:bg-amber-50/50">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                disabled={uploadingImage || loading || isPending}
                onChange={handleImageFile}
              />
              {uploadingImage ? "Đang tải lên…" : "Chọn ảnh & tải lên Cloudinary"}
            </label>
            {formData.imageUrl ? (
              <button
                type="button"
                className="text-sm text-red-600 hover:underline"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, imageUrl: "" }))
                }
              >
                Xóa ảnh
              </button>
            ) : null}
          </div>
          {formData.imageUrl ? (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-500">URL đã lưu</p>
                <p className="break-all text-xs text-gray-600 mt-1">
                  {formData.imageUrl}
                </p>
              </div>
            </div>
          ) : null}
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

          <label className="flex max-w-md cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={formData.limitedEdition}
              onChange={(e) =>
                setFormData({ ...formData, limitedEdition: e.target.checked })
              }
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#6d3018] rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Limited edition (hiển thị ở mục &quot;Sản phẩm giới hạn&quot; trên
              trang chủ)
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
