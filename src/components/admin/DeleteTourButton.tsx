"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTour } from "@/api/tours";

type DeleteTourButtonProps = {
  tourId: string;
};

export default function DeleteTourButton({ tourId }: DeleteTourButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tour?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteTour(tourId);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong while deleting the tour.");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-60"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
