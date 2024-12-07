import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux-hooks"
import { fetchProducts } from "../redux/sclies/product.slice";

export const ProductList = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])
    return <div>
        ProductList
    </div>
}