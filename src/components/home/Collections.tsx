import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Traditional",
    description: "Classic designs honoring heritage",
    image: "https://www.ainsunnah.com/cdn/shop/files/Green_1_ec1ee36b-39b8-4cf9-9392-8031d3a23348.jpg?v=1764424388&width=400",
    count: 24,
  },
  {
    id: 2,
    name: "Modern",
    description: "Contemporary styles for today",
    image: "https://www.binkamal.com/cdn/shop/files/Black_56488901-44f0-4e95-9f6c-37d1de2f1961.webp?v=1737548517",
    count: 18,
  },
  {
    id: 3,
    name: "Premium",
    description: "Luxury craftsmanship",
    image: "https://plus.unsplash.com/premium_photo-1677618091952-92882ad850da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 12,
  },
  {
    id: 4,
    name: "Everyday",
    description: "Comfortable daily wear",
    image: "https://plus.unsplash.com/premium_photo-1726718513250-d759219568e0?q=80&w=844&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
              <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
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
