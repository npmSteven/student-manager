import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/authentication.service';

// Check if the user is logged in
export function AuthenticatedRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signIn" />
        )
      }
    />
  );
}
