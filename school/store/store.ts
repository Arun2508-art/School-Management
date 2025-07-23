import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import ClassReducer from './Slices/Class';
import ParentReducer from './Slices/ParentSlice';
import StudentReducer from './Slices/Student';
import SubjectReducer from './Slices/Subject';
import TeacherReducer from './Slices/TeacherSlice';
import UserReducer from './Slices/User';

export const store = configureStore({
  reducer: {
    User: UserReducer,
    auth: authReducer,
    class: ClassReducer,
    subject: SubjectReducer,
    student: StudentReducer,
    teacher: TeacherReducer,
    parent: ParentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
