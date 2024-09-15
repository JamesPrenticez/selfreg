import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const spaToken = useAppSelector((state) => state.user.spaToken);

  if (!spaToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
