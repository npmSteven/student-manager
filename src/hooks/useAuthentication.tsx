import { useState } from 'react';
import { isAuthenticated } from '../services/authentication.service';

export const useAuthentication = () => {
  const [isAuthed, setIsAuthed] = useState(isAuthenticated());

  return [
    isAuthed,
    setIsAuthed
  ];
};
