import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface LoginProps {
  email: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: LoginProps = {
  email: '',
  status: 'idle'
};

// Thunk with email passed in
export const LoginAPI = createAsyncThunk('api/login', async (email: string) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await response.json();
  return data;
});

export const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload;
      })
      .addCase(LoginAPI.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default loginSlice.reducer;
