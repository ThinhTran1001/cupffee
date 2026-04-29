"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import CheckerboardStrip from "@/components/ui/CheckerboardStrip";

function QrOrderItemForm({ item }: { item: any }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#4a2c20");

  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingImage(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/storefront/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setQrImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  async function handleCreateQr() {
    setError(null);
    const text = message.trim();

    setSubmitting(true);
    try {
      const res = await fetch("/api/qr-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.qrMessageId,
          content: text,
          fontSize,
          color,
          imageUrl: qrImageUrl,
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Không tạo được mã QR.");
      }
      if (!data.id) throw new Error("Phản hồi không hợp lệ.");
      const origin = window.location.origin;
      const url = `${origin}/m/${data.id}`;
      setQrUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đã có lỗi xảy ra.");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink() {
    if (!qrUrl) return;
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Không copy được — hãy chọn và copy thủ công.");
    }
  }

  return (
    <div className="border border-[#e8dfd6] bg-white rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-4 mb-6 border-b border-[#e8dfd6] pb-4">
        {item.imageUrl && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f5f2ef] ring-1 ring-[#e8dfd6]">
            <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" sizes="64px" />
          </div>
        )}
        <h3 className="text-lg font-bold text-[#4a2c20]">
          {item.productName}
        </h3>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onPickFile}
      />

      <label className="block text-sm font-semibold text-[#4a2c20] mb-2">
        Hình ảnh đính kèm (Tùy chọn)
      </label>
      
      {qrImageUrl ? (
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start">
          <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-gray-200">
            <Image
              src={qrImageUrl}
              alt="Preview"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500">URL đã lưu</p>
            <p className="break-all text-xs text-gray-600 mt-1">
              {qrImageUrl}
            </p>
            <button
              type="button"
              className="text-sm text-red-600 hover:underline mt-2 inline-block"
              onClick={() => setQrImageUrl(null)}
            >
              Xóa ảnh
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploadingImage}
          className="mb-6 flex h-36 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#c4bbb4] bg-[#ebe8e4] text-[#4a2c20] transition hover:bg-[#e5e1dc] disabled:opacity-50"
        >
          {uploadingImage ? "Đang tải lên..." : (
            <>
              <span className="text-4xl font-light leading-none">+</span>
              <span className="mt-3 text-sm font-bold tracking-wide">
                CHỌN ẢNH (Từ thiết bị)
              </span>
            </>
          )}
        </button>
      )}

      <label className="block text-sm font-semibold text-[#4a2c20]">
        Lời nhắn (hiển thị khi quét QR)
      </label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder="Viết lời nhắn cho người nhận khi họ mở link từ mã QR…"
        className="mt-2 w-full rounded-md border border-[#c4bbb4] bg-white px-3 py-3 text-sm text-[#4a2c20] outline-none focus:border-[#4a2c20]"
        style={{ fontSize, color }}
      />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFontSize((s) => (s >= 28 ? 14 : s + 2))}
          className="rounded-md bg-[#4a2c20] px-3 py-2 text-xs font-semibold text-white"
        >
          Sz ({fontSize}px)
        </button>
        <span className="rounded-md border border-[#c4bbb4] bg-white px-3 py-2 text-xs text-[#5c4033]">
          Font
        </span>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded border border-[#c4bbb4] bg-white p-0.5"
          aria-label="Màu chữ"
        />
      </div>

      {error && (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleCreateQr}
          disabled={submitting}
          className="w-full rounded-sm bg-[#4a2c20] py-3.5 text-sm font-bold text-white hover:bg-[#3d2418] disabled:opacity-60"
        >
          {submitting ? "Đang lưu…" : "Cập nhật lời nhắn"}
        </button>
      </div>

      {qrUrl && (
        <div className="mt-8 rounded-2xl border border-[#e8dfd6] bg-neutral-50/80 p-6 text-center">
          <p className="text-sm font-semibold text-[#4a2c20]">
            Mã QR lời nhắn cho {item.productName}
          </p>
          <div className="mt-6 flex justify-center [&_svg]:h-auto [&_svg]:max-w-full">
            <QRCodeSVG
              value={qrUrl}
              size={200}
              level="M"
              includeMargin
              fgColor="#4a2c20"
              bgColor="#ffffff"
            />
          </div>
          <p className="mt-4 break-all text-left text-xs text-[#5c4033]">
            {qrUrl}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={copyLink}
              className="w-full rounded-sm bg-[#4a2c20] py-2.5 text-sm font-semibold text-white hover:bg-[#3d2418]"
            >
              {copied ? "Đã copy!" : "Copy link"}
            </button>
            <Link
              href={qrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center rounded-sm border border-[#4a2c20] py-2.5 text-sm font-semibold text-[#4a2c20] hover:bg-[#4a2c20]/5"
            >
              Mở link
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QrOrderClient({ initialItems = [] }: { initialItems?: any[] }) {
  if (initialItems.length === 0) {
    return (
      <div className="bg-[#faf8f5] pb-20 min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-10 text-center">
          <h1 className="text-xl font-bold leading-snug text-[#4a2c20] sm:text-2xl mb-8">
            CUPFFEE CẢM ƠN ĐÃ MUA SẢN PHẨM
          </h1>
          <p className="text-[#5c4033] mb-8">Không tìm thấy sản phẩm nào trong đơn hàng này.</p>
          <Link href="/products" className="font-semibold text-[#4a2c20] underline">Quay lại cửa hàng</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] pb-20 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-center text-xl font-bold leading-snug text-[#4a2c20] sm:text-2xl mb-4">
          CUPFFEE CẢM ƠN ĐÃ MUA SẢN PHẨM
        </h1>
        
        <p className="text-center text-base font-medium text-[#5c4033] mb-10">
          Bạn Có Thể Để Lại Lời Nhắn Cho Từng Sản Phẩm Khi Quét QR
        </p>

        {initialItems.map((item, idx) => (
          <QrOrderItemForm key={item.id || idx} item={item} />
        ))}

        <p className="mt-10 text-center">
          <Link
            href="/products"
            className="text-sm font-semibold text-[#4a2c20] underline underline-offset-4"
          >
            ← Quay lại cửa hàng
          </Link>
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <CheckerboardStrip />
      </div>
    </div>
  );
}
