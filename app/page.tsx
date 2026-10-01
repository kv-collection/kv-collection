import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { ButtonLink, Container, Eyebrow, SectionHeading, buttonStyles } from "@/components/ui";
import { ProductGrid } from "@/components/product-card";
import { DeliveryHighlights } from "@/components/delivery-highlights";
import { CategoryTile } from "@/components/category-tile";
import { SocialIcon } from "@/components/social-icons";

export default function HomePage() {
  const featured = products.filter((p) =>
    ["elegant-printed-kurti", "soft-co-ord-set", "statement-dress"].includes(p.slug),
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="order-2 flex animate-fade-up flex-col items-start gap-6 lg:order-1">
            <Eyebrow>{site.descriptor}</Eyebrow>
            <h1 className="font-serif text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              Style that feels <em className="text-primary">beautifully</em> you.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-pretty text-muted-foreground">
              Thoughtfully chosen kurtis, dresses, co-ords and suit sets for every mood and moment, delivered to your door across{" "}
              {site.deliveryRegion}.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/shop">
                Shop the Collection <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/categories" variant="outline">
                Browse Categories
              </ButtonLink>
            </div>
            <p className="text-sm text-muted-foreground">
              First delivery free &middot; Cash on Delivery &middot; Order on WhatsApp
            </p>
          </div>
          <div className="relative order-1 animate-fade-in lg:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-t-full bg-muted">
              <Image
                src="/images/hero.png"
                alt="Woman wearing an elegant blush embroidered kurta from THE KV COLLECTION"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-0 hidden rounded-sm bg-background/95 px-5 py-4 shadow-lg shadow-foreground/5 backdrop-blur sm:block lg:-left-6">
              <p className="font-serif text-2xl">New Season Edit</p>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Starting at ₹999</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Delivery and ordering" className="border-y border-border bg-muted">
        <Container className="py-10">
          <DeliveryHighlights />
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Shop by Category"
            title="Find your favourite silhouette"
            description="From everyday kurtis to festive suit sets, explore six curated categories made for real wardrobes."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryTile key={c.slug} category={c} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted py-20 lg:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading align="left" eyebrow="Customer Favourites" title="Loved by our customers" />
            <Link href="/shop" className="group inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase hover:text-primary">
              View all products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
            <Image
              src="/images/about.png"
              alt="A rail of pastel kurtis and dresses inside THE KV COLLECTION boutique"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
              A boutique built on personal care
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              THE KV COLLECTION is owned and managed by {site.owner}. Every piece is hand-picked for comfort, flattering fits
              and colours that make you feel like the best version of yourself.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We keep shopping simple and personal: choose your favourites, place your order on WhatsApp, and pay in cash when
              it arrives.
            </p>
            <ButtonLink href="/about" variant="outline">
              Read Our Story
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-primary text-primary-foreground">
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <p className="text-xs tracking-[0.3em] text-primary-foreground/70 uppercase">Need help choosing?</p>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Chat with us for sizes, colours and styling advice
          </h2>
          <p className="max-w-lg text-primary-foreground/80">
            Message or call us on {site.phoneDisplay}. We are happy to help you find the perfect outfit.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink("Hello THE KV COLLECTION, I need help choosing an outfit.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles.light}
            >
              <SocialIcon name="whatsapp" className="size-4" /> Chat on WhatsApp
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className={`${buttonStyles.outline} border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-primary`}
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
