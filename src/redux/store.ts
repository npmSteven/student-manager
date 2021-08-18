import { configureStore } from '@reduxjs/toolkit';
import { classesParamsSliceReducer } from './slices/classesParamsSlice';
import { classesSliceReducer } from './slices/classesSlice';
import { meetingsParamsSliceReducer } from './slices/meetingsParamsSlice';
import { meetingsSliceReducer } from './slices/meetingsSlice';
import { studentsParamsSliceReducer } from './slices/studentsParamsSlice';
import { studentsSliceReducer } from './slices/studentsSlice';
import { tutorsParamsSliceReducer } from './slices/tutorsParamsSlice';
import { tutorsSliceReducer } from './slices/tutorsSlice';

export const store = configureStore({
  reducer: {
    meetings: meetingsSliceReducer,
    meetingsParams: meetingsParamsSliceReducer,
    classes: classesSliceReducer,
    classesParams: classesParamsSliceReducer,
    students: studentsSliceReducer,
    studentsParams: studentsParamsSliceReducer,
    tutors: tutorsSliceReducer,
    tutorsParams: tutorsParamsSliceReducer,
  },
});
