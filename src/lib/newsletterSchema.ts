import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Skriv venligst en gyldig email adresse"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
