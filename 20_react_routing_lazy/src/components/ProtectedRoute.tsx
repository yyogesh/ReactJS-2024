import React from 'react'
import { Navigate } from 'react-router-dom';

type UserRole = 'user' | 'admin'

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
}

const ProtectedRoute = ({children, requiredRole}: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('token') 
  const userRole = localStorage.getItem('role') as UserRole | null;
  
  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if(requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return (
    <>{children}</>
  )
}

export default ProtectedRoute