"use client";

import { useState } from "react";
import Image from "next/image";
import type { Gallery } from "@/api/gallery";
import Container from "../ui/Container";

type GallerySectionProps = {
  images: Gallery[];
};

export default function GallerySection({ images }: GallerySectionProps) {
  const [index, setIndex] = useState(0);

  const current = images[index];

  if (!images.length) {
    return null;
  }

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-primary-dark">Galleri</h2>
        </div>
      </Container>
      <div className="md:hidden">
        {current && (
          <div className="space-y-4">
            <div className="relative min-h-80 overflow-hidden">
              <Image
                src={`http://localhost:4444/images/gallery/${current.image}`}
                alt={current.imagetext}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {images.length > 1 && (
              <div className="flex justify-center gap-3">
                {images.map((image, i) => (
                  <button
                    key={image._id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-4 w-4 transition ${
                      i === index
                        ? "bg-accent"
                        : "bg-gray-500/50 hover:bg-accent/50 cursor-pointer"
                    }`}
                    aria-label={`Gå til billede ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-4 md:gap-6">
        {images.slice(0, 4).map((image) => (
          <article
            key={image._id}
            className="relative min-h-80 overflow-hidden"
          >
            <Image
              src={`http://localhost:4444/images/gallery/${image.image}`}
              alt={image.imagetext}
              fill
              className="object-cover"
              unoptimized
            />
          </article>
        ))}
      </div>
    </section>
  );
}
