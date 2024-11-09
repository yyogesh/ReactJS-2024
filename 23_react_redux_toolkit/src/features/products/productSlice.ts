import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [
        { id: 1, name: 'Laptop', price: 999.99, quantity: 5 },
        { id: 2, name: 'Smartphone', price: 599.99, quantity: 8 },
        { id: 3, name: 'Headphones', price: 99.99, quantity: 15 }
    ],
    loading: false,
    error: null
}; // initialState

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateStock: () => {}
    }
});

export default productSlice.reducer;