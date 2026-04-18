import { apiFetch } from "@/lib/api";

export type Gallery = {
  _id: string;
  imagetext: string;
  image: string;
};

export async function getGallery() {
  return apiFetch<Gallery[]>("/gallery");
}
