import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
                <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
                {
                    isAuthenticated ? <li><button onClick={logout} className="hover:text-gray-300">Logout</button></li>
                        : <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
                }
            </ul>
        </nav>
    )
}

export default NavBar