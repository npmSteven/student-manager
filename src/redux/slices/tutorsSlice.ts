import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const tutorsSlice = createSlice({
  name: 'tutors',
  initialState,
  reducers: {
    updateTutors: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateTutors } = tutorsSlice.actions;

export const tutorsSliceReducer = tutorsSlice.reducer;
