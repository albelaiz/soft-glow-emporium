import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  to: string;
}

const ProductCard = ({ title, price, image, to }: ProductCardProps) => {
  return (
    <article className="group rounded-lg bg-card p-3 shadow-elevated hover-scale">
      <Link to={to} aria-label={title} className="block">
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={image}
            alt={`${title} product photo`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="pt-3">
        <h3 className="font-medium text-base">{title}</h3>
        <p className="text-sm text-muted-foreground">{price}</p>
        <div className="mt-3 flex gap-2">
          <Button asChild variant="gold" size="sm">
            <Link to={to}>Buy Now</Link>
          </Button>
          <Button variant="outline" size="sm">Add to Cart</Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
