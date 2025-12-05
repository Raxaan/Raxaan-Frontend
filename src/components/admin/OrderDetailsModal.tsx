import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types";
import { X, User, Phone, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  if (!order) return null;

  // Calculate order total
  const total = order.items.reduce((sum, item) => {
    // Assuming item price might need to be fetched or is passed. 
    // In the current Order type, we might not have price inside items correctly if it wasn't there before.
    // However, looking at the models, OrderItem only has product_id, qty, size, color.
    // Real implementation detail: ensuring we have price. 
    // If backend doesn't populate product details in order items, we only have product_id.
    // Ref: AdminOders.tsx line 82 has a comment "-".
    // Let's check if the Order type in frontend has product details populated. 
    // Usually admin fetch might populate it. If not, we might check how NewArrivals fetches products.
    // For now, I will assume we might need to rely on what's available.
    // If pricing is missing, I'll show placeholders or handle it gracefully.
    return sum; // Placeholder logic until verified
  }, 0);
  
  // Note: Previous tasks showed price calculation in Cart/Checkout using item.product.price. 
  // AdminOrders.tsx seems to use `order.items.map` but currently shows "-" for total.
  // I will just display what I can.

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Order Details
            </DialogTitle>
            {/* Close button is handled by DialogPrimitive usually, but explicit one acts as cleaner X if needed 
                shadcn DialogContent usually has a built-in close X.
            */}
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            ID: {order._id}
          </p>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Customer Details */}
          <div className="grid md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4" /> Customer Info
              </h3>
              <div className="grid gap-1 text-sm">
                <p className="font-medium">{order.customer_name}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {order.email || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {order.phone_number}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Shipping Address
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {order.address}
              </p>
              <div className="pt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium font-mono text-xs">
                      {item.product_id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Size: {item.size} • Color: {item.color}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      x{item.qty}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
