import { apiFetch } from "@/lib/api";

export type Safety = {
  _id: string;
  title: string;
  content: string;
};

export async function getSafety() {
  return apiFetch<Safety>("/safety");
}
