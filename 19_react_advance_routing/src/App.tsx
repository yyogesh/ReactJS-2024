import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './context/AuthContext'
import ProductsPage from './pages/ProductsPage'
import UserProfilePage from './pages/UserProfilePage'
import ProductDetailPage from './pages/ProductDetailPage'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path='/' element={<PrivateRoute><MainLayout /></PrivateRoute>}>
              <Route index element={<HomePage />} />
              <Route path="user/:id" element={<UserProfilePage />} />
              <Route path='products' element={<ProductsPage />} />
              <Route path='products/:id' element={<ProductDetailPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


// Login page
// ProductPage
// ProductDetail Page
// UserProfile Page

