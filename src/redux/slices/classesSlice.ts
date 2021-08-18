import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    updateClasses: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateClasses } = classesSlice.actions;

export const classesSliceReducer = classesSlice.reducer;
