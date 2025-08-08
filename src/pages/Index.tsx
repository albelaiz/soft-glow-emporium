import Hero from "@/components/site/Hero";
import ProductCard from "@/components/site/ProductCard";
import Reviews from "@/components/site/Reviews";
import TrustBadges from "@/components/site/TrustBadges";
import InstagramGrid from "@/components/site/InstagramGrid";
import NewsletterModal from "@/components/site/NewsletterModal";
import serumImg from "@/assets/product-serum.jpg";
import creamImg from "@/assets/product-cream.jpg";
import lipstickImg from "@/assets/product-lipstick.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-display text-xl story-link">Soft Glow Emporium</a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#best-sellers" className="hover:text-foreground/80">Best‑Sellers</a>
            <a href="#reviews" className="hover:text-foreground/80">Reviews</a>
            <a href="#instagram" className="hover:text-foreground/80">Instagram</a>
          </nav>
        </div>
      </header>

      <main>
        <h1 className="sr-only">Luxury Cosmetics for a Soft Glow</h1>
        <Hero />
        <TrustBadges />

        <section id="best-sellers" className="container mx-auto px-4 py-12" aria-labelledby="best-heading">
          <h2 id="best-heading" className="font-display text-2xl sm:text-3xl mb-6">Best‑Sellers</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <ProductCard title="Radiant Serum" price="$68" image={serumImg} to="/product/radiant-serum" />
            <ProductCard title="Hydra Silk Cream" price="$54" image={creamImg} to="/product/hydra-silk-cream" />
            <ProductCard title="Velvet Nude Lipstick" price="$32" image={lipstickImg} to="/product/velvet-nude-lipstick" />
          </div>
        </section>

        <section id="reviews" className="container mx-auto px-4">
          <Reviews />
        </section>

        <section id="instagram" className="container mx-auto px-4">
          <InstagramGrid />
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Soft Glow Emporium. All rights reserved.
        </div>
      </footer>

      <NewsletterModal />
    </div>
  );
};

export default Index;
