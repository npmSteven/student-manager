import { getApi } from './api.service';

export const getCurrencies = async () => {
  try {
    const response = await getApi('/selects/currencies');
    return response;
  } catch (error) {
    console.error('ERROR - getCurrencies():', error);
    throw error;
  }
};

export const getClassTypes = async () => {
  try {
    const response = await getApi('/selects/classTypes');
    return response;
  } catch (error) {
    console.error('ERROR - getClassTypes():', error);
    throw error;
  }
};

export const getLocations = async () => {
  try {
    const response = await getApi('/selects/locations');
    return response;
  } catch (error) {
    console.error('ERROR - getLocations():', error);
    throw error;
  }
};

export const getTimezones = async () => {
  try {
    const response = await getApi('/selects/timezones');
    return response;
  } catch (error) {
    console.error('ERROR - getTimezones():', error);
    throw error;
  }
};
