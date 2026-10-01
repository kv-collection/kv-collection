"use client";

import Link from "next/link";
import { useState } from "react";
import { Truck } from "lucide-react";
import { formatPrice, site, whatsappLink } from "@/lib/site";
import { useCart, type CartLineWithProduct } from "@/components/cart-provider";
import { SocialIcon } from "@/components/social-icons";

type Errors = Partial<Record<"name" | "phone" | "address" | "city" | "pincode", string>>;

const inputClass =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-primary";

export function CheckoutForm({
  lines,
  subtotal,
  onSent,
}: {
  lines: CartLineWithProduct[];
  subtotal: number;
  onSent: (url: string) => void;
}) {
  const { clear } = useCart();
  const [firstOrder, setFirstOrder] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const phone = get("phone").replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
    const address = get("address");
    const city = get("city");
    const pincode = get("pincode");
    const note = get("note");

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(phone)) next.phone = "Please enter a valid 10-digit mobile number.";
    if (address.length < 8) next.address = "Please enter your complete delivery address.";
    if (city.length < 2) next.city = "Please enter your city or town.";
    if (!/^\d{6}$/.test(pincode)) next.pincode = "Please enter a valid 6-digit pincode.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`checkout-${firstKey}`)?.focus();
      return;
    }

    const itemsText = lines
      .map(
        (l, i) =>
          `${i + 1}. ${l.product.name} | Size: ${l.size} | Qty: ${l.quantity} | ${formatPrice(l.lineTotal)}`,
      )
      .join("\n");

    const message = [
      "Hello THE KV COLLECTION, I would like to place an order.",
      "",
      "*Order Items*",
      itemsText,
      "",
      `*Subtotal:* ${formatPrice(subtotal)}`,
      `*Delivery:* ${firstOrder ? "First order - Free delivery" : "Please confirm delivery charge"}`,
      "*Payment:* Cash on Delivery (COD)",
      "",
      "*Customer Details*",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      `City/Town: ${city}, ${site.deliveryRegion}`,
      `Pincode: ${pincode}`,
      note ? `Note: ${note}` : "",
    ]
      .filter((line, idx, arr) => !(line === "" && arr[idx - 1] === ""))
      .join("\n")
      .trim();

    const url = whatsappLink(message);
    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    onSent(url);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <h2 className="font-serif text-2xl">Order Summary</h2>

      <dl className="flex flex-col gap-3 border-b border-border pb-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Delivery</dt>
          <dd className="text-right">{firstOrder ? <span className="text-primary">Free (first order)</span> : "Confirmed on WhatsApp"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Payment</dt>
          <dd>Cash on Delivery</dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between border-t border-border pt-4">
          <dt className="font-medium">Total</dt>
          <dd className="font-serif text-3xl">{formatPrice(subtotal)}</dd>
        </div>
        {!firstOrder && <p className="text-xs text-muted-foreground">Delivery charge, if any, will be added after confirmation.</p>}
      </dl>

      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={firstOrder}
          onChange={(e) => setFirstOrder(e.target.checked)}
          className="mt-0.5 size-4 accent-primary"
        />
        <span>This is my first order with THE KV COLLECTION (free delivery)</span>
      </label>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-xs font-medium tracking-[0.25em] uppercase">Delivery Details</legend>
        <Field id="name" label="Full name" error={errors.name}>
          <input id="checkout-name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field id="phone" label="Mobile number" error={errors.phone}>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className={inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>
        <Field id="address" label="Full address" error={errors.address}>
          <textarea
            id="checkout-address"
            name="address"
            rows={3}
            autoComplete="street-address"
            placeholder="House no., street, landmark"
            className={`${inputClass} resize-none`}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field id="city" label="City / Town" error={errors.city}>
            <input id="checkout-city" name="city" autoComplete="address-level2" className={inputClass} aria-invalid={!!errors.city} aria-describedby={errors.city ? "city-error" : undefined} />
          </Field>
          <Field id="pincode" label="Pincode" error={errors.pincode}>
            <input
              id="checkout-pincode"
              name="pincode"
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              className={inputClass}
              aria-invalid={!!errors.pincode}
              aria-describedby={errors.pincode ? "pincode-error" : undefined}
            />
          </Field>
        </div>
        <Field id="note" label="Order note (optional)">
          <input id="checkout-note" name="note" placeholder="Preferred delivery time, colour query, etc." className={inputClass} />
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-medium tracking-[0.25em] uppercase">Payment Method</legend>
        <label className="flex items-start gap-3 rounded-sm border border-primary bg-background p-4 text-sm">
          <input type="radio" name="payment" value="cod" defaultChecked className="mt-0.5 size-4 accent-primary" />
          <span>
            <span className="block font-medium">Cash on Delivery (COD)</span>
            <span className="text-muted-foreground">Pay in cash when your order arrives. No online payment needed.</span>
          </span>
        </label>
      </fieldset>

      <p className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
        <Truck className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          We deliver across {site.deliveryRegion}. Your order is confirmed once we reply on WhatsApp.{" "}
          <Link href="/customer-care#shipping" className="underline underline-offset-2 hover:text-primary">
            Delivery info
          </Link>
        </span>
      </p>

      <button
        type="submit"
        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#1f8f4e] px-7 text-sm tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#187540]"
      >
        <SocialIcon name="whatsapp" className="size-5" /> Place Order on WhatsApp
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`checkout-${id}`} className="text-sm">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-primary">
          {error}
        </p>
      )}
    </div>
  );
}
