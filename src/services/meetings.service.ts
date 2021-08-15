import { deleteApi, getApi, postApi, putApi } from './api.service';

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

export const updateMeeting = async (id, meeting) => {
  try {
    const response = await putApi(`/meetings/${id}`, meeting);
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
