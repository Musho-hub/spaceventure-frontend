"use client";

import { useState } from "react";
import Image from "next/image";
import type { Tour } from "@/api/tours";
import { createTourSlug } from "@/lib/tourSlug";
import RichText from "@/components/ui/RichText";
import { getFirstParagraphHtml } from "@/lib/html";
import LaunchCountdown from "@/components/ui/LaunchCountdown";
import ButtonLink from "../ui/ButtonLink";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { formatDateTime } from "@/lib/date";

type ToursListProps = {
  tours: Tour[];
};

export default function ToursList({ tours }: ToursListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 2;
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const paginatedTours = tours.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  return (
    <>
      <section className="grid gap-8">
        {paginatedTours.map((tour) => {
          const slug = createTourSlug(tour.title);

          return (
            <article
              key={tour._id}
              className="grid grid-cols-1 border-surface lg:grid-cols-2 lg:border-2"
            >
              <figure className="relative min-h-80">
                <Image
                  src={`http://localhost:4444/images/tours/${tour.image1}`}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </figure>

              <section className="flex flex-col">
                <div className="ms-auto inline-flex w-fit items-center rounded-bl-3xl bg-accent p-4 text-white">
                  <p>{tour.price}</p>
                </div>

                <section className="flex flex-col space-y-3 px-5">
                  <h3 className="text-xl font-bold text-primary-dark">
                    {tour.title}
                  </h3>

                  <RichText
                    html={getFirstParagraphHtml(tour.content)}
                    className="mt-4 space-y-4 leading-7 text-slate-700"
                  />

                  <div className="inline-flex items-center gap-1">
                    <p>
                      <strong>Dato for næste afgang:</strong> {formatDateTime(tour.spacelaunch)}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <p>
                      <strong>Tid til næste afgang:</strong>
                    </p>
                    <LaunchCountdown date={tour.spacelaunch} />
                  </div>

                  <div className="mb-5">
                    <ButtonLink
                      href={`/tours/${slug}`}
                      className="inline-flex border px-16 py-5 text-primary-dark hover:bg-accent"
                    >
                      Se mere
                    </ButtonLink>
                  </div>
                </section>
              </section>
            </article>
          );
        })}
      </section>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="inline-flex border rounded-full border-slate-300 p-3 text-sm font-medium text-primary-dark cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaCaretLeft />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                className={`inline-flex h-10 w-10 items-center justify-center border rounded-full text-sm ${
                  currentPage === index
                    ? "border-accent text-accent"
                    : "border-slate-300 text-primary-dark cursor-pointer hover:text-accent hover:border-accent"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="inline-flex border rounded-full border-slate-300 p-3 text-sm font-medium text-primary-dark cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaCaretRight />
          </button>
        </div>
      )}
    </>
  );
}
