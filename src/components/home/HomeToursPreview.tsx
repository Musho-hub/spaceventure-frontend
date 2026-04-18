import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { MdArrowRightAlt } from "react-icons/md";
import { getTours } from "@/api/tours";
import { createTourSlug } from "@/lib/tourSlug";

const previewImages: Record<string, string> = {
  "velkommen-til-manen": "/images/tours/moon-btn.jpg",
  "velkommen-til-mars": "/images/tours/mars-btn.jpg",
};

export default async function HomeTripsPreview() {
  const tours = await getTours();

  const featuredTours = tours.slice(0, 2);

  return (
    <section className="py-16 bg-surface">
      <Container>
        <section className="grid gap-6 md:grid-cols-2">
          {featuredTours.map((tour) => {
            const slug = createTourSlug(tour.title);
            const localPreviewImage = previewImages[slug];

            return (
              <article
                key={tour._id}
                className="overflow-hidden bg-surface"
              >
                <Link href={`/tours/${slug}`} className="block">
                  <div className="relative min-h-120">
                    <Image
                      src={localPreviewImage}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 flex items-end justify-center p-6 text-white">
                      <div>
                        <h2 className="text-3xl font-bold">
                          {tour.destination}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </section>

        <div className="mt-8 flex justify-center">
          <Link
            href="/tours"
            className="group inline-flex items-center gap-1 px-6 py-3 text-sm font-medium text-primary/80 hover:opacity-90"
          >
            Vores ture
            <MdArrowRightAlt className="text-3xl transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
