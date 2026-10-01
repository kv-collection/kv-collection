"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { SocialIcon } from "@/components/social-icons";
import { formatPrice, whatsappLink } from "@/lib/site";

export function FloatingBag() {
  const pathname = usePathname();
  const { itemCount, subtotal, ready } = useCart();

  if (!ready || pathname === "/cart") return null;

  if (itemCount === 0) {
    return (
      <a
        href={whatsappLink("Hello THE KV COLLECTION, I would like to know more about your collection.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens in a new tab)"
        className="fixed right-4 bottom-4 z-30 flex size-14 animate-fade-up items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-foreground/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
      >
        <SocialIcon name="whatsapp" className="size-6" />
      </a>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 animate-fade-up p-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:p-0">
      <Link
        href="/cart"
        className="flex items-center justify-between gap-6 rounded-full bg-primary py-3 pr-6 pl-4 text-primary-foreground shadow-xl shadow-primary/25 transition-colors hover:bg-primary-hover"
      >
        <span className="flex items-center gap-3">
          <span className="relative flex size-9 items-center justify-center rounded-full bg-primary-foreground/15">
            <ShoppingBag className="size-4" aria-hidden="true" />
          </span>
          <span className="text-sm tracking-wide">
            View Bag <span className="text-primary-foreground/75">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          </span>
        </span>
        <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
      </Link>
    </div>
  );
}
