"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import CheckerboardStrip from "@/components/ui/CheckerboardStrip";

const CUP_IMG = "/cup.png";

export default function QrOrderClient() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#4a2c20");

  const [recordId, setRecordId] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreviewUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function handleCreateQr() {
    setError(null);
    const text = message.trim();
    if (!text) {
      setError("Vui lòng nhập lời nhắn trước khi tạo mã QR.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/qr-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          fontSize,
          color,
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Không tạo được mã QR.");
      }
      if (!data.id) throw new Error("Phản hồi không hợp lệ.");
      const origin = window.location.origin;
      const url = `${origin}/m/${data.id}`;
      setRecordId(data.id);
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
    <div className="bg-white pb-20">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-center text-xl font-bold leading-snug text-[#4a2c20] sm:text-2xl">
          CUPFFEE CẢM ƠN ĐÃ MUA SẢN PHẨM
        </h1>

        <div className="relative mx-auto mt-10 aspect-square max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#e8dfd6] sm:max-w-sm">
          <Image
            src={CUP_IMG}
            alt="Sản phẩm CUPFFEE"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 280px, 384px"
            priority
          />
        </div>

        <p className="mt-8 text-center text-base font-medium text-[#5c4033]">
          Bạn Có Thể Để Lại Lời Nhắn Cho Sản Phẩm Khi Quét QR
        </p>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPickFile}
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative mt-10 flex min-h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#c4bbb4] bg-[#ebe8e4] text-[#4a2c20] transition hover:bg-[#e5e1dc]"
        >
          {previewUrl ? (
            <div className="relative h-64 w-full">
              <Image
                src={previewUrl}
                alt="Ảnh đã chọn"
                fill
                unoptimized
                className="object-contain p-4"
              />
            </div>
          ) : (
            <>
              <span className="text-4xl font-light leading-none">+</span>
              <span className="mt-3 text-sm font-bold tracking-wide">
                THÊM HÌNH ẢNH
              </span>
            </>
          )}
        </button>

        <label className="mt-6 block text-sm font-semibold text-[#4a2c20]">
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
            {submitting ? "Đang tạo…" : "Tạo mã QR & link lời nhắn"}
          </button>
          <button
            type="button"
            onClick={() => {
              const t = message.trim();
              window.alert(
                t
                  ? `Xem trước (chưa lưu):\n\n${t}`
                  : "Nhập lời nhắn để xem trước."
              );
            }}
            className="w-full rounded-sm border-2 border-[#c4bbb4] bg-neutral-100 py-3.5 text-sm font-bold text-[#4a2c20] hover:bg-neutral-200"
          >
            Xem trước (trên máy)
          </button>
          {recordId && (
            <Link
              href={`/m/${recordId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-sm border-2 border-[#4a2c20] py-3.5 text-center text-sm font-bold text-[#4a2c20] hover:bg-[#4a2c20]/5"
            >
              Mở trang lời nhắn (tab mới)
            </Link>
          )}
        </div>

        {qrUrl && recordId && (
          <div className="mt-10 rounded-2xl border border-[#e8dfd6] bg-neutral-50/80 p-6 text-center">
            <p className="text-sm font-semibold text-[#4a2c20]">
              Quét mã để mở link lời nhắn riêng của bạn
            </p>
            <div className="mt-6 flex justify-center [&_svg]:h-auto [&_svg]:max-w-full">
              <QRCodeSVG
                value={qrUrl}
                size={240}
                level="M"
                includeMargin
                fgColor="#4a2c20"
                bgColor="#ffffff"
              />
            </div>
            <p className="mt-4 break-all text-left text-xs text-[#5c4033]">
              {qrUrl}
            </p>
            <button
              type="button"
              onClick={copyLink}
              className="mt-4 w-full rounded-sm bg-[#4a2c20] py-2.5 text-sm font-semibold text-white hover:bg-[#3d2418]"
            >
              {copied ? "Đã copy!" : "Copy link"}
            </button>
          </div>
        )}

        <p className="mt-10 text-center">
          <Link
            href="/cart"
            className="text-sm font-semibold text-[#4a2c20] underline underline-offset-4"
          >
            ← Quay lại giỏ hàng
          </Link>
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <CheckerboardStrip />
      </div>
    </div>
  );
}
