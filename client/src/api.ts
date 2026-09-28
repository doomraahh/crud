import type { Product, ProductInput } from "./types";

const BASE = "/api/products";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Ошибка ${res.status}`);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export const api = {
  list: () => request<Product[]>(BASE),
  create: (data: ProductInput) =>
    request<Product>(BASE, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: ProductInput) =>
    request<Product>(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: string) => request<void>(`${BASE}/${id}`, { method: "DELETE" }),
};
