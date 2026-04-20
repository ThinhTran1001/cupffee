/** Hiển thị giá VND gần đúng từ giá EUR trong DB (tỷ giá cố định cho UI). */
const EUR_TO_VND = 26_000;

export function convertEurToVnd(eur: number): number {
  return Math.round(eur * EUR_TO_VND);
}

export function formatPriceVnd(vnd: number): string {
  return `${Math.round(vnd).toLocaleString("vi-VN")}đ`;
}

export function formatPriceVndFromEur(eur: number): string {
  return formatPriceVnd(convertEurToVnd(eur));
}
