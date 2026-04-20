export const CART_UPDATE_EVENT = "cupffee-cart-update";

export type CartLine = {
  productId: string;
  quantity: number;
  /** Tên và đơn giá hiển thị trong giỏ (VND) */
  name?: string;
  price?: number;
  imageUrl?: string | null;
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
    return parsed.filter(isCartLine);
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
};

export function addToCart(
  productId: string,
  quantity: number,
  meta?: CartLineMeta
) {
  const cart = readCart();
  const idx = cart.findIndex((l) => l.productId === productId);
  const mergedMeta = meta
    ? {
        ...(meta.name != null ? { name: meta.name } : {}),
        ...(meta.price != null ? { price: meta.price } : {}),
        ...(meta.imageUrl !== undefined ? { imageUrl: meta.imageUrl } : {}),
      }
    : {};
  if (idx >= 0) {
    const prev = cart[idx];
    cart[idx] = {
      ...prev,
      ...mergedMeta,
      quantity: prev.quantity + quantity,
    };
  } else {
    cart.push({
      productId,
      quantity,
      ...mergedMeta,
    });
  }
  writeCart(cart);
}

export function removeFromCart(productId: string) {
  writeCart(readCart().filter((l) => l.productId !== productId));
}

export function setCartLineQuantity(productId: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }
  const cart = readCart();
  const idx = cart.findIndex((l) => l.productId === productId);
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
