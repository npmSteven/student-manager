import { deleteApi, getApi, postApi, putApi } from './api.service';

export const getClasses = async (params = {}) => {
  try {
    const response = await getApi('/classes', params);
    return response;
  } catch (error) {
    console.error('ERROR - getClasses():', error);
    throw error;
  }
};

export const getClassesClassCode = async () => {
  try {
    const response = await getApi('/classes', { select: '_id classCode', limit: 1000 });
    return response;
  } catch (error) {
    console.error('ERROR - getClassesClassCode():', error);
    throw error;
  }
};

export const getClassesBulk = async (classIds) => {
  try {
    const response = await getApi('/classes/bulk', { ids: classIds });
    return response;
  } catch (error) {
    console.error('ERROR - getClassesBulk():', error);
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

export const updateClass = async (
  id,
  { classCode, periodStart, periodEnd, location, classType, university }
) => {
  try {
    const newClass = {
      classCode,
      periodStart,
      periodEnd,
      location,
      classType,
      university,
    };
    const response = await putApi(`/classes/${id}`, newClass);
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
