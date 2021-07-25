import { useState } from 'react';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { useAuth } from '../../hooks/useAuth';
import { useFormInput } from '../../hooks/useFormInput';
import { signIn } from '../../services/authentication.service';
import { SignInView } from './SignInView';

export const SignIn = (): ReactElement => {
  
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
  const [auth, handleAuth] = useAuth();
  const [email, emailElement] = useFormInput('');
  const [password, passwordElement] = useFormInput('');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await signIn({
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
