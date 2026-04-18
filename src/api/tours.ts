import { apiFetch } from "@/lib/api";

export type Tour = {
  _id: string;
  title: string;
  content: string;
  traveltime: string;
  destination: string;
  distance: string;
  price: number;
  image1: string;
  image2: string;
  rating: number;
  spacelaunch: string;
};

export async function getTours() {
  return apiFetch<Tour[]>("/tours");
}

export async function getTourById(id: string) {
  return apiFetch<Tour>(`/tours/${id}`);
}

type CreateTourResponse = {
  message?: string;
};

export async function createTour(data: FormData) {
  return apiFetch<CreateTourResponse>("/tours/admin", {
    method: "POST",
    body: data,
  });
}

type UpdateTourResponse = {
  message?: string;
};

export async function updateTour(id: string, data: FormData) {
  return apiFetch<UpdateTourResponse>(`/tours/admin/${id}`, {
    method: "PUT",
    body: data,
  });
}

type DeleteTourResponse = {
  message?: string;
};

export async function deleteTour(id: string) {
  return apiFetch<DeleteTourResponse>(`/tours/admin/${id}`, {
    method: "DELETE",
  });
}