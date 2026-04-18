"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

type GalleryGridProps = {
  images: GalleryItem[];
};

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeImage = images[activeIndex];

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function goToPrevious() {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }

  function goToNext() {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }

  if (!images.length || !activeImage) {
    return null;
  }

  return (
    <>
      <article className="space-y-6">
        <button
          type="button"
          onClick={() => openLightbox(activeIndex)}
          className="relative block w-full overflow-hidden"
          aria-label="Åben galleri billede"
        >
          <div className="relative aspect-16/10 w-full">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </button>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden border-2 transition ${
                activeIndex === index
                  ? "border-accent"
                  : "border-transparent opacity-80 hover:opacity-100"
              } ${index >= 2 ? "hidden md:block" : ""} ${
                index >= 3 ? "md:hidden lg:block" : ""
              }`}
              aria-label={`Hvis billede ${index + 1}`}
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </button>
          ))}
        </div>
      </article>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </>
  );
}
