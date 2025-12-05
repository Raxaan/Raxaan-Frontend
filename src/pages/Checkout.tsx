import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    phone_number: "",
    address: "",
  });

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cart.map((item) => ({
          product_id: item.product._id || item.product.id, // Handle both ID fields just in case
          qty: item.qty,
          size: item.size,
          color: item.color,
        })),
        ...formData,
      };

      await api.post("/orders", orderData);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid gap-8">
        <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
                {cart.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span>{item.product.name} (x{item.qty})</span>
                        <span>${(item.product.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={formData.customer_name}
              onChange={(e) =>
                setFormData({ ...formData, customer_name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Shipping Address</Label>
            <Input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Place Order
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
