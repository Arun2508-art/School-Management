import { configureStore } from '@reduxjs/toolkit';
import ClassReducer from './Slices/ClassSlice';
import loginReducer from './Slices/LoginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    class: ClassReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
