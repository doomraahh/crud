import cors from "cors";
import express from "express";
import { store } from "./store.js";
import { validateProduct } from "./validate.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// READ — список
app.get("/api/products", (_req, res) => {
  res.json(store.getAll());
});

// READ — один
app.get("/api/products/:id", (req, res) => {
  const product = store.getById(req.params.id);
  if (!product) return res.status(404).json({ error: "Товар не найден" });
  res.json(product);
});

// CREATE
app.post("/api/products", (req, res) => {
  const { data, errors } = validateProduct(req.body);
  if (errors) return res.status(400).json({ error: errors.join("; ") });
  res.status(201).json(store.create(data!));
});

// UPDATE
app.put("/api/products/:id", (req, res) => {
  const { data, errors } = validateProduct(req.body);
  if (errors) return res.status(400).json({ error: errors.join("; ") });
  const product = store.update(req.params.id, data!);
  if (!product) return res.status(404).json({ error: "Товар не найден" });
  res.json(product);
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  if (!store.remove(req.params.id)) return res.status(404).json({ error: "Товар не найден" });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}/api/products`);
});
