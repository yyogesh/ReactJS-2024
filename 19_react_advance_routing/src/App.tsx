import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path='/' element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/product' element={<ProductPage />} />
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

