const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is missing");

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data?.message || `API request failed: ${response.status}`);

  return data as T;
}
