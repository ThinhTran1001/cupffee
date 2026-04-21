"use client";

import { useState } from "react";

const contactTypes = [
  { value: "general", label: "Thông Tin Chung" },
  { value: "order", label: "Đặt Hàng" },
  { value: "sample", label: "Yêu Cầu Hàng Mẫu" },
  { value: "branding", label: "In Ấn Thương Hiệu" },
  { value: "wholesale", label: "Mua Sỉ / Số Lượng Lớn" },
  { value: "partnership", label: "Hợp Tác Kinh Doanh" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    type: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      console.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#3d1a08] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#c8956c] font-semibold text-sm uppercase tracking-widest">
            Kết Nối
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mt-3 mb-4">
            Liên Hệ
          </h1>
          <p className="text-[#c8956c] text-lg max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe. Hãy gửi tin nhắn và chúng tôi sẽ
            phản hồi sớm nhất có thể.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#3d1a08] mb-6">
                Trò Chuyện Cùng Chúng Tôi
              </h2>
              <p className="text-[#6d3018]/70 leading-relaxed">
                Bất kể bạn muốn đặt hàng, in ấn thương hiệu hay chỉ đơn giản là tìm
                hiểu thêm về CUPFFEE — chúng tôi đều ở đây để hỗ trợ.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { icon: "📧", label: "Email", value: "cupffeevn@gmail.com" },
                { icon: "📞", label: "Điện Thoại", value: "0868239668" },
                { icon: "📍", label: "Địa Chỉ", value: "9 Dịch Vọng Hậu, Cầu Giấy, Hà Nội" },
                {
                  icon: "🕐",
                  label: "Thời Gian Phản Hồi",
                  value: "Trong vòng 24 giờ",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#6d3018]/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[#6d3018]/50 font-medium uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-[#3d1a08] font-semibold text-sm mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-[#3d1a08] font-bold mb-3 text-sm">
                Theo Dõi Chúng Tôi
              </h3>
              <div className="flex gap-3">
                {["Facebook", "Instagram", "TikTok", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-9 h-9 bg-[#6d3018] rounded-full flex items-center justify-center text-[#f6ece0] text-xs font-bold hover:bg-[#8b4513] transition-colors"
                  >
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#e8d5c0]">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-[#3d1a08] mb-2">
                  Đã Gửi Tin Nhắn!
                </h3>
                <p className="text-[#6d3018]/70 mb-6">
                  Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ tới.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      type: "general",
                      message: "",
                    });
                  }}
                  className="bg-[#6d3018] text-[#f6ece0] px-6 py-3 rounded-full font-semibold hover:bg-[#8b4513] transition-colors"
                >
                  Gửi Thêm Lời Nhắn
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-sm border border-[#e8d5c0] space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/30 text-[#3d1a08]"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                      Địa Chỉ Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/30 text-[#3d1a08]"
                      placeholder="nguyenvana@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                    Công Ty
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/30 text-[#3d1a08]"
                    placeholder="Tên công ty của bạn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                    Chủ Đề Liên Hệ
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/30 text-[#3d1a08]"
                  >
                    {contactTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
                    Nội Dung *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-[#f6ece0]/30 text-[#3d1a08] resize-none"
                    placeholder="Cho chúng tôi biết chúng tôi có thể giúp gì cho bạn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6d3018] text-[#f6ece0] py-4 rounded-full font-bold text-lg hover:bg-[#8b4513] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang gửi..." : "Gửi Tin Nhắn →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
