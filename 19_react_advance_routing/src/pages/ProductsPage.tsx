import { Link, useSearchParams } from 'react-router-dom';

const ProductsPage = () => {
   const [searchParams] = useSearchParams();
   const category = searchParams.get('category');

   console.log('category', category)
   // Mock product data
   const products = [
    { id: 1, name: 'Laptop', category: 'electronics' },
    { id: 2, name: 'Smartphone', category: 'electronics' },
    { id: 3, name: 'Book', category: 'books' },
  ];

  const filteredProduct = category ? products.filter(product => product.category === category) : products

  return (
    <>
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    {category && <p className="mb-4">Filtered by category: {category}</p>}
     <ul className="space-y-2">
       {
        filteredProduct.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`} className="text-blue-500 hover:text-blue-700">{product.name}</Link>
          </li>
        ))
       }
     </ul>
    </>
  )
}

export default ProductsPage