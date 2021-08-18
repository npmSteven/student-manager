import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  limit: 2,
};

export const meetingsParamsSlice = createSlice({
  name: 'meetingsParams',
  initialState,
  reducers: {
    updateMeetingsParams: (state, action) => {
      const newState = Object.assign(state, action.payload);
      return newState;
    },
  },
});

export const { updateMeetingsParams } = meetingsParamsSlice.actions;

export const meetingsParamsSliceReducer = meetingsParamsSlice.reducer;
