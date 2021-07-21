import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Routes } from './routing/Routes';

export const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <Navbar /> */}
      <Switch>
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

