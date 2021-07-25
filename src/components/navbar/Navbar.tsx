import { useAuth } from '../../hooks/useAuth';
import { NavbarView } from './NavbarView';

export const Navbar = () => {
  const [auth] = useAuth();

  return auth ? <NavbarView /> : null;
};
