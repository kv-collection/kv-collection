import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Shirt, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink, Container, Eyebrow, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "THE KV COLLECTION is a women's fashion boutique owned and managed by Kajal Vaidya.",
};

const values = [
  { icon: Sparkles, title: "Hand-picked styles", text: "Each design is selected for flattering fits, soft fabrics and colours that last beyond a single season." },
  { icon: Heart, title: "Personal service", text: "Talk to us directly on WhatsApp for sizing, styling and order updates. No bots, just real help." },
  { icon: Shirt, title: "Made for real life", text: "Comfortable pieces that move with you, from busy workdays to family celebrations." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Us" title="Style that feels beautifully you." />

      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-muted">
          <Image
            src="/images/about.png"
            alt="Pastel kurtis and dresses arranged inside THE KV COLLECTION boutique"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">A boutique by {site.owner}</h2>
          <p className="leading-relaxed text-muted-foreground">
            THE KV COLLECTION is owned and managed by {site.owner}. What began as a love for beautiful clothing has grown into a
            boutique that helps women across {site.deliveryRegion} find outfits they feel confident and comfortable in.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Our collection brings together kurtis, dresses, co-ord sets, western wear, palazzo sets and suit sets, each chosen
            with care so that every woman can find something that feels beautifully her.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Shopping with us is simple and personal. Pick your favourites, send your order on WhatsApp, and pay with Cash on
            Delivery when it reaches your doorstep. Your first delivery is on us.
          </p>
          <ButtonLink href="/shop">Explore the Collection</ButtonLink>
        </div>
      </Container>

      <section className="bg-muted py-16 lg:py-24">
        <Container>
          <ul className="grid gap-10 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal flex flex-col items-center gap-4 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-background text-primary">
                  <Icon className="size-6" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-2xl">{title}</h3>
                <p className="max-w-xs leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
