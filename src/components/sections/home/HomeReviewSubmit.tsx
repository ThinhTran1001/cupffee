"use client";

import { useState, useTransition } from "react";
import { submitReviewAction } from "@/app/actions/submitReviewAction";

export default function HomeReviewSubmit() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  if (!isOpen) {
    return (
      <div className="flex justify-center mt-12 w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="border-2 border-[#4B2C20] text-[#4B2C20] py-3 px-8 rounded-full font-bold hover:bg-[#4B2C20] hover:text-white transition-colors"
        >
          Viết đánh giá của bạn
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await submitReviewAction(formData);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    });
  };

  if (status === "success") {
    return (
      <div className="mt-12 text-center p-8 bg-[#f6ece0] rounded-2xl max-w-2xl mx-auto border border-[#e8dfd6]">
        <h3 className="text-xl font-bold text-[#4B2C20] mb-2">Cảm ơn bạn đã đánh giá!</h3>
        <p className="text-[#5c4033]/80">
          Đánh giá của bạn đã được gửi thành công và đang chờ xét duyệt để hiển thị.
        </p>
        <button
          onClick={() => {
            setIsOpen(false);
            setStatus("idle");
            setFormData({ name: "", rating: 5, message: "" });
          }}
          className="mt-6 text-[#4B2C20] font-semibold underline underline-offset-4 text-sm"
        >
          Đóng
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-[#f6ece0] rounded-3xl p-6 lg:p-10 max-w-3xl mx-auto border border-[#e8dfd6]">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#4B2C20] mb-2">Gửi phản hồi của bạn</h3>
        <p className="text-[#5c4033]/80 text-sm">Chia sẻ trải nghiệm của bạn với CUPFFEE</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#4B2C20] mb-2">Đánh giá (Số sao)</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className={`text-2xl transition-colors ${
                  star <= formData.rating ? "text-amber-400" : "text-neutral-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#4B2C20] mb-2">Họ & Tên *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-[#e8dfd6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B2C20] bg-white text-[#4B2C20]"
            placeholder="Tên của bạn"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#4B2C20] mb-2">Nội dung đánh giá *</label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border border-[#e8dfd6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B2C20] bg-white text-[#4B2C20] resize-none"
            placeholder="Sản phẩm rất tuyệt, mình rất thích..."
          />
        </div>

        {status === "error" && (
          <p className="text-red-600 text-sm font-medium text-center">
            Có lỗi xảy ra khi gửi, vui lòng thử lại!
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-[#4B2C20] text-white py-3 rounded-full font-bold hover:bg-[#3d1a08] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "Đang gửi..." : "Gửi Đánh Giá"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="sm:w-32 py-3 rounded-full font-semibold text-[#4B2C20] hover:bg-black/5 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
