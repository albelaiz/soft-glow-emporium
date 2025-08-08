export type Product = {
  id: string;
  name: string;
  price: number;
  image: string; // data URL or remote URL
  description: string;
  category: string;
  tags: string[];
  slug: string;
  createdAt: number;
};

const STORAGE_KEY = "lux_products";

function read(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function write(items: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function listProducts(): Product[] {
  return read().sort((a, b) => b.createdAt - a.createdAt);
}

export function createProduct(data: Omit<Product, "id" | "createdAt">): Product {
  const items = read();
  const item: Product = { ...data, id: crypto.randomUUID(), createdAt: Date.now() };
  items.push(item);
  write(items);
  return item;
}

export function updateProduct(id: string, patch: Partial<Product>): Product | null {
  const items = read();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...items[idx], ...patch } as Product;
  items[idx] = updated;
  write(items);
  return updated;
}

export function deleteProduct(id: string) {
  const items = read().filter((p) => p.id !== id);
  write(items);
}
