import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg items-center bg-card"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                {item.product.images[0] && (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="font-medium mt-1 text-primary">PKR {item.product.price.toLocaleString()}</p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => updateQuantity(idx, -1)}
                  disabled={item.qty <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-6 text-center">{item.qty}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => updateQuantity(idx, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right min-w-[80px] hidden sm:block">
                 <p className="font-bold">PKR {(item.product.price * item.qty).toLocaleString()}</p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(idx)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 border rounded-lg bg-card space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="flex justify-between text-lg">
              <span>Total</span>
              <span className="font-bold">PKR {total.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
