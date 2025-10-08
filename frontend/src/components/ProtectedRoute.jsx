import { Navigate, Outlet } from 'react-router-dom';

// Example: Replace with your actual auth logic
const useAuth = () => {
  // Replace with real authentication state
  return { isAuthenticated: false, role: null };
};

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
