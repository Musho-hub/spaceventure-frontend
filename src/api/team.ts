import { apiFetch } from "@/lib/api";

export type Team = {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
};

export async function getTeam() {
  return apiFetch<Team[]>("/team");
}
