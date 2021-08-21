import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    updateCurrencies: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateCurrencies } = currenciesSlice.actions;

export const currenciesSliceReducer = currenciesSlice.reducer;
