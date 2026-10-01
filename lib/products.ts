export type Size = "S" | "M" | "L" | "XL" | "XXL";

export type CategorySlug =
  | "kurtis"
  | "dresses"
  | "co-ord-sets"
  | "western-wear"
  | "palazzo-sets"
  | "suit-sets";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  sizes: Size[];
  image: string;
  description: string;
  details: string[];
  badge?: string;
};

export const categories: Category[] = [
  {
    slug: "kurtis",
    name: "Kurtis",
    description: "Everyday prints and graceful silhouettes for work, college and celebrations.",
    image: "/images/products/elegant-printed-kurti.png",
  },
  {
    slug: "dresses",
    name: "Dresses",
    description: "Flowing, flattering dresses made for brunches, dinners and every moment between.",
    image: "/images/products/statement-dress.png",
  },
  {
    slug: "co-ord-sets",
    name: "Co-ord Sets",
    description: "Effortlessly matched sets that look polished with zero styling stress.",
    image: "/images/products/soft-co-ord-set.png",
  },
  {
    slug: "western-wear",
    name: "Western Wear",
    description: "Modern tops and separates with a soft, feminine edge.",
    image: "/images/products/western-top.png",
  },
  {
    slug: "palazzo-sets",
    name: "Palazzo Sets",
    description: "Breezy kurta and palazzo pairings for comfort that still feels dressed up.",
    image: "/images/products/palazzo-set.png",
  },
  {
    slug: "suit-sets",
    name: "Suit Sets",
    description: "Classic suits with delicate detailing for festive days and family occasions.",
    image: "/images/products/suit-set.png",
  },
];

export const products: Product[] = [
  {
    slug: "elegant-printed-kurti",
    name: "Elegant Printed Kurti",
    category: "kurtis",
    price: 1299,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/products/elegant-printed-kurti.png",
    description:
      "A soft floral print in rose and cream, cut in a straight, easy silhouette with three-quarter sleeves. Pair it with trousers or leggings for a look that moves from morning to evening.",
    details: ["Straight fit, hip length", "Three-quarter sleeves", "Breathable, skin-friendly fabric", "Gentle hand wash recommended"],
    badge: "Bestseller",
  },
  {
    slug: "soft-co-ord-set",
    name: "Soft Co-ord Set",
    category: "co-ord-sets",
    price: 1499,
    sizes: ["S", "M", "L", "XL"],
    image: "/images/products/soft-co-ord-set.png",
    description:
      "A relaxed shirt and matching wide-leg trousers in a calming sage tone. Wear it together for an effortless set or style the pieces separately.",
    details: ["Relaxed shirt with button front", "Wide-leg trousers with elastic waist", "Lightweight and airy", "Gentle machine wash, cold"],
    badge: "New In",
  },
  {
    slug: "statement-dress",
    name: "Statement Dress",
    category: "dresses",
    price: 1399,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/products/statement-dress.png",
    description:
      "Deep wine colour, soft puff sleeves and a tiered skirt that swirls as you walk. A dress made to be noticed, with comfort that lasts all day.",
    details: ["Midi length with tiered skirt", "Puff sleeves", "Flattering fitted waist", "Gentle hand wash recommended"],
    badge: "Bestseller",
  },
  {
    slug: "mustard-palazzo-set",
    name: "Mustard Palazzo Set",
    category: "palazzo-sets",
    price: 1599,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/products/palazzo-set.png",
    description:
      "A sunny mustard kurta with ivory print, paired with flowing palazzos and a light dupatta. Comfortable, graceful and ready for any occasion.",
    details: ["Kurta, palazzo and dupatta", "Flowing wide palazzo", "Soft, breathable fabric", "Gentle hand wash recommended"],
  },
  {
    slug: "dusty-pink-suit-set",
    name: "Dusty Pink Suit Set",
    category: "suit-sets",
    price: 1799,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/products/suit-set.png",
    description:
      "A straight suit in a soft dusty pink with delicate thread work along the neckline, finished with a sheer dupatta. Timeless for festive days and family gatherings.",
    details: ["Kurta, bottom and dupatta", "Thread embroidery at the neckline", "Sheer, lightweight dupatta", "Dry clean or gentle hand wash"],
    badge: "Festive Pick",
  },
  {
    slug: "ivory-satin-wrap-top",
    name: "Ivory Satin Wrap Top",
    category: "western-wear",
    price: 999,
    sizes: ["S", "M", "L", "XL"],
    image: "/images/products/western-top.png",
    description:
      "A smooth satin wrap top in ivory that drapes beautifully. Tuck it into tailored trousers for the office or a skirt for evenings out.",
    details: ["Wrap style with tie detail", "Soft satin finish", "Pairs with trousers, jeans or skirts", "Gentle hand wash, cold"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}
