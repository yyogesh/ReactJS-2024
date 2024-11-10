import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types/types";

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState =  {
    items: [],
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log('state, action', state.items, action)
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload)
            }
        },
        removeFromCart: () => {},
        updateQuantity: () => {},
        clearCart: () => {}
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;