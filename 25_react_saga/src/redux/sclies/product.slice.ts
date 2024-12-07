import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../@types/product";

interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProducts: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchProductsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { fetchProducts, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;

export default productSlice.reducer