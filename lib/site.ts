export const site = {
  name: "THE KV COLLECTION",
  descriptor: "Women's Fashion Boutique",
  tagline: "Style that feels beautifully you.",
  owner: "Kajal Vaidya",
  phoneDisplay: "+91 76676 55247",
  phoneTel: "+917667655247",
  whatsappNumber: "917667655247",
  deliveryRegion: "Jharkhand",
  social: {
    instagram: "https://www.instagram.com/kajalkvaidya/",
    facebook: "https://www.facebook.com/share/18f37XrbJt/",
    youtube: "https://www.youtube.com/@Kv_creation269",
    whatsapp: "https://wa.me/917667655247",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const customerCareLinks = [
  { href: "/customer-care#shipping", label: "Shipping & Delivery" },
  { href: "/customer-care#returns", label: "Return & Exchange" },
  { href: "/customer-care#cod-cancellation", label: "COD Cancellation Policy" },
  { href: "/customer-care#support", label: "Order Support" },
] as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
