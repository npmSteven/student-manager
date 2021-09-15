import { deleteApi, getApi, postApi, putApi } from './api.service';

export const getTutor = async (id: string) => {
  try {
    const response = await getApi(`/tutors/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - getTutor():', error);
    throw error;
  }
};

export const getTutors = async (params = {}) => {
  try {
    const response = await getApi('/tutors', params);
    return response;
  } catch (error) {
    console.error('ERROR - getTutors():', error);
    throw error;
  }
};

export const getTutorsNames = async () => {
  try {
    const response = await getApi('/tutors', {
      select: '_id firstName lastName',
      limit: 1000,
    });
    return response;
  } catch (error) {
    console.error('ERROR - getTutorsNames():', error);
    throw error;
  }
};

export const getTutorsBulk = async (tutorIds) => {
  try {
    const response = await getApi('/tutors/bulk', { ids: tutorIds });
    return response;
  } catch (error) {
    console.error('ERROR - getTutorsBulk():', error);
    throw error;
  }
};

export const addTutor = async (tutor) => {
  try {
    const response = await postApi('/tutors', tutor);
    return response;
  } catch (error) {
    console.error('ERROR - addTutor():', error);
    throw error;
  }
};

export const updateTutor = async (
  id,
  { firstName, middleName, lastName, email, currency, hourlyRate }
) => {
  try {
    const updatedTutor = {
      firstName,
      middleName,
      lastName,
      email,
      currency,
      hourlyRate,
    };
    const response = await putApi(`/tutors/${id}`, updatedTutor);
    return response;
  } catch (error) {
    console.error('ERROR - updateTutor():', error);
    throw error;
  }
};

export const deleteTutor = async (id) => {
  try {
    const response = await deleteApi(`/tutors/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - deleteTutor():', error);
    throw error;
  }
};
