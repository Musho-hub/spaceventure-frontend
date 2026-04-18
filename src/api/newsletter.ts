import { apiFetch } from "@/lib/api";

type NewsletterResponse = {
  message?: string;
};

export async function subscribeToNewsletter(data: FormData) {
  return apiFetch<NewsletterResponse>("/newssubscription", {
    method: "POST",
    body: data,
  });
}
