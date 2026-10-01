"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Size } from "@/lib/products";
import { formatPrice, whatsappLink } from "@/lib/site";
import { MAX_QTY, useCart } from "@/components/cart-provider";
import { QuantityControl } from "@/components/quantity-control";
import { SocialIcon } from "@/components/social-icons";
import { buttonStyles } from "@/components/ui";

export function ProductPurchase({
  slug,
  name,
  price,
  sizes,
}: {
  slug: string;
  name: string;
  price: number;
  sizes: Size[];
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    addItem(slug, size, quantity);
    setAdded(true);
  }

  const quickOrder = whatsappLink(
    `Hello THE KV COLLECTION, I would like to order:\n${name}${size ? ` — Size ${size}` : ""} — Qty ${quantity} — ${formatPrice(price * quantity)}\nPayment: Cash on Delivery`,
  );

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="flex w-full items-center justify-between text-xs font-medium tracking-[0.25em] uppercase">
          <span>Select Size</span>
          {size && <span className="tracking-normal normal-case text-muted-foreground">Selected: {size}</span>}
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <label key={s} className="relative">
              <input
                type="radio"
                name="size"
                value={s}
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setError(false);
                  setAdded(false);
                }}
                className="peer sr-only"
              />
              <span className="flex h-12 min-w-14 cursor-pointer items-center justify-center rounded-full border border-border px-4 text-sm transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary hover:border-foreground">
                {s}
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-primary">
            Please select a size to continue.
          </p>
        )}
      </fieldset>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium tracking-[0.25em] uppercase" id="qty-label">
          Quantity
        </span>
        <QuantityControl
          value={quantity}
          max={MAX_QTY}
          label={name}
          onChange={(q) => {
            setQuantity(q);
            setAdded(false);
          }}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={handleAdd} className={`${buttonStyles.primary} flex-1`}>
          {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" aria-hidden="true" />}
          {added ? "Added to Bag" : "Add to Bag"}
        </button>
        <a href={quickOrder} target="_blank" rel="noopener noreferrer" className={`${buttonStyles.outline} flex-1`}>
          <SocialIcon name="whatsapp" className="size-4" /> Order on WhatsApp
        </a>
      </div>

      <div aria-live="polite">
        {added && (
          <p className="flex flex-wrap items-center gap-2 rounded-sm bg-accent/60 px-4 py-3 text-sm">
            <Check className="size-4 text-primary" aria-hidden="true" />
            {name} (Size {size}) is in your bag.
            <Link href="/cart" className="font-medium text-primary underline underline-offset-4">
              View bag
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
