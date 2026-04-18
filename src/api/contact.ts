import { apiFetch } from "@/lib/api";
import type { ContactFormData } from "@/lib/contactSchema";

type ContactResponse = {
  message?: string;
};

export async function sendContactMessage(data: ContactFormData) {
  return apiFetch<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  received: string;
  read: boolean;
};

export async function getContactMessages() {
  return apiFetch<ContactMessage[]>("/contact/admin");
}

type MarkAsReadResponse = {
  message?: string;
};

export async function markContactMessageAsRead(id: string, data: FormData) {
  return apiFetch<MarkAsReadResponse>(`/contact/admin/${id}`, {
    method: "PATCH",
    body: data,
  });
}
