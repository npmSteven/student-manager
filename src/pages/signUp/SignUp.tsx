import { useEffect } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { Loader } from '../../components/loader/Loader';
import { useFormInput } from '../../hooks/useFormInput';
import { signUp } from '../../services/authentication.service';
import { getCurrencies } from '../../services/selects';

import { SignUpView } from './SignUpView';

export const SignUp = (): ReactElement => {
  const [firstName, firstNameElement] = useFormInput('');
  const [middleName, middleNameElement] = useFormInput('');
  const [lastName, lastNameElement] = useFormInput('');
  const [hourlyRate, hourlyRateElement] = useFormInput('');
  const [email, emailElement] = useFormInput('');
  const [password, passwordElement] = useFormInput('');
  const [currency, currencyElement] = useFormInput('');
  const [isLoading, setIsLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getCurrencies();
      if (response.success) {
        setCurrencies(response.payload);
      }
      setIsLoading(false);
    })();
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await signUp({
        firstName,
        middleName,
        lastName,
        hourlyRate,
        email,
        password,
        currency,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('ERROR - onSubmit():', error);
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
