import { ReactElement } from 'react';
import { useFormInput } from '../../hooks/useFormInput';
import { postApi } from '../../services/api.service';

import { SignUpView } from './SignUpView';

export const SignUp = (): ReactElement => {
  const [firstName, firstNameElement] = useFormInput('');
  const [middleName, middleNameElement] = useFormInput('');
  const [lastName, lastNameElement] = useFormInput('');
  const [hourlyRate, hourlyRateElement] = useFormInput('');
  const [email, emailElement] = useFormInput('');
  const [password, passwordElement] = useFormInput('');

  const onSubmit = async () => {
    const data = await postApi('/authentication/signUp', {
      firstName,
      middleName,
      lastName,
      hourlyRate,
      email,
      password,
    });
    console.log(data);
  };

  return (
    <SignUpView
      onSubmit={onSubmit}
      firstNameElement={firstNameElement}
      middleNameElement={middleNameElement}
      lastNameElement={lastNameElement}
      hourlyRateElement={hourlyRateElement}
      emailElement={emailElement}
      passwordElement={passwordElement}
    />
  );
};
