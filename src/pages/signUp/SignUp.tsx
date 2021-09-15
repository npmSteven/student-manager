import { useState, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { Loader } from '../../components/loader/Loader';
import { useAuth } from '../../hooks/useAuth';
import { useFormInput } from '../../hooks/useFormInput';
import { signUp } from '../../services/authentication.service';

import { SignUpView } from './SignUpView';

export const SignUp = (): ReactElement => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  
  // eslint-disable-next-line
  const [auth, handleAuth] = useAuth();

  const [firstName, firstNameElement] = useFormInput('');
  const [middleName, middleNameElement] = useFormInput('');
  const [lastName, lastNameElement] = useFormInput('');
  const [email, emailElement] = useFormInput('');
  const [password, passwordElement] = useFormInput('');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await signUp({
        firstName,
        middleName,
        lastName,
        email,
        password,
      });
      if (response.success) {
        handleAuth();
        history.push('/classes');
        return;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('ERROR - SignUp.tsx - onSubmit():', error);
    }
  };

  return (
    <Loader
      isLoading={isLoading}
      component={
        <SignUpView
          onSubmit={onSubmit}
          firstNameElement={firstNameElement}
          middleNameElement={middleNameElement}
          lastNameElement={lastNameElement}
          emailElement={emailElement}
          passwordElement={passwordElement}
        />
      }
    />
  );
};
