import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import serumImg from "@/assets/product-serum.jpg";
import creamImg from "@/assets/product-cream.jpg";
import lipstickImg from "@/assets/product-lipstick.jpg";

const products = {
  "radiant-serum": {
    name: "Radiant Serum",
    price: 68,
    image: serumImg,
    description:
      "A featherlight serum infused with brightening botanicals and ceramides for a dewy, glass‑skin glow.",
  },
  "hydra-silk-cream": {
    name: "Hydra Silk Cream",
    price: 54,
    image: creamImg,
    description:
      "Cushiony moisture with peptides and squalane to plump, smooth, and seal in hydration.",
  },
  "velvet-nude-lipstick": {
    name: "Velvet Nude Lipstick",
    price: 32,
    image: lipstickImg,
    description:
      "A modern matte in a universally flattering nude—creamy, long‑wearing, never drying.",
  },
} as const;

const currency = (n: number) => `$${n.toFixed(2)}`;

const Product = () => {
  const { slug } = useParams();
  const product = useMemo(() => (slug ? (products as any)[slug] : undefined), [slug]);

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} – Soft Glow Emporium`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", product.description);

    // JSON‑LD structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: window.location.origin + product.image,
      description: product.description,
      brand: { "@type": "Brand", name: "Soft Glow Emporium" },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: window.location.href,
      },
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <article className="grid gap-8 sm:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-card shadow-elevated">
          <img src={product.image} alt={`${product.name} bottle`} className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl mb-2">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">{currency(product.price)}</p>
          <div className="flex gap-3 mb-6">
            <Button variant="gold" size="lg">Add to Cart</Button>
            <Button variant="hero" size="lg">Buy Now</Button>
          </div>
          <ul className="grid grid-cols-3 gap-3 text-center text-xs">
            <li className="rounded-md bg-secondary p-3">Vegan</li>
            <li className="rounded-md bg-secondary p-3">Cruelty‑Free</li>
            <li className="rounded-md bg-secondary p-3">Made in Maroc</li>
          </ul>
        </div>
      </article>
    </main>
  );
};

export default Product;
