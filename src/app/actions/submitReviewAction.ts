"use server";

import { prisma } from "@/lib/prisma";

export async function submitReviewAction(formData: {
  name: string;
  rating: number;
  message: string;
}) {
  const { name, rating, message } = formData;

  if (!name || !message) {
    return { error: "Vui lòng điền đầy đủ thông tin." };
  }

  try {
    await prisma.review.create({
      data: {
        name,
        content: message,
        rating: Math.min(5, Math.max(1, rating || 5)),
        approved: false, // Yêu cầu admin duyệt
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating review:", error);
    return { error: "Đã xảy ra lỗi, vui lòng thử lại." };
  }
}
