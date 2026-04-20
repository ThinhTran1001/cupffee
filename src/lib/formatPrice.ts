/** Hiển thị giá VND gần đúng từ giá EUR trong DB (tỷ giá cố định cho UI). */
const EUR_TO_VND = 26_000;

export function formatPriceVndFromEur(eur: number): string {
  const vnd = Math.round(eur * EUR_TO_VND);
  return `${vnd.toLocaleString("vi-VN")}đ`;
}
