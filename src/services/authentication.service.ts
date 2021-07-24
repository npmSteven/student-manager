import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { postApi } from './api.service';
import { getCurrentTimestamp } from './time.service';
import { setUser } from './user.service';

const JWT_KEY = 'jwt';

export const getJwt = (): string | null => localStorage.getItem(JWT_KEY);

export const setJwt = (jwt: any): void => localStorage.setItem(JWT_KEY, jwt);

export const isAuthenticated = () => {
  const jwt = getJwt();
  if (!jwt) return false;
  const decoded: any = jwt_decode(jwt);
  const currentTimestamp = getCurrentTimestamp();
  if (currentTimestamp > decoded.exp) {
    return false;
  }
  return true;
};

export const signUp = async (body: any) => {
  try {
    const response = await postApi('/authentication/signUp', body);
    if (response.success) {
      const { payload } = response;
      setJwt(payload.token);
      setUser(payload.user);
      toast.dismiss();
      toast.success('Successfully signed up');
    }
    return response;
  } catch (error) {
    console.error('ERROR - authentication.service.ts - signUp():', error);
    throw error;
  }
};

export const signIn = async (body: any) => {
  try {
    const response = await postApi('/authentication/signIn', body);
    if (response.success) {
      const { payload } = response;
      setJwt(payload.token);
      setUser(payload.user);
      toast.dismiss();
      toast.success('Successfully signed in');
    }
    return response;
  } catch (error) {
    console.error('ERROR - authentication.service.ts - signIn():', error);
    throw error;
  }
};
