import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    updateStudents: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateStudents } = studentsSlice.actions;

export const studentsSliceReducer = studentsSlice.reducer;
