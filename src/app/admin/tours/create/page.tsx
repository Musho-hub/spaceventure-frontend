import Container from "@/components/ui/Container";
import AdminTourForm from "@/components/admin/AdminTourForm";

export default function AdminCreateTourPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold text-primary-dark">
            Opret ny tur
          </h1>
          <p className="mt-4 text-slate-600">Tilføj en ny tur til hjemmesiden.</p>
        </div>

        <AdminTourForm />
      </Container>
    </main>
  );
}
