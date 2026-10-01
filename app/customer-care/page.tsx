import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import { Container, PageHeader, buttonStyles } from "@/components/ui";

export const metadata: Metadata = {
  title: "Customer Care",
  description: "Shipping & delivery, return & exchange, COD cancellation policy and order support at THE KV COLLECTION.",
};

const sections = [
  {
    id: "shipping",
    title: "Shipping & Delivery",
    points: [
      `We deliver across ${site.deliveryRegion}.`,
      "Your first delivery with THE KV COLLECTION is free.",
      "For later orders, any delivery charge is shared with you on WhatsApp before your order is dispatched, so there are no surprises.",
      "Once your order is confirmed on WhatsApp, we share the expected delivery timeline for your location.",
      "Please make sure your name, phone number and full address with pincode are correct so your parcel reaches you smoothly.",
    ],
  },
  {
    id: "returns",
    title: "Return & Exchange",
    points: [
      "If there is a size issue or a damaged item, message us on WhatsApp soon after delivery with your name and order details.",
      "Items must be unused, unwashed and returned with original tags and packaging to be eligible.",
      "Sharing an unboxing photo or video helps us resolve any concern about damaged or incorrect items quickly.",
      "Exchanges are subject to size and stock availability. We will confirm the options with you directly.",
    ],
  },
  {
    id: "cod-cancellation",
    title: "COD Cancellation Policy",
    points: [
      "All orders are Cash on Delivery. You pay in cash only when your order reaches you.",
      "If you need to cancel, please inform us on WhatsApp or by phone before your order is dispatched.",
      "Once an order has been dispatched, we kindly request you not to refuse the parcel at delivery, as each shipment is personally packed and sent.",
      "Repeated refusal of COD parcels may mean future orders need to be confirmed with us before dispatch.",
    ],
  },
  {
    id: "support",
    title: "Order Support",
    points: [
      `For order updates, sizing help or any questions, WhatsApp or call us on ${site.phoneDisplay}.`,
      "Share your name and the phone number used for the order so we can find it quickly.",
      "We personally reply to every message and will do our best to help as soon as possible.",
    ],
  },
];

export default function CustomerCarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Customer Care"
        title="Here to help, every step"
        description="Everything you need to know about delivery, exchanges, Cash on Delivery and getting support."
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <nav aria-label="Customer care sections" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm transition-colors hover:border-primary hover:text-primary lg:rounded-none lg:border-0 lg:border-l lg:px-4"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-14 lg:col-span-9">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28" aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`} className="font-serif text-3xl sm:text-4xl">
                {s.title}
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-4 leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <div className="flex flex-col items-start gap-4 rounded-sm bg-muted p-8">
            <p className="font-serif text-2xl">Still have a question?</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hello THE KV COLLECTION, I need help with my order.")}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.primary}
              >
                WhatsApp Us
              </a>
              <a href={`tel:${site.phoneTel}`} className={buttonStyles.outline}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
