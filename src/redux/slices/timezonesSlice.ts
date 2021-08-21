import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const timezonesSlice = createSlice({
  name: 'timezones',
  initialState,
  reducers: {
    updateTimezones: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateTimezones } = timezonesSlice.actions;

export const timezonesSliceReducer = timezonesSlice.reducer;
