"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { useCart } from "@/components/cart-provider";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="bg-primary px-4 py-2 text-center text-[11px] font-bold tracking-[0.18em] text-primary-foreground uppercase sm:text-xs">
  Delivering across {site.deliveryRegion}!
</div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-ml-2 flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>

          <Link
            href="/"
            className="flex items-center"
            aria-label="THE KV COLLECTION home"
          >
            <Image
              src="/images/IMG-20261001-WA0108.jpg"
              alt="THE KV COLLECTION"
              width={190}
              height={65}
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
              priority
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className="relative py-2 text-sm tracking-[0.12em] uppercase text-foreground/80 transition-colors hover:text-primary aria-[current=page]:text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/cart"
            className="relative -mr-2 flex size-11 items-center justify-center rounded-full transition-colors hover:bg-muted"
            aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-5 text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            className="absolute inset-0 animate-fade-in bg-foreground/40"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={-1}
          />

          <div className="relative flex h-full w-[85%] max-w-sm animate-fade-up flex-col bg-background px-6 py-6">
            <div className="flex items-center justify-between">
              <Image
                src="/images/IMG-20261001-WA0108.jpg"
                alt="THE KV COLLECTION"
                width={160}
                height={55}
                className="h-12 w-auto object-contain"
              />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 flex size-11 items-center justify-center rounded-full hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10">
              <ul className="flex flex-col">
                {[...navLinks, { href: "/cart", label: "Shopping Bag" }].map((link) => (
                  <li key={link.href} className="border-b border-border">
                    <Link
                      href={link.href}
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                      className="block py-4 font-serif text-2xl transition-colors hover:text-primary aria-[current=page]:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
              Order on WhatsApp or call{" "}
              <a
                href={`tel:${site.phoneTel}`}
                className="text-foreground underline underline-offset-4"
              >
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
