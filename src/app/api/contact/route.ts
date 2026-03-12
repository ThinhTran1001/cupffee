import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        company: company || null,
        message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
