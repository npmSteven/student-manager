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

export const getTutorsBulk = async (tutorIds) => {
  try {
    const response = await getApi('/tutors/bulk', {  ids: tutorIds });
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

export const updateTutor = async (id, tutor) => {
  try {
    const response = await putApi(`/tutors/${id}`, tutor);
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
