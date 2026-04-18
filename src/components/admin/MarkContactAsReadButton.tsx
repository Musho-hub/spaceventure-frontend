"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markContactMessageAsRead } from "@/api/contact";

type MarkContactAsReadButtonProps = {
  messageId: string;
  isRead: boolean;
};

export default function MarkContactAsReadButton({
  messageId,
  isRead,
}: MarkContactAsReadButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleMarkAsRead() {
    if (isRead) return;

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("read", "true");

      await markContactMessageAsRead(messageId, payload);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Noget gik galt.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleMarkAsRead}
      disabled={isSubmitting || isRead}
      className={`inline-flex px-4 py-2 text-sm font-medium border ${
        isRead
          ? "border-slate-300 text-slate-400 cursor-not-allowed"
          : "border-accent bg-accent text-white cursor-pointer hover:opacity-90"
      } disabled:opacity-60`}
    >
      {isSubmitting ? "Gemmer..." : isRead ? "Læst" : "Sæt som læst"}
    </button>
  );
}
