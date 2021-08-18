import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  limit: 1,
};

export const tutorsParamsSlice = createSlice({
  name: 'tutorsParams',
  initialState,
  reducers: {
    updateTutorsParams: (state, action) => {
      const newState = Object.assign(state, action.payload);
      return newState;
    },
  },
});

export const { updateTutorsParams } = tutorsParamsSlice.actions;

export const tutorsParamsSliceReducer = tutorsParamsSlice.reducer;
