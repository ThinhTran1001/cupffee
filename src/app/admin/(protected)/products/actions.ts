"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export type ProductFormInput = {
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
};

export type ProductSaveResult =
  | { ok: true }
  | { ok: false; error: string };

export async function saveProductAction(
  input: ProductFormInput,
  existingId?: string
): Promise<ProductSaveResult> {
  await requireAdminSession();

  const {
    name,
    slug,
    description,
    price,
    volume,
    unit,
    imageUrl,
    features,
    inStock,
    featured,
    limitedEdition,
    categoryId,
  } = input;

  if (!name || !slug || !description || !price || !volume) {
    return { ok: false, error: "Missing required fields" };
  }

  if (!existingId) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return { ok: false, error: "Slug already exists" };
    }
  }

  try {
    if (existingId) {
      await prisma.product.update({
        where: { id: existingId },
        data: {
          name,
          slug,
          description,
          price,
          volume,
          unit: unit || "ml",
          imageUrl: imageUrl || null,
          features: features || [],
          inStock: inStock ?? true,
          featured: featured ?? false,
          limitedEdition: limitedEdition ?? false,
          categoryId: categoryId || null,
        },
      });
      revalidatePath(`/products/${existingId}`);
    } else {
      const created = await prisma.product.create({
        data: {
          name,
          slug,
          description,
          price,
          volume,
          unit: unit || "ml",
          imageUrl: imageUrl || null,
          features: features || [],
          inStock: inStock ?? true,
          featured: featured ?? false,
          limitedEdition: limitedEdition ?? false,
          categoryId: categoryId || null,
        },
      });
      revalidatePath(`/products/${created.id}`);
    }

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/products");

    return { ok: true };
  } catch (error) {
    console.error("Error saving product:", error);
    return { ok: false, error: "Internal server error" };
  }
}

export async function deleteProductAction(productId: string) {
  await requireAdminSession();

  try {
    await prisma.product.delete({ where: { id: productId } });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

