import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";

// Mock products - will be replaced with database fetch later
const products = [
  { id: 1, name: "Classic White Kufi", price: 850, category: "Traditional" },
  { id: 2, name: "Embroidered Black Cap", price: 1200, category: "Premium" },
  { id: 3, name: "Cotton Blend Taqiyah", price: 650, category: "Everyday" },
  { id: 4, name: "Gold Thread Kufi", price: 1500, category: "Premium" },
  { id: 5, name: "Mesh Breathable Cap", price: 750, category: "Modern" },
  { id: 6, name: "Velvet Prayer Cap", price: 950, category: "Traditional" },
  { id: 7, name: "Striped Cotton Kufi", price: 700, category: "Everyday" },
  { id: 8, name: "Silk Finish Cap", price: 1350, category: "Premium" },
];

const NewArrivals = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">
              Fresh Additions
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link to="/shop?filter=new">
            <Button variant="ghost" className="text-primary hover:text-primary/80 group p-0">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card border border-border overflow-hidden transition-all hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-arabic text-primary/30">رخشاں</span>
                  </div>
                  {/* Category badge */}
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 font-medium">
                    {product.category}
                  </span>
                </div>
              </Link>

              {/* Details */}
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-serif font-semibold text-primary">
                    Rs. {product.price.toLocaleString()}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
