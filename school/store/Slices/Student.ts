import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StandardProps } from './Class';
import { UserType } from './User';

export interface StudentsProps {
  _id?: string;
  user: string | Omit<UserType, 'password'>;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: Date;
  phone?: string;
  class: string | Pick<StandardProps, 'name'>;
  parent: string[];
  rollNumber: string;
  address?: string;
}
interface StudentsState {
  students: StudentsProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StudentsState = {
  students: [],
  status: 'idle'
};

export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (value: StudentsProps, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });

      if (!response.ok) {
        console.log(await response.json());
        return rejectWithValue('Failed to create student');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'api/delete/student',
  async (id: string) => {
    const response = await fetch(`${baseUrl}/api/student?id=${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
);

export const updateStudent = createAsyncThunk(
  'api/update/student',
  async (value: StudentsProps) => {
    const response = await fetch(`${baseUrl}/api/student`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return data;
  }
);

export const fetchStudent = createAsyncThunk('api/fecth/student', async () => {
  const response = await fetch(`${baseUrl}/api/student`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
});

export const StudentSlice = createSlice({
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
        state.students = action.payload.students;
      })
      .addCase(fetchStudent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students.push(action.payload.newStudent);
      })
      .addCase(createStudent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = state.students.filter(
          (item) => item._id !== action.payload.deletedStudent._id
        );
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

export default StudentSlice.reducer;
