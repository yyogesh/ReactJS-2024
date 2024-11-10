import { addToCart } from '../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Product } from '../types/types';

const ProductList = () => {
    const products = useAppSelector((state) => state.products.items);
    const dispatch = useAppDispatch();
    console.log(products);
    // const products: any[] = [];
    const handleAddToCart = (product: Product) => {
        if(product.quantity > 0) {
            dispatch(addToCart(product))
        }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: any) => (
                <div key={product.id} className="p-4 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">In stock: {product.quantity}</p>
                    <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity === 0}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ProductList