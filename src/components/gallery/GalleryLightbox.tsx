"use client";

import Image from "next/image";
import { useEffect } from "react";
import { MdClose, MdArrowBack, MdArrowForward } from "react-icons/md";
import type { GalleryItem } from "@/data/gallery";

type GalleryLightboxProps = {
  images: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const current = images[activeIndex];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/90">
      <button
        type="button"
        onClick={onClose}
        aria-label="Luk lightbox"
        className="absolute top-4 right-4 z-110 flex h-12 w-12 items-center justify-center text-white"
      >
        <MdClose className="text-3xl" />
      </button>

      <button
        type="button"
        onClick={onPrevious}
        aria-label="Tidligere Billede"
        className="absolute top-1/2 left-4 z-110 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <MdArrowBack className="text-3xl" />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Næste billede"
        className="absolute top-1/2 right-4 z-110 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <MdArrowForward className="text-3xl" />
      </button>

      <button
        type="button"
        onClick={onClose}
        aria-label="Luk overlay"
        className="absolute inset-0 z-101"
      />

      <div className="relative z-105 flex h-full items-center justify-center px-16 py-10">
        <div className="relative h-full max-h-[80vh] w-full max-w-5xl">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
