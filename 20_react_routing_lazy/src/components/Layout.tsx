import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <nav className="bg-gray-800 text-white p-4">
                <ul className="flex space-x-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                © 2024 My App
            </footer>
        </div>
    )
}

export default Layout