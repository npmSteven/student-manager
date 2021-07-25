import { useAuthentication } from '../../hooks/useAuthentication';
import { NavbarView } from './NavbarView';

export const Navbar = () => {
  const [isAuthed] = useAuthentication();

  return isAuthed ? <NavbarView /> : null;
};
