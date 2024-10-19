import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { lazy, Suspense } from 'react'
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./modules/home/Home'));
const Dashboard = lazy(() => import('./modules/dashboard/Dashboard'));
const Settings = lazy(() => import('./modules/dashboard/Settings'));
const Profile = lazy(() => import('./modules/dashboard/Profile'));
const AdminArea = lazy(() => import('./modules/admin/AdminArea'));
const Login = lazy(() => import('./modules/auth/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<LoadingSpinner />}>
          <Home />
        </Suspense>
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'settings',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Settings />
              </Suspense>
            )
          },
          {
            path: 'profile',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Profile />
              </Suspense>
            )
          }
        ]
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute requiredRole='admin'>
            <Suspense fallback={<LoadingSpinner />}>
              <AdminArea />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        )
      }
    ]
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
