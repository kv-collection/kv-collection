import Image from "next/image";
import Link from "next/link";
import { getCategory, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/site";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const category = getCategory(product.category);
  return (
    <article className="reveal group relative flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
        <Image
          src={product.image}
          alt={`${product.name} from THE KV COLLECTION`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase backdrop-blur">
            {product.badge}
          </span>
        )}
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-background/95 py-3 text-center text-xs tracking-[0.2em] uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          View &amp; Select Size
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">{category?.name}</p>
        <h3 className="font-serif text-xl">
          <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
          <p className="text-xs text-muted-foreground">{product.sizes.join(" / ")}</p>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < 2} />
      ))}
    </div>
  );
}
