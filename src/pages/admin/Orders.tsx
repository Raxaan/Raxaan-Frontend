import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Order } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.put(`/orders/${id}/status?status=${status}`);
      toast.success("Status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-mono text-sm">
                {order._id?.slice(-6)}
              </TableCell>
              <TableCell>
                <div>{order.customer_name}</div>
                <div className="text-sm text-muted-foreground">
                  {order.phone_number}
                </div>
              </TableCell>
              <TableCell>
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm">
                    {item.qty}x {item.product_id} ({item.size}, {item.color})
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {/* Calculate total if price was stored in order items, otherwise placeholder */}
                -
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={order.status}
                  onValueChange={(val) => handleStatusChange(order._id!, val)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrders;
