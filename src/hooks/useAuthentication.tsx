import { useState } from 'react';
import { isAuthenticated } from '../services/authentication.service';

export const useAuthentication = () => {
  const [isAuthed, setIsAuthed]: any = useState(isAuthenticated());

  return [
    isAuthed,
    setIsAuthed
  ];
};
