import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const NavbarView = (): ReactElement => {
  return (
    <div>
      <p>navbar</p>
      <Link to="/logout">
        <p>logout</p>
      </Link>
    </div>
  );
};
