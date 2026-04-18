"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createTour, updateTour } from "@/api/tours";
import { adminTourSchema, type AdminTourFormData } from "@/lib/adminTourSchema";

type FieldErrors = Partial<
  Record<keyof AdminTourFormData | "image1" | "image2", string>
>;

type AdminTourFormProps = {
  mode?: "create" | "edit";
  tourId?: string;
  initialData?: AdminTourFormData;
  existingImage1?: string;
  existingImage2?: string;
};

const emptyFormData: AdminTourFormData = {
  title: "",
  destination: "",
  traveltime: "",
  distance: "",
  price: "",
  rating: "",
  spacelaunch: "",
  content: "",
};

function validate(nextForm: AdminTourFormData): FieldErrors {
  const parsed = adminTourSchema.safeParse(nextForm);

  if (parsed.success) return {};

  const errors: FieldErrors = {};

  for (const issue of parsed.error.issues) {
    const key = issue.path?.[0] as keyof AdminTourFormData | undefined;

    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}

export default function AdminTourForm({
  mode = "create",
  tourId,
  initialData = emptyFormData,
  existingImage1,
  existingImage2,
}: AdminTourFormProps) {
  const [formData, setFormData] = useState<AdminTourFormData>(initialData);
  const [image1File, setImage1File] = useState<File | null>(null);
  const [image2File, setImage2File] = useState<File | null>(null);
  const [image1Preview, setImage1Preview] = useState<string | null>(null);
  const [image2Preview, setImage2Preview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const isEditMode = mode === "edit";

  useEffect(() => {
    return () => {
      if (image1Preview) URL.revokeObjectURL(image1Preview);
    };
  }, [image1Preview]);

  useEffect(() => {
    return () => {
      if (image2Preview) URL.revokeObjectURL(image2Preview);
    };
  }, [image2Preview]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      } as AdminTourFormData;

      setErrors((prevErrors) => ({
        ...validate(next),
        image1: prevErrors.image1,
        image2: prevErrors.image2,
      }));

      return next;
    });

    setErrorMessage("");
  }

  function handleImage1Change(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImage1File(file);

    if (image1Preview) {
      URL.revokeObjectURL(image1Preview);
    }

    setImage1Preview(file ? URL.createObjectURL(file) : null);

    setErrors((prev) => ({
      ...prev,
      image1: file || isEditMode ? "" : "Image 1 is required",
    }));

    setErrorMessage("");
  }

  function handleImage2Change(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImage2File(file);

    if (image2Preview) {
      URL.revokeObjectURL(image2Preview);
    }

    setImage2Preview(file ? URL.createObjectURL(file) : null);

    setErrors((prev) => ({
      ...prev,
      image2: file || isEditMode ? "" : "Image 2 is required",
    }));

    setErrorMessage("");
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(formData);

    if (!isEditMode && !image1File) {
      nextErrors.image1 = "Image 1 is required";
    }

    if (!isEditMode && !image2File) {
      nextErrors.image2 = "Image 2 is required";
    }

    setErrors(nextErrors);
    setErrorMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("destination", formData.destination);
      payload.append("traveltime", formData.traveltime);
      payload.append("distance", formData.distance);
      payload.append("price", formData.price);
      payload.append("rating", formData.rating);
      payload.append("spacelaunch", formData.spacelaunch);
      payload.append("content", formData.content);

      if (image1File) {
        payload.append("image1", image1File);
      }

      if (image2File) {
        payload.append("image2", image2File);
      }

      if (isEditMode) {
        if (!tourId) {
          throw new Error("Tour id is missing.");
        }

        await updateTour(tourId, payload);
        router.push("/admin/tours");
        router.refresh();
      } else {
        await createTour(payload);
        router.push("/admin/tours");
        router.refresh();
      }

      setErrors({});
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
      <div className="grid gap-6 md:grid-cols-2">
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
            htmlFor="destination"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Destination
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.destination && (
            <p className="mt-2 text-sm text-red-600">{errors.destination}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="traveltime"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Travel time
          </label>
          <input
            id="traveltime"
            name="traveltime"
            type="text"
            value={formData.traveltime}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.traveltime && (
            <p className="mt-2 text-sm text-red-600">{errors.traveltime}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="distance"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Distance
          </label>
          <input
            id="distance"
            name="distance"
            type="text"
            value={formData.distance}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.distance && (
            <p className="mt-2 text-sm text-red-600">{errors.distance}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.price && (
            <p className="mt-2 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="rating"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Rating
          </label>
          <input
            id="rating"
            name="rating"
            type="text"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.rating && (
            <p className="mt-2 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="spacelaunch"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Space launch
          </label>
          <input
            id="spacelaunch"
            name="spacelaunch"
            type="date"
            value={formData.spacelaunch}
            onChange={handleChange}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.spacelaunch && (
            <p className="mt-2 text-sm text-red-600">{errors.spacelaunch}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="image1"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Image 1
          </label>
          <input
            id="image1"
            name="image1"
            type="file"
            accept="image/*"
            onChange={handleImage1Change}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.image1 && (
            <p className="mt-2 text-sm text-red-600">{errors.image1}</p>
          )}

          {isEditMode && existingImage1 && !image1Preview && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-slate-600">
                Current image: {existingImage1}
              </p>
              <img
                src={`http://localhost:4444/images/tours/${existingImage1}`}
                alt="Current image 1"
                className="h-24 w-24 object-cover"
              />
            </div>
          )}

          {image1Preview && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-slate-600">New image preview</p>
              <img
                src={image1Preview}
                alt="New image 1 preview"
                className="h-24 w-24 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="image2"
            className="mb-2 block text-sm font-medium text-primary-dark"
          >
            Image 2
          </label>
          <input
            id="image2"
            name="image2"
            type="file"
            accept="image/*"
            onChange={handleImage2Change}
            className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
          />
          {errors.image2 && (
            <p className="mt-2 text-sm text-red-600">{errors.image2}</p>
          )}

          {isEditMode && existingImage2 && !image2Preview && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-slate-600">
                Current image: {existingImage2}
              </p>
              <img
                src={`http://localhost:4444/images/tours/${existingImage2}`}
                alt="Current image 2"
                className="h-24 w-24 object-cover"
              />
            </div>
          )}

          {image2Preview && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-slate-600">New image preview</p>
              <img
                src={image2Preview}
                alt="New image 2 preview"
                className="h-24 w-24 object-cover"
              />
            </div>
          )}
        </div>
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
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-accent"
        />
        {errors.content && (
          <p className="mt-2 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting
            ? isEditMode
              ? "Saving..."
              : "Creating..."
            : isEditMode
              ? "Save changes"
              : "Create tour"}
        </button>

        <Link
          href="/admin/tours"
          className="inline-flex border border-slate-300 px-6 py-3 text-sm font-medium text-primary-dark hover:bg-slate-100"
        >
          Cancel
        </Link>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </form>
  );
}
