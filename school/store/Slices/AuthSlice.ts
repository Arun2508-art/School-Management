import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface LoginProps {
  name?: string;
  role?: 'student' | 'teacher' | 'admin' | 'parent';
}

interface LoginState {
  user: LoginProps | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: LoginState = {
  user: null,
  status: 'idle',
  error: ''
};

// Thunk with email passed in
export const LoginAPI = createAsyncThunk(
  'api/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || 'An error occurred');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Network error: Please try again');
    }
  }
);

export const Logout = createAsyncThunk(
  'api/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || 'An error occurred');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Network error: Please try again');
    }
  }
);

export const authSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAPI.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(LoginAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = '';
        localStorage.setItem('role', action.payload.role);
        localStorage.setItem('name', action.payload.name);
      })
      .addCase(LoginAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(Logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        localStorage.removeItem('role');
        localStorage.removeItem('name');
      })
      .addCase(Logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default authSlice.reducer;
