import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children, openModal }) => {
  const { user } = useAuth();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (!user && !isModal) {
      openModal();
      setIsModal(true);
    }
  }, [user, isModal, openModal]);

  if (!user) {
    return <div>Требуется авторизация</div>;
  }

  return children;
};