import { z } from "zod";

export const adminSpacecraftSchema = z.object({
  title: z.string().min(2, "Titel skal mindst være 2 bogstaver."),
  content: z.string().min(10, "Indhold skal mindst være 10 bogstaver"),
});

export type AdminSpacecraftFormData = z.infer<typeof adminSpacecraftSchema>;
