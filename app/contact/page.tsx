import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { customerCareLinks, site, whatsappLink } from "@/lib/site";
import { Container, PageHeader, buttonStyles } from "@/components/ui";
import { SocialIcon, SocialLinks } from "@/components/social-icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact THE KV COLLECTION on WhatsApp or call 7667655247. Delivery across Jharkhand.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We would love to hear from you"
        description="For orders, sizing help or styling advice, reach us on WhatsApp or give us a call."
      />
      <Container className="grid gap-6 py-16 md:grid-cols-3 lg:py-24">
        <ContactCard
          icon={<SocialIcon name="whatsapp" className="size-5" />}
          title="WhatsApp"
          text="The quickest way to order, ask about sizes or track your order."
        >
          <a
            href={whatsappLink("Hello THE KV COLLECTION, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles.primary}
          >
            Chat on WhatsApp
          </a>
        </ContactCard>
        <ContactCard icon={<Phone className="size-5" aria-hidden="true" strokeWidth={1.5} />} title="Call Us" text={site.phoneDisplay}>
          <a href={`tel:${site.phoneTel}`} className={buttonStyles.outline}>
            Call Now
          </a>
        </ContactCard>
        <ContactCard
          icon={<MapPin className="size-5" aria-hidden="true" strokeWidth={1.5} />}
          title="Delivery"
          text={`We deliver across ${site.deliveryRegion}. Your first delivery is free.`}
        >
          <Link href="/customer-care#shipping" className={buttonStyles.outline}>
            Delivery Info
          </Link>
        </ContactCard>
      </Container>

      <section className="bg-muted py-16">
        <Container className="flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h2 className="font-serif text-3xl">Follow THE KV COLLECTION</h2>
            <p className="max-w-md text-muted-foreground">New arrivals, styling ideas and behind-the-scenes from the boutique.</p>
            <SocialLinks />
          </div>
          <div className="flex flex-col items-center gap-3 lg:items-end">
            <h2 className="text-xs font-medium tracking-[0.25em] uppercase">Customer Care</h2>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm lg:justify-end">
              {customerCareLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-4 hover:text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  text,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="reveal flex flex-col items-start gap-4 rounded-sm border border-border bg-background p-8">
      <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">{icon}</span>
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="flex-1 leading-relaxed text-muted-foreground">{text}</p>
      {children}
    </div>
  );
}
