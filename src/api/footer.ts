import { apiFetch } from "@/lib/api";

export type FooterData = {
  _id: string;
  name: string;
  cvr: string;
  address: string;
  phone: string;
  email: string;
  openinghours: string;
  coordinates: string;
};

export async function getFooter() {
  return apiFetch<FooterData>("/footer");
}
