import Link from "next/link";
import Container from "@/components/ui/Container";
import DeleteTourButton from "@/components/admin/DeleteTourButton";
import { getTours } from "@/api/tours";

export default async function AdminToursPage() {
  const tours = await getTours();

  return (
    <main>
      <section className="py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark">Ture</h2>
              <p className="mt-3 text-slate-600">
                Administrer alle ture og deres indhold.
              </p>
            </div>

            <Link
              href="/admin/tours/create"
              className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Opret ny tur
            </Link>
          </div>

          <div className="grid gap-6">
            {tours.map((tour) => (
              <article
                key={tour._id}
                className="rounded-md border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-primary-dark">
                      {tour.title}
                    </h3>

                    <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <p>
                        <strong>Destination:</strong> {tour.destination}
                      </p>
                      <p>
                        <strong>Flyvetid:</strong> {tour.traveltime}
                      </p>
                      <p>
                        <strong>Afstand fra jorden:</strong> {tour.distance}
                      </p>
                      <p>
                        <strong>Pris:</strong> {tour.price}
                      </p>
                      <p>
                        <strong>Vurdering:</strong> {tour.rating}
                      </p>
                      <p>
                        <strong>Launch:</strong> {tour.spacelaunch}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/admin/tours/${tour._id}/edit`}
                      className="inline-flex border border-primary-dark px-4 py-2 text-sm font-medium text-primary-dark hover:bg-primary-dark hover:text-white"
                    >
                      Rediger
                    </Link>
                    <DeleteTourButton tourId={tour._id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
