import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <nav className="mb-4">
        <ul className="space-y-2">
          <li>
            <Link to="/user/1" className="text-blue-500 hover:text-blue-700">User 1 Profile</Link>
          </li>
          <li>
            <Link to="/user/2" className="text-blue-500 hover:text-blue-700">User 2 Profile</Link>
          </li>
          <li>
            <Link to="/products" className="text-blue-500 hover:text-blue-700">All Products</Link>
          </li>
          <li>
            <Link to="/products?category=electronics" className="text-blue-500 hover:text-blue-700">
              Electronics Products
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HomePage;