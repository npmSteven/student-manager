import { deleteApi, getApi, postApi, putApi } from './api.service';

export const getStudents = async () => {
  try {
    const response = await getApi('/students');
    return response;
  } catch (error) {
    console.error('ERROR - getStudents():', error);
    throw error;
  }
};

export const getStudent = async (id: string) => {
  try {
    const response = await getApi(`/students/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - getStudent():', error);
    throw error;
  }
};

export const addStudent = async (student) => {
  try {
    const response = await postApi('/students', student);
    return response;
  } catch (error) {
    console.error('ERROR - addStudent():', error);
    throw error;
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await putApi(`/students/${id}`, student);
    return response;
  } catch (error) {
    console.error('ERROR - updateStudent():', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await deleteApi(`/students/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - deleteStudent():', error);
    throw error;
  }
};
