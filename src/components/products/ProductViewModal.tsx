import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ProductViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductViewModal = ({ product, isOpen, onClose }: ProductViewModalProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize("");
      setSelectedColor("");
      setActiveImage(product.images[0] || "");
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addToCart({
      product,
      qty: quantity,
      size: selectedSize || "N/A",
      color: selectedColor || "N/A",
    });
    
    toast.success("Added to cart");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Image Section */}
          <div className="bg-muted/10 p-6 flex flex-col gap-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                  <span className="text-4xl font-arabic text-primary/30">رخشاں</span>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`min-w-[60px] w-[60px] h-[60px] rounded-md overflow-hidden border-2 transition-colors ${
                      activeImage === img ? "border-primary" : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="mb-6">
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                {product.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mt-1 mb-2">
                {product.name}
              </h2>
              <p className="text-xl font-semibold text-primary">
                PKR {product.price.toLocaleString()}
              </p>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 line-clamp-3">
              {product.description}
            </div>

            <div className="space-y-6 flex-1">
              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 border rounded-md text-sm transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 border rounded-md text-sm transition-all ${
                          selectedColor === color
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:border-primary"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                 <label className="text-sm font-medium mb-2 block">Quantity</label>
                 <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      +
                    </Button>
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <Button
                className="w-full h-12 text-base"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.in_stock ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              <Link 
                to={`/product/${product._id || product.id}`}
                className="block"
                onClick={onClose}
              >
                <Button variant="ghost" className="w-full">
                  View Full Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModal;
