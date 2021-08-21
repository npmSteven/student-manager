import { configureStore } from '@reduxjs/toolkit';

import { classesParamsSliceReducer } from './slices/classesParamsSlice';
import { classesSliceReducer } from './slices/classesSlice';
import { classTypesSliceReducer } from './slices/classTypesSlice';
import { currenciesSliceReducer } from './slices/currenciesSlice';
import { locationsSliceReducer } from './slices/locationsSlice';
import { meetingsParamsSliceReducer } from './slices/meetingsParamsSlice';
import { meetingsSliceReducer } from './slices/meetingsSlice';
import { studentsParamsSliceReducer } from './slices/studentsParamsSlice';
import { studentsSliceReducer } from './slices/studentsSlice';
import { timezonesSliceReducer } from './slices/timezonesSlice';
import { tutorsParamsSliceReducer } from './slices/tutorsParamsSlice';
import { tutorsSliceReducer } from './slices/tutorsSlice';

export const store = configureStore({
  reducer: {
    // Table
    meetings: meetingsSliceReducer,
    meetingsParams: meetingsParamsSliceReducer,
    classes: classesSliceReducer,
    classesParams: classesParamsSliceReducer,
    students: studentsSliceReducer,
    studentsParams: studentsParamsSliceReducer,
    tutors: tutorsSliceReducer,
    tutorsParams: tutorsParamsSliceReducer,
    // Selects
    classTypes: classTypesSliceReducer,
    currencies: currenciesSliceReducer,
    locations: locationsSliceReducer,
    timezones: timezonesSliceReducer,
  },
});
