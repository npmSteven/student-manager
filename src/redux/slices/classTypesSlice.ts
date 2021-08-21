import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const classTypesSlice = createSlice({
  name: 'classTypes',
  initialState,
  reducers: {
    updateClassTypes: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateClassTypes } = classTypesSlice.actions;

export const classTypesSliceReducer = classTypesSlice.reducer;
