import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Routes } from './routing/Routes';

export const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <ToastContainer />
      <Switch>
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

