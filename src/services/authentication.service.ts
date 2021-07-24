import { toast } from 'react-toastify';
import { postApi } from './api.service';
import { setUser } from './user.service';

const JWT_KEY = 'jwt';

export const getJwt = (): string | null => localStorage.getItem(JWT_KEY);

export const setJwt = (jwt: any): void => localStorage.setItem(JWT_KEY, jwt);

export const signUp = async (body: any) => {
  const response = await postApi('/authentication/signUp', body);
  if (response.success) {
    const { payload } = response;
    setJwt(payload.token);
    setUser(payload.user);
    toast.dismiss();
    toast.success('Successfully signed up');
  }
  return response;
};
