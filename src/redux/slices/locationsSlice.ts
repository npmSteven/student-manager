import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    updateLocations: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateLocations } = locationsSlice.actions;

export const locationsSliceReducer = locationsSlice.reducer;
