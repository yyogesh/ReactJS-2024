import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { productActions } from "../features/products/productSlice";
import { useEffect } from "react";

const ProductList = () => {
    const dispatch = useDispatch();

    const { items, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(productActions.fetchProductsStart());
    }, [dispatch]);

    const handleDelete = (id: number | undefined) => {
        if(id) {
            dispatch(productActions.deleteProductRequest(id));
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Product Catalog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map(product => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList