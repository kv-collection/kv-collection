import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/products";

export function CategoryTile({ category, showDescription = false }: { category: Category; showDescription?: boolean }) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="reveal group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-sm bg-muted"
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, 45vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
      <span className="relative flex flex-col gap-1 p-4 text-primary-foreground sm:p-6">
        <span className="font-serif text-2xl sm:text-3xl">{category.name}</span>
        {showDescription && (
          <span className="hidden text-sm leading-relaxed text-primary-foreground/85 sm:block">{category.description}</span>
        )}
        <span className="mt-1 text-[11px] tracking-[0.25em] uppercase underline-offset-4 group-hover:underline">Shop now</span>
      </span>
    </Link>
  );
}
