import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { Product, ProductInput } from "./types.js";

const DATA_FILE = new URL("../data.json", import.meta.url);

function load(): Product[] {
  if (!existsSync(DATA_FILE)) return [];
  return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as Product[];
}

let products: Product[] = load();

function save() {
  writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

export const store = {
  getAll(): Product[] {
    return products;
  },

  getById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
  },

  create(input: ProductInput): Product {
    const now = new Date().toISOString();
    const product: Product = { id: randomUUID(), ...input, createdAt: now, updatedAt: now };
    products.push(product);
    save();
    return product;
  },

  update(id: string, input: ProductInput): Product | undefined {
    const product = this.getById(id);
    if (!product) return undefined;
    Object.assign(product, input, { updatedAt: new Date().toISOString() });
    save();
    return product;
  },

  remove(id: string): boolean {
    const before = products.length;
    products = products.filter((p) => p.id !== id);
    if (products.length === before) return false;
    save();
    return true;
  },
};
