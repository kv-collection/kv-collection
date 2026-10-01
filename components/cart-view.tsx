"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/site";
import { MAX_QTY, useCart } from "@/components/cart-provider";
import { QuantityControl } from "@/components/quantity-control";
import { CheckoutForm } from "@/components/checkout-form";
import { ButtonLink, Container } from "@/components/ui";
import { SocialIcon } from "@/components/social-icons";

export function CartView() {
  const { lines, itemCount, subtotal, ready, updateQuantity, removeItem } = useCart();
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  if (sentUrl) {
    return (
      <Container className="flex animate-fade-up flex-col items-center gap-5 py-24 text-center">
        <CheckCircle2 className="size-12 text-primary" aria-hidden="true" strokeWidth={1.25} />
        <h1 className="font-serif text-4xl sm:text-5xl">Thank you for your order</h1>
        <p className="max-w-md leading-relaxed text-muted-foreground">
          Your order details have opened in WhatsApp. Please press send so we can confirm your order and delivery. Payment is
          Cash on Delivery.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-7 text-sm tracking-[0.12em] text-white uppercase"
          >
            <SocialIcon name="whatsapp" className="size-4" /> Open WhatsApp Again
          </a>
          <ButtonLink href="/shop" variant="outline">
            Continue Shopping
          </ButtonLink>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 lg:py-16">
      <h1 className="font-serif text-4xl sm:text-5xl">Shopping Bag</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {ready ? `${itemCount} ${itemCount === 1 ? "item" : "items"}` : "Loading your bag"}
      </p>

      {ready && lines.length === 0 && (
        <div className="mt-10 flex flex-col items-center gap-5 rounded-sm bg-muted px-6 py-20 text-center">
          <ShoppingBag className="size-10 text-primary" aria-hidden="true" strokeWidth={1.25} />
          <p className="font-serif text-3xl">Your bag is empty</p>
          <p className="max-w-sm text-muted-foreground">Discover kurtis, dresses, co-ords and more picked just for you.</p>
          <ButtonLink href="/shop">Start Shopping</ButtonLink>
        </div>
      )}

      {lines.length > 0 && (
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <section aria-label="Items in your bag" className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {lines.map((line) => (
                <li key={`${line.slug}-${line.size}`} className="flex gap-4 py-6 sm:gap-6">
                  <Link
                    href={`/shop/${line.slug}`}
                    className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-sm bg-muted sm:w-28"
                  >
                    <Image src={line.product.image} alt={line.product.name} fill sizes="112px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/shop/${line.slug}`} className="font-serif text-xl hover:text-primary">
                          {line.product.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Size {line.size} &middot; {formatPrice(line.product.price)} each
                        </p>
                      </div>
                      <p className="text-sm font-medium whitespace-nowrap">{formatPrice(line.lineTotal)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <QuantityControl
                        size="sm"
                        value={line.quantity}
                        max={MAX_QTY}
                        label={`${line.product.name} size ${line.size}`}
                        onChange={(q) => updateQuantity(line.slug, line.size, q)}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(line.slug, line.size)}
                        className="inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                        aria-label={`Remove ${line.product.name} size ${line.size} from bag`}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/shop" className="mt-6 inline-block text-sm tracking-[0.12em] uppercase underline-offset-4 hover:text-primary hover:underline">
              Continue shopping
            </Link>
          </section>

          <section aria-label="Order summary and checkout" className="lg:col-span-5">
            <div className="rounded-sm bg-muted p-6 sm:p-8 lg:sticky lg:top-28">
              <CheckoutForm lines={lines} subtotal={subtotal} onSent={setSentUrl} />
            </div>
          </section>
        </div>
      )}
    </Container>
  );
}
