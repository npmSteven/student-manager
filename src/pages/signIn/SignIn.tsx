import { useState } from 'react';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useFormInput } from '../../hooks/useFormInput';
import { signIn } from '../../services/authentication.service';
import { SignInView } from './SignInView';

export const SignIn = (): ReactElement => {
  
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const [_, setIsAuthed] = useAuthentication();
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
        setIsAuthed(true);
        history.push('/classes');
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
