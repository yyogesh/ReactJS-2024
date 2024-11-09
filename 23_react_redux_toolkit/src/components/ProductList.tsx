import React from 'react'
import { useSelector } from 'react-redux';

const ProductList = () => {
    const products = useSelector((state: any) => state['products'].items);
    console.log(products);
    // const products: any[] = [];
    const handleAddToCart = (productId: number) => {
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: any) => (
                <div key={product.id} className="p-4 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">In stock: {product.quantity}</p>
                    <button
                        onClick={() => handleAddToCart(product.id)}
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