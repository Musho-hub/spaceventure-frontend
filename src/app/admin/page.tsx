import Link from "next/link";
import Container from "@/components/ui/Container";

const adminSections = [
  {
    title: "Ture",
    description: "Administrer alle ture, priser, lanceringsdatoer og indhold.",
    href: "/admin/tours",
  },
  {
    title: "Ret rumfærge",
    description: "Rediger titel, indhold og billede for rumfærgen.",
    href: "/admin/spacecraft",
  },
  {
    title: "Kontakt beskeder",
    description: "Se indsendte beskeder fra kontaktformularen.",
    href: "/admin/contact",
  },
];

export default function AdminPage() {
  return (
    <main>
      <section className="py-16">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-primary-dark">Admin</h2>
            <p className="mt-4 text-slate-600">
              Vælg en sektion du vil redigere.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {adminSections.map((section) => (
              <article key={section.href} className="rounded-md bg-surface p-6">
                <h3 className="text-xl font-semibold text-primary-dark">
                  {section.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                  {section.description}
                </p>

                <div className="mt-6">
                  <Link
                    href={section.href}
                    className="inline-flex bg-accent px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                  >
                    Åben
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
