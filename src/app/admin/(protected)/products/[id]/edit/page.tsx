import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";
import { saveProductAction } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany(),
  ]);

  if (!product) notFound();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 mt-1">Update &quot;{product.name}&quot;</p>
      </div>

      <ProductForm
        categories={categories}
        product={product}
        onSubmit={saveProductAction}
      />
    </div>
  );
}
