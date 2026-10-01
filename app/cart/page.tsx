import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review your bag and place your Cash on Delivery order on WhatsApp with THE KV COLLECTION.",
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
