"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email hoặc mật khẩu không chính xác");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#3d1a08] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Quản Trị Hệ Thống</h1>
          <p className="text-[#c8956c] mt-1 text-sm">
            Đăng nhập để quản lý cửa hàng CUPFFEE
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#f6ece0] rounded-3xl p-8 shadow-2xl space-y-5"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
              Địa Chỉ Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-white text-[#3d1a08]"
              placeholder="Email..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3d1a08] mb-1.5">
              Mật Khẩu
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-[#e8d5c0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6d3018] bg-white text-[#3d1a08]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6d3018] text-[#f6ece0] py-4 rounded-xl font-bold hover:bg-[#8b4513] transition-colors disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng Nhập →"}
          </button>

        </form>
      </div>
    </div>
  );
}
