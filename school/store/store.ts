import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import ClassReducer from './Slices/ClassSlice';
import StudentReducer from './Slices/StudentSlice';
import SubjectReducer from './Slices/SubjectSlice';
import TeacherReducer from './Slices/TeacherSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: ClassReducer,
    subject: SubjectReducer,
    student: StudentReducer,
    teacher: TeacherReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
