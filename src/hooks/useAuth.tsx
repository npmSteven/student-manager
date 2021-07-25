import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = (): any => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth can only be used inside AuthProvider');
  }
  return context;
};
