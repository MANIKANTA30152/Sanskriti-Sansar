import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

// Option 1: For wrapping individual route elements
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    // Redirect to /login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Option 2: For layout routes (if you need to protect multiple routes)
function PrivateLayout() {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // This will render child routes
}

// Export both options
export { PrivateRoute, PrivateLayout };
export default PrivateRoute;