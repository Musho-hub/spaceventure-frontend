"use client";

import Image from "next/image";
import { useState } from "react";
import Container from "../ui/Container";
import {
  newsletterSchema,
  type NewsletterFormData,
} from "@/lib/newsletterSchema";
import { subscribeToNewsletter } from "@/api/newsletter";

type FieldErrors = Partial<Record<keyof NewsletterFormData, string>>;

const initialFormData: NewsletterFormData = {
  email: "",
};

function validate(nextForm: NewsletterFormData): FieldErrors {
  const parsed = newsletterSchema.safeParse(nextForm);

  if (parsed.success) return {};

  const errors: FieldErrors = {};

  for (const issue of parsed.error.issues) {
    const key = issue.path?.[0] as keyof NewsletterFormData | undefined;

    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}

export default function HomeNewsletter() {
  const [formData, setFormData] = useState<NewsletterFormData>(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      } as NewsletterFormData;

      setErrors(validate(next));
      return next;
    });

    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setSuccessMessage("");
    setErrorMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("email", formData.email);

      await subscribeToNewsletter(payload);

      setSuccessMessage("Du er nu abonneret.");
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Noget gik galt. Prøv venligst igen.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative overflow-hidden py-16 text-white">
      <Image
        src="/images/banners/newsmail-bg.jpg"
        alt="Newsmail baggrund"
        fill
        className="object-cover"
        priority
      />

      <Container className="relative z-10">
        <section className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 text-4xl font-bold">
            Tilmeld dig og få 25% rabat
          </h2>

          <p className="mt-4 text-white/80">
            Tilmeld dig vores nyhedsbrev og få 25% rabat på din første tur!
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <div className="relative w-full max-w-md">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Din Email"
                className="w-full max-w-md border border-white/20 bg-white/35 px-4 py-3 text-primary-dark outline-none placeholder:text-white"
              />
              {errors.email ? (
                <p className="pointer-events-none absolute top-1 right-1 text-xs">
                  {errors.email}
                </p>
              ) : errorMessage ? (
                <p className="pointer-events-none absolute top-1 right-1 text-xs">
                  {errorMessage}
                </p>
              ) : successMessage ? (
                <p className="pointer-events-none absolute top-1 right-1 text-xs">
                  {successMessage}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent px-6 py-3 font-medium text-white hover:opacity-90"
            >
              {isSubmitting ? "Tilmelder..." : "Tilmeld"}
            </button>
          </form>
        </section>
      </Container>
    </section>
  );
}
