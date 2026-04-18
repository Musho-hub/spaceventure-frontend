import { apiFetch } from "@/lib/api";

export type BannerSlide = {
  _id: string;
  title: string;
  content: string;
  image: string;
};

export async function getBanner() {
  return apiFetch<BannerSlide[]>("/banner/");
}
