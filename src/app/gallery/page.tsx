import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { galleryImages } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <main>
      <section className="py-16">
        <Container className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Galleri
          </p>

          <h1 className="mt-4 text-4xl font-bold text-primary-dark">
            Et gik fra vores teleskop
          </h1>
          <GalleryGrid images={galleryImages} />
        </Container>
      </section>
    </main>
  );
}
