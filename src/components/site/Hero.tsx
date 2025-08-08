import heroImg from "@/assets/hero-luxury-cosmetics.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Luxury cosmetics flat lay on blush satin"
          className="h-[60vh] sm:h-[70vh] w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/10" />
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-xl animate-enter">
          <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-4">
            Illuminate Your Ritual
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            High‑performance skincare and makeup with a soft, luminous touch.
          </p>
          <div className="flex items-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="#best-sellers">Shop Best‑Sellers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/product/radiant-serum">Explore Radiant Serum</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
