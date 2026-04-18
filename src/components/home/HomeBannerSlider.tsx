"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { BannerSlide } from "@/api/banner";
import Container from "../ui/Container";

type HomeBannerSliderProps = {
  slides: BannerSlide[];
};

type SlideDirection = "next" | "prev";

export default function HomeBannerSlider({ slides }: HomeBannerSliderProps) {
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const [showText, setShowText] = useState(true);

  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const textTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = slides[index];
  const previous = previousIndex !== null ? slides[previousIndex] : null;

  function clearTimers() {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    if (textTimeoutRef.current) {
      clearTimeout(textTimeoutRef.current);
      textTimeoutRef.current = null;
    }
  }

  function goToSlide(nextIndex: number) {
    if (nextIndex === index || isTransitioning) return;

    clearTimers();

    const newDirection: SlideDirection = nextIndex > index ? "next" : "prev";

    setDirection(newDirection);
    setPreviousIndex(index);
    setIndex(nextIndex);
    setShowText(false);
    setIsTransitioning(true);

    transitionTimeoutRef.current = setTimeout(() => {
      setPreviousIndex(null);
      setIsTransitioning(false);

      textTimeoutRef.current = setTimeout(() => {
        setShowText(true);
      }, 150);
    }, 700);
  }

  useEffect(() => {
    if (!slides.length || paused || isTransitioning) return;

    const id = setInterval(() => {
      const next = (index + 1) % slides.length;
      goToSlide(next);
    }, 5000);

    return () => clearInterval(id);
  }, [slides.length, paused, index, isTransitioning]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  if (!current) {
    return null;
  }

  const previousImageAnimation =
    direction === "next"
      ? "animate-banner-slide-out-up"
      : "animate-banner-slide-out-down";

  const currentImageAnimation =
    direction === "next"
      ? "animate-banner-slide-in-up"
      : "animate-banner-slide-in-down";

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-125 overflow-hidden md:min-h-100">
        <div className="absolute inset-0">
          {previous && isTransitioning && (
            <div
              className={`absolute inset-0 ${previousImageAnimation}`}
            >
              <Image
                src={`http://localhost:4444/images/banner/${previous.image}`}
                alt={previous.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          <div
            key={current._id}
            className={`absolute inset-0 ${isTransitioning ? currentImageAnimation : ""}`}
          >
            <Image
              src={`http://localhost:4444/images/banner/${current.image}`}
              alt={current.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0">
          <Container className="flex h-full items-center justify-between">
            <div className="max-w-xl text-white">
              {showText && (
                <div
                  key={`${current._id}-content`}
                  className="animate-banner-text-in-up"
                >
                  <h1 className="mt-4 text-base text-white/90 md:text-lg">
                    {current.title}
                  </h1>

                  <p className="text-4xl font-bold leading-tight md:text-6xl">
                    {current.content}
                  </p>
                </div>
              )}
            </div>

            {slides.length > 1 && (
              <div className="flex flex-col gap-3">
                {slides.map((slide, i) => (
                  <button
                    key={slide._id}
                    type="button"
                    onClick={() => goToSlide(i)}
                    className={`h-4 w-4 transition ${
                      i === index
                        ? "bg-accent"
                        : "bg-white/50 hover:bg-white/80 cursor-pointer"
                    }`}
                    aria-label={`Gå til slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </Container>
        </div>
      </div>
    </section>
  );
}
