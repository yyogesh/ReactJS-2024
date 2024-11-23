import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [
    { id: 1, name: 'Laptop', price: 999.99, quantity: 5 },
    { id: 2, name: 'Smartphone', price: 599.99, quantity: 8 },
    { id: 3, name: 'Headphones', price: 99.99, quantity: 15 }
  ],
  loading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateStock: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
    }
  }
});

export const { updateStock } = productsSlice.actions;
export default productsSlice.reducer;