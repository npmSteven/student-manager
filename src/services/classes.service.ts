import { deleteApi, getApi, postApi, putApi } from './api.service';

export const getClasses = async () => {
  try {
    const response = await getApi('/classes');
    return response;
  } catch (error) {
    console.error('ERROR - getClasses():', error);
    throw error;
  }
};

export const getClass = async (id: string) => {
  try {
    const response = await getApi(`/classes/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - getClass():', error);
    throw error;
  }
};

export const addClass = async (classObj) => {
  try {
    const response = await postApi('/classes', classObj);
    return response;
  } catch (error) {
    console.error('ERROR - addClass():', error);
    throw error;
  }
};

export const updateClass = async (id, classObj) => {
  try {
    const response = await putApi(`/classes/${id}`, classObj);
    return response;
  } catch (error) {
    console.error('ERROR - updateClass():', error);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await deleteApi(`/classes/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - deleteClass():', error);
    throw error;
  }
};
