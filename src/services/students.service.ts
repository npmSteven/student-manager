import { deleteApi, getApi, postApi, putApi } from './api.service';

export const getStudents = async (params = {}) => {
  try {
    const response = await getApi('/students', params);
    return response;
  } catch (error) {
    console.error('ERROR - getStudents():', error);
    throw error;
  }
};

export const getStudentsNames = async () => {
  try {
    const response = await getApi('/students', {
      select: '_id firstName lastName',
      limit: 1000,
    });
    return response;
  } catch (error) {
    console.error('ERROR - getStudentsNames():', error);
    throw error;
  }
};

export const getStudentsNamesByClass = async (classId) => {
  try {
    const response = await getApi('/students', {
      select: '_id firstName lastName',
      limit: 1000,
      classId,
    });
    return response;
  } catch (error) {
    console.error('ERROR - getStudentsNamesByClass():', error);
    throw error;
  }
};

export const getStudentsBulk = async (studentIds) => {
  try {
    const response = await getApi('/students/bulk', { ids: studentIds });
    return response;
  } catch (error) {
    console.error('ERROR - getStudentsBulk():', error);
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

export const addStudent = async ({
  tutorId,
  classId,
  firstName,
  middleName,
  lastName,
  email,
  timezone,
  didWithdraw,
  didDefer,
  didSendSlackInvite,
  didSendIntroEmail,
}) => {
  try {
    const newStudent = {
      tutorId,
      classId,
      firstName,
      middleName,
      lastName,
      email,
      timezone,
      didWithdraw,
      didDefer,
      didSendSlackInvite,
      didSendIntroEmail,
    };
    const response = await postApi('/students', newStudent);
    return response;
  } catch (error) {
    console.error('ERROR - addStudent():', error);
    throw error;
  }
};

export const updateStudent = async (
  id,
  {
    tutorId,
    classId,
    firstName,
    middleName,
    lastName,
    email,
    timezone,
    didWithdraw,
    didDefer,
    didSendSlackInvite,
    didSendIntroEmail,
  }
) => {
  try {
    const updatedStudent = {
      tutorId,
      classId,
      firstName,
      middleName,
      lastName,
      email,
      timezone,
      didWithdraw,
      didDefer,
      didSendSlackInvite,
      didSendIntroEmail,
    };
    const response = await putApi(`/students/${id}`, updatedStudent);
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
