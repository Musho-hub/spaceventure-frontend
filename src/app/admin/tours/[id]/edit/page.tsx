import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import AdminTourForm from "@/components/admin/AdminTourForm";
import { getTourById } from "@/api/tours";

type AdminEditTourPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDateForInput(value: string) {
  if (!value) return "";

  return value.slice(0, 10);
}

export default async function AdminEditTourPage({
  params,
}: AdminEditTourPageProps) {
  const { id } = await params;

  let tour;

  try {
    tour = await getTourById(id);
  } catch {
    notFound();
  }

  return (
    <main className="py-16">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold text-primary-dark">Edit tour</h1>
          <p className="mt-4 text-slate-600">Update the selected tour.</p>
        </div>

        <AdminTourForm
          mode="edit"
          tourId={tour._id}
          initialData={{
            title: tour.title,
            destination: tour.destination,
            traveltime: tour.traveltime,
            distance: tour.distance,
            price: String(tour.price),
            rating: String(tour.rating),
            spacelaunch: formatDateForInput(tour.spacelaunch),
            content: tour.content,
          }}
          existingImage1={tour.image1}
          existingImage2={tour.image2}
        />
      </Container>
    </main>
  );
}
