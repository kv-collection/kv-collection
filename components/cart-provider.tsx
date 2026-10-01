"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product, type Size } from "@/lib/products";

export type CartLine = {
  slug: string;
  size: Size;
  quantity: number;
};

export type CartLineWithProduct = CartLine & { product: Product; lineTotal: number };

type CartContextValue = {
  lines: CartLineWithProduct[];
  itemCount: number;
  subtotal: number;
  ready: boolean;
  addItem: (slug: string, size: Size, quantity?: number) => void;
  updateQuantity: (slug: string, size: Size, quantity: number) => void;
  removeItem: (slug: string, size: Size) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kv-collection-bag";
export const MAX_QTY = 10;

function isValidLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  const product = getProduct(line.slug);
  return (
    !!product &&
    product.sizes.includes(line.size) &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= MAX_QTY
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) setRaw(stored.filter(isValidLine));
    } catch {
      // Ignore malformed stored bag and start fresh.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
  }, [raw, ready]);

  const addItem = useCallback((slug: string, size: Size, quantity = 1) => {
    setRaw((current) => {
      const existing = current.find((l) => l.slug === slug && l.size === size);
      if (existing) {
        return current.map((l) =>
          l === existing ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l,
        );
      }
      return [...current, { slug, size, quantity: Math.min(MAX_QTY, quantity) }];
    });
  }, []);

  const updateQuantity = useCallback((slug: string, size: Size, quantity: number) => {
    setRaw((current) =>
      current
        .map((l) =>
          l.slug === slug && l.size === size ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l,
        )
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((slug: string, size: Size) => {
    setRaw((current) => current.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = raw.flatMap((line) => {
      const product = getProduct(line.slug);
      return product ? [{ ...line, product, lineTotal: product.price * line.quantity }] : [];
    });
    return {
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0),
      ready,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    };
  }, [raw, ready, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
