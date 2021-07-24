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
