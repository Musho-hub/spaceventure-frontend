import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageBanner from "@/components/ui/PageBanner";
import { getTours } from "@/api/tours";
import { createTourSlug } from "@/lib/tourSlug";
import RichText from "@/components/ui/RichText";
import { getFirstParagraphHtml } from "@/lib/html";
import LaunchCountdown from "@/components/ui/LaunchCountdown";
import ToursList from "@/components/tours/ToursList";

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <main>
      <PageBanner
        title="Ture"
        image="/images/banners/banner-ture.jpg"
        alt="Ture banner"
      />
      <Container className="p-5">
        <ToursList tours={tours} />
      </Container>
    </main>
  );
}
