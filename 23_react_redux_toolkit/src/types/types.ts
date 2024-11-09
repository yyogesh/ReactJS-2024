export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface CartItem extends Product {
    totalPrice: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
}