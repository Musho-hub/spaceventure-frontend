import { apiFetch } from "@/lib/api";

export type About = {
  _id: string;
  title: string;
  content: string;
};

export async function getAbout() {
  return apiFetch<About>("/about");
}
