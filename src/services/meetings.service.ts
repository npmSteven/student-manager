import { deleteApi, getApi, getApiRoot, postApi, putApi } from './api.service';
import { getJwt } from './authentication.service';

export const getMeetings = async (params = {}) => {
  try {
    const response = await getApi('/meetings', params);
    return response;
  } catch (error) {
    console.error('ERROR - getMeetings():', error);
    throw error;
  }
};

export const getMeetingsBulk = async (meetingIds) => {
  try {
    const response = await getApi('/meetings/bulk', { ids: meetingIds });
    return response;
  } catch (error) {
    console.error('ERROR - getMeetingsBulk():', error);
    throw error;
  }
};

export const getMeeting = async (id: string) => {
  try {
    const response = await getApi(`/meetings/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - getMeeting():', error);
    throw error;
  }
};

export const addMeeting = async (meeting) => {
  try {
    const response = await postApi('/meetings', meeting);
    return response;
  } catch (error) {
    console.error('ERROR - addMeeting():', error);
    throw error;
  }
};

export const updateMeeting = async (
  id,
  {
    tutorId,
    studentId,
    periodStart,
    periodEnd,
    currency,
    didShow,
    didFillTutorEvaluationSheet,
    didFillStudentEvaluationSheet,
    topicsCovered,
    notes,
  }
) => {
  try {
    const updatedMeeting = {
      tutorId,
      studentId,
      periodStart,
      periodEnd,
      currency,
      didShow,
      didFillTutorEvaluationSheet,
      didFillStudentEvaluationSheet,
      topicsCovered,
      notes,
    };
    const response = await putApi(`/meetings/${id}`, updatedMeeting);
    return response;
  } catch (error) {
    console.error('ERROR - updateMeeting():', error);
    throw error;
  }
};

export const deleteMeeting = async (id) => {
  try {
    const response = await deleteApi(`/meetings/${id}`);
    return response;
  } catch (error) {
    console.error('ERROR - deleteMeeting():', error);
    throw error;
  }
};

export const downloadMeetingsExcel = async (params) => {
  try {
    const url: any = new URL(`${getApiRoot()}/meetings/excel`);
    url.search = new URLSearchParams({...params, access_token: getJwt()}).toString();
    window.open(url);
  } catch (error) {
    console.error('ERROR - downloadMeetingsExcel():', error);
    throw error;
  }
};
