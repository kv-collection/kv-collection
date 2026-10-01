import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getCategory, getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductGrid } from "@/components/product-card";
import { DeliveryHighlights } from "@/components/delivery-highlights";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.name} — ${formatPrice(product.price)}. ${product.description}`,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Container className="py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs tracking-[0.1em] text-muted-foreground uppercase">
            <li>
              <Link href="/shop" className="hover:text-primary">
                Shop
              </Link>
            </li>
            <ChevronRight className="size-3" aria-hidden="true" />
            <li>
              <Link href={`/shop?category=${product.category}`} className="hover:text-primary">
                {category?.name}
              </Link>
            </li>
            <ChevronRight className="size-3" aria-hidden="true" />
            <li aria-current="page" className="text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      <Container className="grid gap-10 pb-20 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[3/4] animate-fade-in overflow-hidden rounded-sm bg-muted lg:sticky lg:top-28 lg:self-start">
          <Image
            src={product.image}
            alt={`${product.name} from THE KV COLLECTION`}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex animate-fade-up flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.3em] text-primary uppercase">{category?.name}</p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{product.name}</h1>
            <p className="text-2xl">{formatPrice(product.price)}</p>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes &middot; Cash on Delivery available</p>
          </div>

          <p className="leading-relaxed text-muted-foreground">{product.description}</p>

          <ProductPurchase slug={product.slug} name={product.name} price={product.price} sizes={product.sizes} />

          <div className="border-t border-border pt-8">
            <h2 className="text-xs font-medium tracking-[0.25em] uppercase">Product Details</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              {product.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm bg-muted p-6">
            <DeliveryHighlights compact />
          </div>
        </div>
      </Container>

      <section className="border-t border-border py-20">
        <Container>
          <SectionHeading eyebrow="You may also like" title="Complete your wardrobe" />
          <div className="mt-12">
            <ProductGrid products={related} />
          </div>
        </Container>
      </section>
    </>
  );
}
