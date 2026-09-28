import type { Product } from "../types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) return <p className="empty">Товаров пока нет</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Цена</th>
          <th>Кол-во</th>
          <th>Обновлён</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</td>
            <td>{p.quantity}</td>
            <td>{new Date(p.updatedAt).toLocaleString("ru-RU")}</td>
            <td>
              <div className="actions">
                <button className="secondary" onClick={() => onEdit(p)}>
                  Изменить
                </button>
                <button className="danger" onClick={() => onDelete(p)}>
                  Удалить
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
