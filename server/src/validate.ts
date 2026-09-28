import type { ProductInput } from "./types.js";

export function validateProduct(body: unknown): { data?: ProductInput; errors?: string[] } {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name) errors.push("name: обязательное поле");
  else if (name.length > 100) errors.push("name: не длиннее 100 символов");

  const price = Number(b.price);
  if (b.price === undefined || b.price === "" || !Number.isFinite(price) || price < 0)
    errors.push("price: должно быть числом >= 0");

  const quantity = Number(b.quantity);
  if (b.quantity === undefined || b.quantity === "" || !Number.isInteger(quantity) || quantity < 0)
    errors.push("quantity: должно быть целым числом >= 0");

  if (errors.length) return { errors };
  return { data: { name, price, quantity } };
}
