import type { Metadata } from "next";
import { categories } from "@/lib/products";
import { Container, PageHeader } from "@/components/ui";
import { CategoryTile } from "@/components/category-tile";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse Kurtis, Dresses, Co-ord Sets, Western Wear, Palazzo Sets and Suit Sets at THE KV COLLECTION.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Categories"
        title="Shop by Category"
        description="Six curated edits for workdays, weekends, celebrations and everything in between."
      />
      <Container className="py-14 lg:py-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryTile key={c.slug} category={c} showDescription />
          ))}
        </div>
      </Container>
    </>
  );
}
