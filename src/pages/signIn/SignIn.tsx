import { useState } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { useFormInput } from '../../hooks/useFormInput';
import { isAuthenticated, signIn } from '../../services/authentication.service';
import { SignInView } from './SignInView';

export const SignIn = (): ReactElement => {
  const [email, emailElement] = useFormInput('');
  const [password, passwordElement] = useFormInput('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await signIn({
        email,
        password,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('ERROR - SignIn.tsx - onSubmit():', error);
    }
  };

  return (
    <Loader
      isLoading={isLoading}
      component={
        <SignInView
          onSubmit={onSubmit}
          emailElement={emailElement}
          passwordElement={passwordElement}
        />
      }
    />
  );
};
