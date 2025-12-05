import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Product } from "@/types";

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products/");
        // Get the latest 8 products
        const latestProducts = response.data.slice(0, 8);
        setProducts(latestProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">No products available yet.</p>
          </div>
        </div>
      </section>
    );
  }

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
              key={product._id}
              className="group bg-card border border-border overflow-hidden transition-all hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <Link to={`/product/${product._id}`}>
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling;
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ display: product.images && product.images.length > 0 ? 'none' : 'flex' }}
                  >
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
                <Link to={`/product/${product._id}`}>
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
