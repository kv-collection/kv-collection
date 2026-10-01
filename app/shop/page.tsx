import type { Metadata } from "next";
import Link from "next/link";
import { categories, getCategory, products, type CategorySlug } from "@/lib/products";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { ProductGrid } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop kurtis, dresses, co-ord sets, western wear, palazzo sets and suit sets from THE KV COLLECTION.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: categoryParam } = await searchParams;
  const active = categoryParam ? getCategory(categoryParam) : undefined;
  const list = active ? products.filter((p) => p.category === (active.slug as CategorySlug)) : products;

  const chips = [{ slug: undefined, name: "All" }, ...categories];

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={active ? active.name : "The Collection"}
        description={active ? active.description : "Every piece, hand-picked for comfort, colour and an effortless fit."}
      />
      <Container className="py-12 lg:py-16">
        <nav aria-label="Filter by category" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            {chips.map((c) => {
              const isActive = active?.slug === c.slug;
              return (
                <li key={c.name}>
                  <Link
                    href={c.slug ? `/shop?category=${c.slug}` : "/shop"}
                    aria-current={isActive ? "page" : undefined}
                    className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm whitespace-nowrap transition-colors hover:border-primary hover:text-primary aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="mt-10 mb-8 text-sm text-muted-foreground" aria-live="polite">
          {list.length} {list.length === 1 ? "style" : "styles"}
        </p>

        {list.length > 0 ? (
          <ProductGrid products={list} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="font-serif text-3xl">New styles arriving soon</p>
            <p className="text-muted-foreground">Explore the rest of the collection in the meantime.</p>
            <ButtonLink href="/shop">View all products</ButtonLink>
          </div>
        )}
      </Container>
    </>
  );
}
