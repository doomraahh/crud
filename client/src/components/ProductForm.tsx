import { useEffect, useState, type FormEvent } from "react";
import type { Product, ProductInput } from "../types";

interface Props {
  editing: Product | null;
  onSubmit: (data: ProductInput) => Promise<boolean>;
  onCancel: () => void;
}

const empty = { name: "", price: "", quantity: "" };

export function ProductForm({ editing, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(
      editing
        ? { name: editing.name, price: String(editing.price), quantity: String(editing.quantity) }
        : empty,
    );
  }, [editing]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const ok = await onSubmit({
      name: form.name,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setSaving(false);
    if (ok && !editing) setForm(empty);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editing ? "Редактировать товар" : "Новый товар"}</h2>
      <input
        placeholder="Название"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Цена"
        min="0"
        step="0.01"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Количество"
        min="0"
        step="1"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        required
      />
      <div className="actions">
        <button type="submit" disabled={saving}>
          {editing ? "Сохранить" : "Добавить"}
        </button>
        {editing && (
          <button type="button" className="secondary" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}
