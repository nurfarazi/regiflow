import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/hooks/use-auth';
import type { UserRole } from '@/app/features/auth/types';

export const ProtectedRoute = ({ children, role }: PropsWithChildren<{ role?: UserRole }>) => {
  const { isAuthenticated, role: currentRole, isHydrated } = useAuth();
  const location = useLocation();

  if (!isHydrated) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/supplier/login'} state={{ from: location }} replace />;
  }

  if (role && currentRole !== role) {
    return <Navigate to={currentRole === 'admin' ? '/admin/dashboard' : '/supplier/dashboard'} replace />;
  }

  return children as JSX.Element;
};
