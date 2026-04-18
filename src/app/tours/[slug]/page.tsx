import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { getTours } from "@/api/tours";
import { createTourSlug } from "@/lib/tourSlug";
import RichText from "@/components/ui/RichText";
import SocialLinks from "@/components/ui/SocialLinks";
import StarRating from "@/components/ui/StarRating";
import LaunchCountdown from "@/components/ui/LaunchCountdown";
import { formatDateTime } from "@/lib/date";

type TourDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;

  const tours = await getTours();
  const tour = tours.find((item) => createTourSlug(item.title) === slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="py-16">
      <Container>
        <section className="grid gap-10 md:grid-cols-2">
          <section className="flex flex-col gap-5">
            <figure className="relative min-h-90 overflow-hidden">
              <Image
                src={`http://localhost:4444/images/tours/${tour.image1}`}
                alt={tour.title}
                fill
                className="object-cover"
                unoptimized
              />
            </figure>

            <figure className="relative min-h-90 overflow-hidden">
              <Image
                src={`http://localhost:4444/images/tours/${tour.image2}`}
                alt={`${tour.title} secondary image`}
                fill
                className="object-cover"
                unoptimized
              />
            </figure>
          </section>

          <section>
            <section>
              <div className="flex flex-col-reverse justify-between md:flex-row">
                <h1 className="text-4xl font-bold mb-5 text-center text-primary-dark underline decoration-accent underline-offset-15 md:text-start">
                  {tour.destination}
                </h1>

                <div className="flex justify-end">
                  <div className="flex items-center p-4 bg-accent text-white rounded-bl-3xl">
                    <p>{tour.price}</p>
                  </div>
                </div>
              </div>

              <p>{tour.title}</p>
              <RichText
                html={tour.content}
                className="mt-4 space-y-4 leading-7 text-slate-700"
              />
            </section>

            <article className="mt-8 grid gap-4 border-y-2 justify-center border-primary/20 py-4 text-sm text-slate-700 md:justify-start">
              <p>
                <strong>Destination:</strong> {tour.destination}
              </p>
              <p>
                <strong>Pris:</strong> {tour.price}
              </p>
              <p>
                <strong>Afstand fra jorden:</strong> {tour.distance}
              </p>
              <p>
                <strong>Flyvetid:</strong> {tour.traveltime}
              </p>
              <p>
                <strong>Dato for næste afgang:</strong> {formatDateTime(tour.spacelaunch)}
              </p>
              <div className="flex gap-1">
                <p>
                  <strong>Tid til næste afgang:</strong>
                </p>
                <LaunchCountdown date={tour.spacelaunch} />
              </div>
              <div className="flex items-center gap-2">
                <strong>Vurdering:</strong>
                <StarRating rating={tour.rating} />
              </div>
            </article>

            <section className="flex items-center justify-center gap-5 mt-5 md:justify-start">
              <p>SHARE</p>
              <SocialLinks className="flex gap-2" />
            </section>
          </section>
        </section>
      </Container>
    </main>
  );
}
