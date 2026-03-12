import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { saveProductAction } from "../actions";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500 mt-1">
          Create a new edible cup product for your store.
        </p>
      </div>

      <ProductForm categories={categories} onSubmit={saveProductAction} />
    </div>
  );
}
