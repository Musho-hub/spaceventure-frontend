import Container from "@/components/ui/Container";
import AdminSpacecraftForm from "@/components/admin/AdminSpacecraftForm";
import { getSpacecraft } from "@/api/spacecraft";

export default async function AdminSpacecraftPage() {
  const spacecraft = await getSpacecraft();

  return (
    <main className="py-16">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold text-primary-dark">
            Edit spacecraft
          </h1>
          <p className="mt-4 text-slate-600">
            Update the spacecraft content and image.
          </p>
        </div>

        <AdminSpacecraftForm
          initialData={{
            title: spacecraft.title,
            content: spacecraft.content,
          }}
          existingImage={spacecraft.image}
        />
      </Container>
    </main>
  );
}
