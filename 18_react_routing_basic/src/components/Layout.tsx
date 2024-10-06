import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-500 p-4">
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-white hover:underline">Home</Link></li>
                    <li><Link to="/about" className="text-white hover:underline">About</Link></li>
                    <li><Link to="/contact" className="text-white hover:underline">Contact</Link></li>
                </ul>
            </nav>
            <div className='container mx-auto p-4'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout