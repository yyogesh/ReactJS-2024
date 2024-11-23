import { useAppSelector } from './redux-hooks';

export const useProductDetails = (productId: number) => {
  return useAppSelector((state) => {
    const product = state.products.items.find(p => p.id === productId);
    const inCart = state.cart.items.find(item => item.id === productId);
    
    return {
      product,
      quantityInCart: inCart?.quantity ?? 0,
      isInStock: product ? product.quantity > 0 : false
    };
  });
};