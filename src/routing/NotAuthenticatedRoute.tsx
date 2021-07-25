import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/authentication.service';

export function NotAuthenticatedRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/classes" />
        )
      }
    />
  );
}
