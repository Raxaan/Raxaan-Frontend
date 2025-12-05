export interface Product {
    _id?: string;
    id?: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    description: string;
    sizes: string[];
    colors: string[];
    in_stock: boolean;
}

export interface OrderItem {
    product_id: string;
    qty: number;
    size: string;
    color: string;
}

export interface Order {
    _id?: string;
    items: OrderItem[];
    customer_name: string;
    phone_number: string;
    address: string;
    status: string;
}
