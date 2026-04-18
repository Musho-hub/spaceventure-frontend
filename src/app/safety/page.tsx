import Container from "@/components/ui/Container";
import RichText from "@/components/ui/RichText";
import { getSafety } from "@/api/safety";

export default async function SafetyPage() {
  const safety = await getSafety();

  return (
    <main className="py-16">
      <Container>
        <article>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Sikkerhed
          </p>

          <h1 className="mt-4 text-4xl font-bold text-primary-dark">
            {safety.title}
          </h1>

          <div className="mt-8 text-slate-700">
            <RichText
              html={safety.content}
              className="space-y-4 leading-7"
            />
          </div>
        </article>
      </Container>
    </main>
  );
}