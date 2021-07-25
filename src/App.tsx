import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Navbar } from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';

import { Routes } from './routing/Routes';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};
