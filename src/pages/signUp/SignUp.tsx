import { useEffect } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader';
import { useAuth } from '../../hooks/useAuth';
import { useFormInput } from '../../hooks/useFormInput';
import { signUp } from '../../services/authentication.service';
import { getCurrencies } from '../../services/selects.service';

import { SignUpView } from './SignUpView';

export const SignUp = (): ReactElement => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  
  // eslint-disable-next-line
  const [auth, handleAuth] = useAuth();

  const [firstName, firstNameElement] = useFormInput('');
  const [middleName, middleNameElement] = useFormInput('');
  const [lastName, lastNameElement] = useFormInput('');
  const [hourlyRate, hourlyRateElement] = useFormInput('');
  const [email, emailElement] = useFormInput('');
  const [password, passwordElement] = useFormInput('');
  const [currency, currencyElement] = useFormInput('GBP');

  useEffect(() => {
    (async () => {
      try {
        const response = await getCurrencies();
        if (response.success) {
          setCurrencies(response.payload);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('ERROR - SignUp.tsx - useEffect():', error);
      }
    })();
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await signUp({
        firstName,
        middleName,
        lastName,
        hourlyRate,
        email,
        password,
        currency,
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
          hourlyRateElement={hourlyRateElement}
          emailElement={emailElement}
          passwordElement={passwordElement}
          currencyElement={currencyElement}
          currencies={currencies}
        />
      }
    />
  );
};
