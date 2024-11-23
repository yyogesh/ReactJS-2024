import { useCallback } from 'react';
import { useAppDispatch } from './redux-hooks';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';
import type { CartItem } from '../types/types';

export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const addItem = useCallback((item: CartItem) => {
    dispatch(addToCart(item));
  }, [dispatch]);

  const removeItem = useCallback((itemId: number) => {
    dispatch(removeFromCart(itemId));
  }, [dispatch]);

  const clear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return { addItem, removeItem, clear };
};