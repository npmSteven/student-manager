import { toast } from 'react-toastify';
import { getJwt } from './authentication.service';

const apiRoot = 'https://student-manager-api.herokuapp.com/api/v1';
// const apiRoot = 'http://localhost:8080/api/v1';

const getAuthHeaders = () => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${getJwt()}`);
  headers.append('Content-Type', 'application/json');
  return headers;
};

const checkErrors = (data: any) => {
  if (!data.success) {
    toast.dismiss();
    data.payload.forEach((error: string) => {
      toast.error(error);
    });
  }
};

export const getApi = async (route: string) => {
  try {
    const response = await fetch(`${apiRoot}${route}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    checkErrors(data);
    return data;
  } catch (error) {
    console.error('ERROR - getApi():');
    throw error;
  }
};

export const postApi = async (route: string, body: any) => {
  try {
    const response = await fetch(`${apiRoot}${route}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    checkErrors(data);
    return data;
  } catch (error) {
    console.error('ERROR - postApi():');
    throw error;
  }
};

export const putApi = async (route: string, body: any) => {
  try {
    const response = await fetch(`${apiRoot}${route}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    checkErrors(data);
    return data;
  } catch (error) {
    console.error('ERROR - putApi():');
    throw error;
  }
};

export const deleteApi = async (route: string) => {
  try {
    const response = await fetch(`${apiRoot}${route}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    checkErrors(data);
    return data;
  } catch (error) {
    console.error('ERROR - deleteApi():');
    throw error;
  }
};
