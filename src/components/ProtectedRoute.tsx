
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, useRole } from '@/hooks/useRole';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  // If auth is still loading, show a loading spinner
  if (authLoading || (user && roleLoading)) {
    return (
      <div className="container-content py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If a specific role is required, check for it
  if (requiredRole && role !== requiredRole) {
    return (
      <div className="container-content py-12 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
        <p className="text-gray-600">
          You don't have permission to access this page. This page requires {requiredRole} privileges.
        </p>
      </div>
    );
  }

  // If authenticated with correct role, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
