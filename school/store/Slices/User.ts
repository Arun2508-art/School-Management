import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type UserType = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
};

interface UserState {
  user: UserType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: undefined
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: UserType, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to create user');
      }

      const NewUser = res.json();
      return NewUser;
    } catch (err) {
      console.log(err);
      return rejectWithValue('Network error');
    }
  }
);

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;
