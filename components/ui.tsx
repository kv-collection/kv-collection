import Link from "next/link";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm tracking-[0.12em] uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

export const buttonStyles = {
  primary: `${buttonBase} bg-primary text-primary-foreground hover:bg-primary-hover`,
  outline: `${buttonBase} border border-foreground/80 text-foreground hover:bg-foreground hover:text-primary-foreground`,
  light: `${buttonBase} bg-background text-foreground hover:bg-accent`,
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs tracking-[0.3em] text-primary uppercase ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">{title}</h2>
      {description && <p className="leading-relaxed text-pretty text-muted-foreground">{description}</p>}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="border-b border-border bg-muted">
      <div className="mx-auto flex max-w-7xl animate-fade-up flex-col items-center gap-4 px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-serif text-5xl leading-tight text-balance sm:text-6xl">{title}</h1>
        {description && <p className="max-w-xl leading-relaxed text-pretty text-muted-foreground">{description}</p>}
      </div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
