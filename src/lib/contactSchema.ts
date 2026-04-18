import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Navn skal være mindst 2 bogstaver"),
  email: z.email("Venligst skriv en gyldig email adresse"),
  phone: z.string().min(8, "Telefon nr skal mindst være 8 tegn"),
  message: z.string().min(10, "Besked skal mindst være 10 tegn"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
