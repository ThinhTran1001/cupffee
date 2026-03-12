import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message, rating } = body;

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name,
        email: email || null,
        company: company || null,
        content: message,
        rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
        approved: false,
      },
    });

    return NextResponse.json({ success: true, id: review.id });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
