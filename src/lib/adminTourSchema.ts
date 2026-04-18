import { z } from "zod";

export const adminTourSchema = z.object({
  title: z.string().min(2, "Titel skal være mindst 2 bogstaver"),
  destination: z.string().min(2, "Destination skal mindst være 2 bogstaver"),
  traveltime: z.string().min(1, "Flyvetid er påkrævet"),
  distance: z.string().min(1, "Afstand er påkrævet"),
  price: z.string().min(1, "Pris er påkrævet"),
  rating: z
    .string()
    .min(1, "Vurdering er påkrævet")
    .refine((value) => {
      const num = Number(value);
      return !Number.isNaN(num) && num >= 1 && num <= 5;
    }, "Vurdering skal være mellem 1 og 5"),
  spacelaunch: z.string().min(1, "Spacelaunch er påkrævet"),
  content: z.string().min(10, "Indhold skal indholde mindst 10 bogstaver"),
});

export type AdminTourFormData = z.infer<typeof adminTourSchema>;
