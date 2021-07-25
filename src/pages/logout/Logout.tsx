import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/authentication.service';

export const Logout = () => {
  const [auth, handleAuth] = useAuth();

  useEffect(() => {
    logout();
    if (auth) {
      handleAuth();
    }
  }, []);

  return <Redirect to="/signIn" />;
};
