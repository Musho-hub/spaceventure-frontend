import PageBanner from "@/components/ui/PageBanner";
import ImageTextSection from "@/components/ui/ImageTextSection";
import RichText from "@/components/ui/RichText";
import { getSpacecraft } from "@/api/spacecraft";
import { getGallery } from "@/api/gallery";
import GallerySection from "@/components/gallery/GallerySection";

export default async function SpacecraftPage() {
  const images = await getGallery();
  const spacecraft = await getSpacecraft();

  return (
    <main>
      <PageBanner
        title="Rumfærgen"
        image="/images/banners/banner-spaceship.jpg"
        alt="Rumfærge banner"
      />
      <ImageTextSection
        imageSrc={`http://localhost:4444/images/spacecraft/${spacecraft.image}`}
        imageAlt={spacecraft.title}
      >
        <section className="text-center md:text-start">
          <p className="mt-3 py-2 text-4xl font-bold text-primary/35">
            Hvorfor vælge os
          </p>

          <h2 className="text-xl font-semibold py-2 uppercase tracking-[0.2em] border-y text-accent md:border-y-0 md:border-b">
            {spacecraft.title}
          </h2>
        </section>

        <div className="mt-6 text-slate-700">
          <RichText html={spacecraft.content} />
        </div>
      </ImageTextSection>
      <GallerySection images={images} />
    </main>
  );
}
