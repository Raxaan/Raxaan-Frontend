import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter, X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock products - will be replaced with database fetch
const allProducts = [
  { id: 1, name: "Classic White Kufi", price: 850, category: "Traditional", inStock: true },
  { id: 2, name: "Embroidered Black Cap", price: 1200, category: "Premium", inStock: true },
  { id: 3, name: "Cotton Blend Taqiyah", price: 650, category: "Everyday", inStock: true },
  { id: 4, name: "Gold Thread Kufi", price: 1500, category: "Premium", inStock: false },
  { id: 5, name: "Mesh Breathable Cap", price: 750, category: "Modern", inStock: true },
  { id: 6, name: "Velvet Prayer Cap", price: 950, category: "Traditional", inStock: true },
  { id: 7, name: "Striped Cotton Kufi", price: 700, category: "Everyday", inStock: true },
  { id: 8, name: "Silk Finish Cap", price: 1350, category: "Premium", inStock: true },
  { id: 9, name: "Linen Summer Cap", price: 800, category: "Modern", inStock: true },
  { id: 10, name: "Wool Winter Kufi", price: 1100, category: "Traditional", inStock: true },
  { id: 11, name: "Crochet Pattern Cap", price: 900, category: "Everyday", inStock: false },
  { id: 12, name: "Geometric Design Kufi", price: 1250, category: "Premium", inStock: true },
];

const categories = ["All", "Traditional", "Modern", "Premium", "Everyday"];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const selectedCategory = searchParams.get("category") || "All";
  const sortBy = searchParams.get("sort") || "default";

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
    
    // Filter by category
    if (selectedCategory !== "All") {
      products = products.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return products;
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category.toLowerCase());
    }
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Shop All Caps
          </h1>
          <p className="text-muted-foreground">
            Discover our complete collection of premium Islamic headwear
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>

          {/* Category Filters - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  (selectedCategory === "All" && category === "All") ||
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={
                  (selectedCategory === "All" && category === "All") ||
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:border-primary hover:text-primary"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort & Count */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="md:hidden mb-6 p-4 bg-card border border-border animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Categories</span>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    (selectedCategory === "All" && category === "All") ||
                    selectedCategory.toLowerCase() === category.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    handleCategoryChange(category);
                    setShowFilters(false);
                  }}
                  className={
                    (selectedCategory === "All" && category === "All") ||
                    selectedCategory.toLowerCase() === category.toLowerCase()
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card border border-border overflow-hidden transition-all hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              {/* Image */}
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-arabic text-primary/30">رخشاں</span>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 font-medium">
                      {product.category}
                    </span>
                    {!product.inStock && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
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
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No products found in this category.</p>
            <Button onClick={() => handleCategoryChange("All")}>View All Products</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
