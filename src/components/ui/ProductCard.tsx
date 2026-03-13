import Image from "next/image";
import Link from "next/link";
import { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & { category: Category | null };

export default function ProductCard({
  product,
}: {
  product: ProductWithCategory;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#e8d5c0] group">
      <div className="relative h-52 bg-[#f6ece0] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8c49a]/30 to-[#6d3018]/10">
            <Image
              src="/logo-cupffee-without-bg.png"
              alt={product.name}
              width={120}
              height={120}
              className="w-24 h-24 object-contain opacity-60 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-[#6d3018] text-[#f6ece0] text-xs font-bold px-2.5 py-1 rounded-full">
            Featured
          </div>
        )}
        {product.category && (
          <div className="absolute top-3 right-3 bg-white/90 text-[#6d3018] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#e8d5c0]">
            {product.category.name}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-[#3d1a08] text-lg leading-snug mb-1 group-hover:text-[#6d3018] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-[#f6ece0] text-[#6d3018] px-2 py-0.5 rounded-full font-medium border border-[#e8d5c0]">
            {product.volume}
            {product.unit}
          </span>
          {product.inStock ? (
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-red-500 font-medium">
              Out of Stock
            </span>
          )}
        </div>

        <p className="text-[#6d3018]/70 text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#6d3018]">
            €{product.price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="bg-[#6d3018] text-[#f6ece0] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#8b4513] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
