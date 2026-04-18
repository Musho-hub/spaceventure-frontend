import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFoundPage() {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            404
          </p>

          <h1 className="mt-4 text-4xl font-bold text-primary-dark">
            Siden blev ikke fundet
          </h1>

          <p className="mt-4 text-slate-600">
            Den side du leder efter findes ikke, eller er blevet flyttet.
          </p>

          <ButtonLink href="/" className="mt-8">
            Tilbage til forsiden
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
