import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminAuth } from "@/lib/auth";
import { Product, createProduct, deleteProduct, listProducts, updateProduct } from "@/lib/products";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Skincare", "Makeup", "Fragrance", "Body", "Hair"];

type EditingState = { mode: "create" } | { mode: "edit"; id: string };

const AdminDashboard = () => {
  const { isAuthed, logout } = useAdminAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<EditingState>({ mode: "create" });

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(categories[0]!);
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    document.title = "Admin Dashboard | Luxury Cosmetics";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute("content", "Admin dashboard to manage luxury cosmetics products.");
    }
    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) {
      link.href = window.location.origin + "/admin";
    } else {
      const l = document.createElement("link");
      l.rel = "canonical";
      l.href = window.location.origin + "/admin";
      document.head.appendChild(l);
    }
  }, []);

  useEffect(() => {
    setItems(listProducts());
  }, []);

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory(categories[0]!);
    setTags("");
    setEditing({ mode: "create" });
  };

  const handleImageFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      toast.error("Please provide name and price");
      return;
    }
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const payload = {
      name,
      price: Number(price),
      image,
      description,
      category,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      slug,
    };

    if (editing.mode === "create") {
      const created = createProduct(payload);
      setItems((prev) => [created, ...prev]);
      toast.success("Product added");
      resetForm();
    } else {
      const updated = updateProduct(editing.id, payload);
      if (updated) {
        setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
        toast.success("Product updated");
        resetForm();
      }
    }
  };

  const onEdit = (p: Product) => {
    setEditing({ mode: "edit", id: p.id });
    setName(p.name);
    setPrice(String(p.price));
    setImage(p.image);
    setDescription(p.description);
    setCategory(p.category);
    setTags(p.tags.join(", "));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id: string) => {
    deleteProduct(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="sticky top-0 z-10 backdrop-blur bg-background/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => resetForm()}>New</Button>
            <Button variant="gold" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-1 border rounded-xl p-4 bg-card/70 backdrop-blur">
          <h2 className="text-lg font-medium mb-4">{editing.mode === "create" ? "Add New Product" : "Edit Product"}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Velvet Glow Serum" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Price</label>
                <Input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Tags</label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="comma, separated, tags" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Image</label>
              <Input type="file" accept="image/*" onChange={(e) => handleImageFile(e.target.files?.[0])} />
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="or paste an image URL" />
              {image && (
                <img src={image} alt="Product preview" className="h-28 w-full object-cover rounded-md border" loading="lazy" />
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Description</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product..." />
            </div>
            <Button type="submit" variant="gold" className="w-full">
              {editing.mode === "create" ? "Add Product" : "Save Changes"}
            </Button>
          </form>
        </section>

        <section className="lg:col-span-2 border rounded-xl p-4 bg-card/70 backdrop-blur overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Products</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Tags</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">No products yet</TableCell>
                </TableRow>
              )}
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={`${p.name} product image`} className="h-12 w-12 rounded object-cover border" loading="lazy" />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">/{p.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{p.category}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full border text-xs text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${p.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="sm">Preview</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Preview: {p.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-6">
                            <img src={p.image} alt={`${p.name} preview`} className="w-full h-72 object-cover rounded-lg border" />
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                              <p className="text-muted-foreground mb-4">{p.description}</p>
                              <div className="mb-4 flex flex-wrap gap-2">
                                {p.tags.map((t) => (
                                  <span key={t} className="px-3 py-1 rounded-full border text-xs">{t}</span>
                                ))}
                              </div>
                              <div className="text-2xl font-semibold mb-4">${p.price.toFixed(2)}</div>
                              <Button variant="gold">Add to cart</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => onEdit(p)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(p.id)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
