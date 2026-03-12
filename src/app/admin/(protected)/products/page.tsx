import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminProductActions from "@/components/admin/AdminProductActions";
import { deleteProductAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#6d3018] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#8b4513] transition-colors flex items-center gap-2 text-sm"
        >
          <span className="text-lg leading-none">+</span> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No products yet
          </h3>
          <p className="text-gray-500 mb-6">
            Add your first product to get started.
          </p>
          <Link
            href="/admin/products/new"
            className="bg-[#6d3018] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8b4513] transition-colors"
          >
            Add First Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {product.volume}
                          {product.unit} • {product.featured ? "Featured" : "Standard"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900 text-sm">
                        €{product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                        />
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          target="_blank"
                          className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs text-[#6d3018] hover:text-[#8b4513] px-3 py-1.5 rounded-lg border border-[#6d3018]/30 hover:border-[#6d3018] transition-colors"
                        >
                          Edit
                        </Link>
                        <AdminProductActions
                          productId={product.id}
                          onDelete={deleteProductAction}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
