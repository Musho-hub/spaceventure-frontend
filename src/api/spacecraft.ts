import { apiFetch } from "@/lib/api";

export type Spacecraft = {
  _id: string;
  title: string;
  content: string;
  image: string;
};

export async function getSpacecraft() {
  return apiFetch<Spacecraft>("/spacecraft");
}

type UpdateSpacecraftResponse = {
  message?: string;
};

export async function updateSpacecraft(data: FormData) {
  return apiFetch<UpdateSpacecraftResponse>("/spacecraft/admin", {
    method: "PUT",
    body: data,
  });
}
