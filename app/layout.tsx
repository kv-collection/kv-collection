import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingBag } from "@/components/floating-bag";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "THE KV COLLECTION | Women's Fashion Boutique",
    template: "%s | THE KV COLLECTION",
  },
  description:
    "THE KV COLLECTION is a women's fashion boutique by Kajal Vaidya. Shop kurtis, dresses, co-ord sets, western wear, palazzo sets and suit sets. Delivery across Jharkhand with Cash on Delivery. First delivery free.",
  keywords: ["THE KV COLLECTION", "women's boutique", "kurtis", "dresses", "co-ord sets", "suit sets", "Jharkhand"],
  openGraph: {
    title: "THE KV COLLECTION | Women's Fashion Boutique",
    description: "Style that feels beautifully you. Delivery across Jharkhand. First delivery free.",
    images: ["/images/hero.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#7a2e46",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <FloatingBag />
        </CartProvider>
      </body>
    </html>
  );
}
