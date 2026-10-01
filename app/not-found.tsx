import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-5 py-28 text-center">
      <p className="text-xs tracking-[0.3em] text-primary uppercase">Page not found</p>
      <h1 className="font-serif text-5xl">This page has slipped away</h1>
      <p className="max-w-md text-muted-foreground">The page you are looking for does not exist. Explore our latest collection instead.</p>
      <ButtonLink href="/shop">Shop the Collection</ButtonLink>
    </Container>
  );
}
