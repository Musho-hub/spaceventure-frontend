"use client";

import { useState } from "react";
import { contactSchema, type ContactFormData } from "@/lib/contactSchema";
import { sendContactMessage } from "@/api/contact";

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function validate(nextForm: ContactFormData): FieldErrors {
  const parsed = contactSchema.safeParse(nextForm);

  if (parsed.success) return {};

  const errors: FieldErrors = {};

  for (const issue of parsed.error.issues) {
    const key = issue.path?.[0] as keyof ContactFormData | undefined;

    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      } as ContactFormData;

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

      const response = await sendContactMessage(formData);

      setSuccessMessage("Din besked er blevet sendt.");
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
    <section className="space-y-8 lg:mt-10">
      <div className="flex flex-col items-center py-3 gap-3 space-y-3 lg:flex-row lg:py-0">
        <h2 className="text-3xl font-bold w-full text-center mb-0 py-4 text-primary-dark border-b border-primary/35 lg:w-fit lg:pr-4 lg:py-0 lg:border-b-0 lg:border-r">Kontakt</h2>
        <p className="text-slate-600">Skulle du side med et spørgsmål eller to, så skriv endelig til os og vi vil kontakte dig hurtigst muligt.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dit navn"
              className="w-full border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-accent"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="w-full border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-accent"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Tlf"
              className="w-full border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-accent"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <textarea
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            placeholder="Besked"
            className="w-full border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-accent"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full justify-center bg-accent px-20 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60 lg:w-fit"
          >
            {isSubmitting ? "Sender..." : "Send"}
          </button>
        </div>

        {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )}

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </form>
    </section>
  );
}
