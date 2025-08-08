import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import ig5 from "@/assets/ig-5.jpg";
import ig6 from "@/assets/ig-6.jpg";

const imgs = [ig1, ig2, ig3, ig4, ig5, ig6];

const InstagramGrid = () => {
  return (
    <section className="py-12" aria-labelledby="instagram-heading">
      <h2 id="instagram-heading" className="font-display text-2xl sm:text-3xl mb-6">
        Follow @softglowemporium
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {imgs.map((src, i) => (
          <a key={i} href="#" aria-label={`Instagram post ${i + 1}`} className="block overflow-hidden rounded-md">
            <img src={src} alt={`Instagram post ${i + 1} featuring luxury cosmetics`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramGrid;
