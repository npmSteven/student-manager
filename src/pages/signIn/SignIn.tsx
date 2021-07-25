import { useState } from 'react';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { useFormInput } from '../../hooks/useFormInput';
import { signIn } from '../../services/authentication.service';
import { SignInView } from './SignInView';

export const SignIn = (): ReactElement => {
  
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [email, emailElement] = useFormInput('');
  const [password, passwordElement] = useFormInput('');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await signIn({
        email,
        password,
      });
      history.push('/classes');
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
