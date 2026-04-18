"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateSpacecraft } from "@/api/spacecraft";
import {
  adminSpacecraftSchema,
  type AdminSpacecraftFormData,
} from "@/lib/adminSpacecraftSchema";

type FieldErrors = Partial<
  Record<keyof AdminSpacecraftFormData | "image", string>
>;

type AdminSpacecraftFormProps = {
  initialData: AdminSpacecraftFormData;
  existingImage?: string;
};

function validate(nextForm: AdminSpacecraftFormData): FieldErrors {
  const parsed = adminSpacecraftSchema.safeParse(nextForm);

  if (parsed.success) return {};

  const errors: FieldErrors = {};

  for (const issue of parsed.error.issues) {
    const key = issue.path?.[0] as keyof AdminSpacecraftFormData | undefined;

    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}

export default function AdminSpacecraftForm({
  initialData,
  existingImage,
}: AdminSpacecraftFormProps) {
  const [formData, setFormData] =
    useState<AdminSpacecraftFormData>(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      } as AdminSpacecraftFormData;

      setErrors((prevErrors) => ({
        ...validate(next),
        image: prevErrors.image,
      }));

      return next;
    });

    setErrorMessage("");
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(file ? URL.createObjectURL(file) : null);

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));

    setErrorMessage("");
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setErrorMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      await updateSpacecraft(payload);
      router.push("/admin");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-primary-dark"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-primary-dark"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          value={formData.content}
          onChange={handleChange}
          className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
        />
        {errors.content && (
          <p className="mt-2 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium text-primary-dark"
        >
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
        />

        {isEditModePlaceholder(errors.image) && (
          <p className="mt-2 text-sm text-red-600">{errors.image}</p>
        )}

        {existingImage && !imagePreview && (
          <div className="mt-3 space-y-2">
            <p className="text-sm text-slate-600">
              Current image: {existingImage}
            </p>
            <img
              src={`http://localhost:4444/images/spacecraft/${existingImage}`}
              alt="Current spacecraft"
              className="h-32 w-32 object-cover"
            />
          </div>
        )}

        {imagePreview && (
          <div className="mt-3 space-y-2">
            <p className="text-sm text-slate-600">New image preview</p>
            <img
              src={imagePreview}
              alt="New spacecraft preview"
              className="h-32 w-32 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>

        <Link
          href="/admin"
          className="inline-flex border border-slate-300 px-6 py-3 text-sm font-medium text-primary-dark hover:bg-slate-100"
        >
          Cancel
        </Link>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </form>
  );
}

function isEditModePlaceholder(value?: string) {
  return Boolean(value);
}
