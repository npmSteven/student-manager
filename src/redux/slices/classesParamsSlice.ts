import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  limit: 10,
};

export const classesParamsSlice = createSlice({
  name: 'classesParams',
  initialState,
  reducers: {
    updateClassesParams: (state, action) => {
      const newState = Object.assign(state, action.payload);
      return newState;
    },
  },
});

export const { updateClassesParams } = classesParamsSlice.actions;

export const classesParamsSliceReducer = classesParamsSlice.reducer;
