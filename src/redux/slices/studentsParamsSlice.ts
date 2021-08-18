import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  limit: 2,
};

export const studentsParamsSlice = createSlice({
  name: 'studentsParams',
  initialState,
  reducers: {
    updateStudentsParams: (state, action) => {
      const newState = Object.assign(state, action.payload);
      return newState;
    },
  },
});

export const { updateStudentsParams } = studentsParamsSlice.actions;

export const studentsParamsSliceReducer = studentsParamsSlice.reducer;
