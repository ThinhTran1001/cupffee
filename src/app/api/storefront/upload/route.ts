import { NextRequest, NextResponse } from "next/server";
import { uploadProductImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Kích thước ảnh tối đa là 8MB" },
        { status: 400 }
      );
    }

    const { secureUrl } = await uploadProductImage(buffer);
    return NextResponse.json({ url: secureUrl });
  } catch (e: any) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: e.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
