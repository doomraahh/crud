import { useEffect, useState } from "react";
import { api } from "./api";
import { ProductForm } from "./components/ProductForm";
import { ProductTable } from "./components/ProductTable";
import type { Product, ProductInput } from "./types";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // READ
  useEffect(() => {
    api
      .list()
      .then(setProducts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // CREATE / UPDATE
  async function handleSubmit(data: ProductInput): Promise<boolean> {
    setError(null);
    try {
      if (editing) {
        const updated = await api.update(editing.id, data);
        setProducts((list) => list.map((p) => (p.id === updated.id ? updated : p)));
        setEditing(null);
      } else {
        const created = await api.create(data);
        setProducts((list) => [...list, created]);
      }
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  }

  // DELETE
  async function handleDelete(product: Product) {
    if (!confirm(`Удалить "${product.name}"?`)) return;
    setError(null);
    try {
      await api.remove(product.id);
      setProducts((list) => list.filter((p) => p.id !== product.id));
      if (editing?.id === product.id) setEditing(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="container">
      <h1>Товары</h1>
      {error && <div className="error">{error}</div>}
      <ProductForm editing={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
      {loading ? (
        <p>Загрузка…</p>
      ) : (
        <ProductTable products={products} onEdit={setEditing} onDelete={handleDelete} />
      )}
    </div>
  );
}
