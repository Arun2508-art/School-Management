import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface StudentsProps {
  firstName: string;
  lastName?: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  email: string;
  phone?: string;
  class: string;
  rollNumber: string;
  address?: string;
  role: 'student';
  isActive?: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
interface StudentsState {
  students: StudentsProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StudentsState = {
  students: [],
  status: 'idle'
};

export const addStudent = createAsyncThunk(
  'api/add/student',
  async (value: StudentsProps) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return data;
  }
);

export const deleteStudent = createAsyncThunk(
  'api/delete/student',
  async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/student/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
);

export const updateStudent = createAsyncThunk(
  'api/update/student',
  async (value: StudentsProps) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return data;
  }
);

export const fetchStudent = createAsyncThunk('api/fecth/student', async () => {
  const response = await fetch('http://localhost:3000/api/student', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
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
      .addCase(fetchStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(addStudent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(updateStudent.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default loginSlice.reducer;
