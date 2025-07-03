import { useAuth } from '../hooks/useAuth';
import { UserRoutes, BoysRoutes, AdminRoutes } from './Router';

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) return <UserRoutes />; // Not logged in? Show user-facing pages.

  if (user.role === 'admin') {
    return <AdminRoutes />;
  } else if (user.role === 'boy') {
    return <BoysRoutes />;
  } else {
    return <UserRoutes />; // default fallback
  }
};

export default AppRoutes;
