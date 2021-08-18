import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    updateMeetings: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateMeetings } = meetingsSlice.actions;

export const meetingsSliceReducer = meetingsSlice.reducer;
