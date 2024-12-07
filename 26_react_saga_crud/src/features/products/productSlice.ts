import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "./productTypes";

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
    selectedProduct: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
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


        // Delete actions
        deleteProductRequest: (state, action: PayloadAction<number>) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(p => p.id !== action.payload);
            state.loading = false;
        },
        deleteProductFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
})

export const productActions = productSlice.actions;
export default productSlice.reducer;