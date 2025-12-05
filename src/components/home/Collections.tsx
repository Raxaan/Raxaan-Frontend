import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Traditional",
    description: "Classic designs honoring heritage",
    image: "🕌",
    count: 24,
  },
  {
    id: 2,
    name: "Modern",
    description: "Contemporary styles for today",
    image: "✨",
    count: 18,
  },
  {
    id: 3,
    name: "Premium",
    description: "Luxury craftsmanship",
    image: "⭐",
    count: 12,
  },
  {
    id: 4,
    name: "Everyday",
    description: "Comfortable daily wear",
    image: "☀️",
    count: 30,
  },
];

const Collections = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">
            Browse By Category
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Our Collections
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/shop?category=${collection.name.toLowerCase()}`}
              className="group relative bg-card border border-border overflow-hidden transition-all hover:shadow-elegant hover:border-primary/30 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
                <span className="text-6xl">{collection.image}</span>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 hidden md:block">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    {collection.count} Products
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
