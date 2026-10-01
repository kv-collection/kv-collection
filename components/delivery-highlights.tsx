import { Gift, MessageCircle, Truck, Wallet } from "lucide-react";
import { site } from "@/lib/site";

const items = [
  { icon: Truck, title: `Delivery across ${site.deliveryRegion}`, text: "Doorstep delivery to cities and towns statewide." },
  { icon: Gift, title: "First delivery free", text: "Your very first order ships to you at no charge." },
  { icon: Wallet, title: "Cash on Delivery", text: "Pay in cash when your order reaches you." },
  { icon: MessageCircle, title: "Order on WhatsApp", text: `Personal help on ${site.phoneDisplay}.` },
];

export function DeliveryHighlights({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`grid gap-6 ${compact ? "sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-4"}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <Icon className="size-5" aria-hidden="true" strokeWidth={1.5} />
          </span>
          <div>
            <p className="font-serif text-lg leading-snug">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
