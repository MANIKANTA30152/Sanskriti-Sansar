// src/components/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// For wrapping individual route elements
function PrivateRoute({ children }) {
  const { user, initialLoading } = useAuth();
  
  if (initialLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

// For layout routes (protecting multiple routes)
function PrivateLayout() {
  const { user, initialLoading } = useAuth();
  
  if (initialLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export { PrivateRoute, PrivateLayout };
export default PrivateRoute;