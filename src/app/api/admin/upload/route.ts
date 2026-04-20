import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  isCloudinaryConfigured,
  uploadProductImage,
} from "@/lib/cloudinary";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error:
          "Cloudinary chưa được cấu hình. Thêm CLOUDINARY_URL hoặc CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET vào .env",
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "Thiếu file ảnh (form field: file)" },
      { status: 400 }
    );
  }

  const blob = file as Blob;
  if (blob.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Ảnh quá lớn (tối đa 8MB)" },
      { status: 400 }
    );
  }

  const mime = blob.type;
  if (!mime || !ALLOWED.has(mime)) {
    return NextResponse.json(
      { error: "Chỉ chấp nhận JPEG, PNG, WebP hoặc GIF" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await blob.arrayBuffer());
    const { secureUrl } = await uploadProductImage(buffer);
    return NextResponse.json({ url: secureUrl });
  } catch (e) {
    console.error("Cloudinary upload:", e);
    const message =
      e instanceof Error ? e.message : "Tải ảnh lên Cloudinary thất bại";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
