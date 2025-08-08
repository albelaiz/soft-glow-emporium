import { Star } from "lucide-react";

const reviews = [
  {
    quote: "My skin has never looked this radiant—instant glow without heaviness.",
    name: "Sofia R.",
  },
  {
    quote: "Packaging is stunning and the formulas feel so luxurious.",
    name: "Amira K.",
  },
  {
    quote: "The serum is a game‑changer. Makeup sits flawlessly now.",
    name: "Lina M.",
  },
];

const Reviews = () => {
  return (
    <section className="py-12" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="font-display text-2xl sm:text-3xl mb-6">
        Glowing Reviews
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-xl bg-card p-5 shadow-elevated animate-enter">
            <div className="flex items-center gap-1 text-accent mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-foreground mb-3">“{r.quote}”</p>
            <p className="text-xs text-muted-foreground">— {r.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
