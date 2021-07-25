import React, { useState, useContext } from 'react';
import { isAuthenticated } from '../services/authentication.service';

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());
  const handleAuth = () => {
    setAuth(!auth);
  };
  const data = [auth, handleAuth];
  return <AuthContext.Provider value={data}>{children} </AuthContext.Provider>;
};
