import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Redirect based on role
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === 'user') {
      return <Navigate to="/home" replace />;
    } else if (user?.role === 'boy') {
      return <Navigate to="/delivery-boys" replace />;
    } else {
      return <Navigate to="/auth" replace />;
    }
  }

  return <>{children}</>;
};
