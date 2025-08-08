import { Leaf, Heart, MapPin } from "lucide-react";

const TrustBadges = () => {
  const items = [
    { icon: Leaf, label: "Vegan" },
    { icon: Heart, label: "Cruelty‑Free" },
    { icon: MapPin, label: "Made in Maroc" },
  ];

  return (
    <section aria-label="Trust badges" className="py-8">
      <div className="grid grid-cols-3 gap-4 sm:gap-6 rounded-xl bg-secondary p-4 sm:p-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <div className="mb-2 rounded-full bg-background p-3 shadow-elevated">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
