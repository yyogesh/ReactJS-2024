import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const product = { id: Number(id), name: `Product ${id}`, stock: Math.floor(Math.random() * 10) };

    useEffect(() => {
        if(product.stock === 0) {
            navigate('/products', {replace: true});
        }
    }, [product.stock, navigate])

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
            <p className="mb-2">Product ID: {id}</p>
            <p className="mb-2">Name: {product.name}</p>
            <p className="mb-4">Stock: {product.stock}</p>
            <Link to="/products" className="text-blue-500 hover:text-blue-700">Back to Products</Link>
        </>
    )
}

export default ProductDetailPage