import axios from "axios";
import { Product } from "../features/products/productTypes";

const API_BASE_URL = 'https://fakestoreapi.com/products';

export const productApi = {
    fetchProducts: async () => {
        const response = await axios.get<Product[]>(API_BASE_URL);
        return response.data;
    },

    createProduct: async (product: Omit<Product, 'id'>) => {
        const response = await axios.post<Product>(API_BASE_URL, product);
        return response.data;
    },

    updateProduct: async (product: Product) => {
        const response = await axios.put<Product>(`${API_BASE_URL}/${product.id}`, product);
        return response.data;
    },

    deleteProduct: async (id: number) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
        return id;
    }
}