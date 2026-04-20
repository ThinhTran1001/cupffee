"use client";

import { useState } from "react";

function Row({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#d8d4d0] last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 py-4 text-left"
      >
        <span className="text-base font-semibold text-[#4a2c20]">{title}</span>
        <span className="text-xl font-light text-[#4a2c20] tabular-nums w-6 text-center" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed text-[#5c4033]/90">{children}</div>
      )}
    </div>
  );
}

export default function ProductDetailAccordions({
  description,
  features,
}: {
  description: string;
  features: string[];
}) {
  const [openDesc, setOpenDesc] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(true);
  const [openReturn, setOpenReturn] = useState(false);
  const [openWarranty, setOpenWarranty] = useState(true);

  return (
    <div className="rounded-xl bg-white px-5 py-2 shadow-sm border border-[#e8dfd6]/80">
      <Row title="Mô Tả" open={openDesc} onToggle={() => setOpenDesc((o) => !o)}>
        <p>{description}</p>
      </Row>

      <Row
        title="Chất Liệu"
        open={openMaterial}
        onToggle={() => setOpenMaterial((o) => !o)}
      >
        {features.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : (
          <p>
            Sản phẩm gốm sứ cao cấp, men tự nhiên, an toàn cho thực phẩm và đồ uống
            nóng.
          </p>
        )}
      </Row>

      <Row
        title="Chính Sách Bảo Hành Và Đổi Trả"
        open={openReturn}
        onToggle={() => setOpenReturn((o) => !o)}
      >
        <p className="mb-3">
          Đổi trả trong vòng <strong>30 ngày</strong> kể từ ngày nhận hàng đối với
          sản phẩm còn nguyên tem, chưa qua sử dụng và còn đầy đủ phụ kiện đi kèm.
        </p>
        <p>
          Chi phí vận chuyển đổi trả do khách hàng chi trả, trừ trường hợp lỗi từ
          phía CUPFFEE.
        </p>
      </Row>

      <Row
        title="Chính Sách Bảo Hành"
        open={openWarranty}
        onToggle={() => setOpenWarranty((o) => !o)}
      >
        <p className="mb-3">
          Miễn phí vận chuyển cho đơn hàng từ mức tối thiểu do CUPFFEE công bố từng
          thời kỳ (áp dụng nội địa).
        </p>
        <p>
          Bảo hành lỗi sản xuất trong <strong>12 tháng</strong>. Liên hệ bộ phận hỗ
          trợ kèm hình ảnh và mã đơn để được xử lý nhanh nhất.
        </p>
      </Row>
    </div>
  );
}
