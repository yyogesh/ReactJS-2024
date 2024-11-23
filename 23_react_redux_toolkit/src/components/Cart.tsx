import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';

const Cart: React.FC = () => {
  const { items, total } = useAppSelector(state => state.cart);
  const user = useAppSelector(state => state.user.currentUser);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {user && <p className="text-sm text-gray-600 mb-4">Welcome, {user.name}!</p>}
      
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="mt-4">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};


export default Cart