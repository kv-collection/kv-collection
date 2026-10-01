import Link from "next/link";
import { categories } from "@/lib/products";
import { customerCareLinks, navLinks, site } from "@/lib/site";
import { SocialLinks } from "@/components/social-icons";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 lg:px-8 lg:pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl font-semibold tracking-[0.2em]">THE KV COLLECTION</p>
            <p className="mt-1 text-xs tracking-[0.3em] text-primary-foreground/60 uppercase">{site.descriptor}</p>
            <p className="mt-6 max-w-xs font-serif text-xl italic text-primary-foreground/85">{site.tagline}</p>
            <div className="mt-8">
              <SocialLinks variant="dark" />
            </div>
          </div>

          <FooterColumn title="Explore" className="lg:col-span-2">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <FooterLink href="/cart">Shopping Bag</FooterLink>
          </FooterColumn>

          <FooterColumn title="Shop" className="lg:col-span-2">
            {categories.map((c) => (
              <FooterLink key={c.slug} href={`/shop?category=${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Customer Care" className="lg:col-span-2">
            {customerCareLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in Touch" className="lg:col-span-2">
            <li>
              <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                WhatsApp: {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneTel}`} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                Call: {site.phoneDisplay}
              </a>
            </li>
            <li className="text-primary-foreground/75">Delivery across {site.deliveryRegion}</li>
            <li className="text-primary-foreground/75">First delivery free</li>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} THE KV COLLECTION. Owned and managed by {site.owner}.</p>
          <p>Cash on Delivery &middot; Orders confirmed on WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="text-xs font-medium tracking-[0.25em] uppercase">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">
        {children}
      </Link>
    </li>
  );
}
