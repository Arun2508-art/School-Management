import { configureStore } from '@reduxjs/toolkit';
import ClassReducer from './Slices/ClassSlice';
import loginReducer from './Slices/LoginSlice';
import StudentReducer from './Slices/StudentSlice';
import SubjectReducer from './Slices/SubjectSlice';
import TeacherReducer from './Slices/TeacherSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    class: ClassReducer,
    subject: SubjectReducer,
    student: StudentReducer,
    teacher: TeacherReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
