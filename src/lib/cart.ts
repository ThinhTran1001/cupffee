export const CART_UPDATE_EVENT = "cupffee-cart-update";

export type CartLine = {
  id?: string;
  productId: string;
  quantity: number;
  /** Tên và đơn giá hiển thị trong giỏ (VND) */
  name?: string;
  price?: number;
  imageUrl?: string | null;
  qrMessage?: string;
  qrImageUrl?: string | null;
};

const KEY = "cupffee-cart";

function isCartLine(x: unknown): x is CartLine {
  return (
    typeof x === "object" &&
    x !== null &&
    "productId" in x &&
    "quantity" in x &&
    typeof (x as CartLine).productId === "string" &&
    typeof (x as CartLine).quantity === "number"
  );
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine).map(l => ({
      ...l,
      id: l.id || Math.random().toString(36).slice(2)
    }));
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
}

export type CartLineMeta = {
  name?: string;
  price?: number;
  imageUrl?: string | null;
  qrMessage?: string;
  qrImageUrl?: string | null;
};

export function addToCart(
  productId: string,
  quantity: number,
  meta?: CartLineMeta
) {
  const cart = readCart();
  const mergedMeta = meta
    ? {
        ...(meta.name != null ? { name: meta.name } : {}),
        ...(meta.price != null ? { price: meta.price } : {}),
        ...(meta.imageUrl !== undefined ? { imageUrl: meta.imageUrl } : {}),
        ...(meta.qrMessage !== undefined ? { qrMessage: meta.qrMessage } : {}),
        ...(meta.qrImageUrl !== undefined ? { qrImageUrl: meta.qrImageUrl } : {}),
      }
    : {};
  const idx = cart.findIndex(
    (l) => l.productId === productId && l.qrMessage === meta?.qrMessage && l.qrImageUrl === meta?.qrImageUrl
  );
  if (idx >= 0) {
    const prev = cart[idx];
    cart[idx] = {
      ...prev,
      ...mergedMeta,
      quantity: prev.quantity + quantity,
    };
  } else {
    cart.push({
      id: Math.random().toString(36).slice(2),
      productId,
      quantity,
      ...mergedMeta,
    });
  }
  writeCart(cart);
}

export function removeFromCart(id: string) {
  writeCart(readCart().filter((l) => l.id !== id && l.productId !== id)); // fallback to productId removal just in case
}

export function setCartLineQuantity(id: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(id);
    return;
  }
  const cart = readCart();
  const idx = cart.findIndex((l) => l.id === id || l.productId === id);
  if (idx < 0) return;
  cart[idx] = { ...cart[idx], quantity };
  writeCart(cart);
}

export function cartTotalQuantity(cart: CartLine[]): number {
  return cart.reduce((s, l) => s + l.quantity, 0);
}

export function clearCart() {
  if (typeof window === "undefined") return;
  writeCart([]);
}
