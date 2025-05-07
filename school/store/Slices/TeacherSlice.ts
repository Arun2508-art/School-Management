import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TeachersProps {
  _id?: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: Date;
  email: string;
  password: string;
  phone?: string;
  classes: string;
  subjects?: string;
  teacherId: string;
  address?: string;
}
interface TeachersState {
  teachers: TeachersProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TeachersState = {
  teachers: [],
  status: 'idle'
};

export const createTeacher = createAsyncThunk(
  'api/add/teacher',
  async (value: TeachersProps) => {
    console.log(value);
    const response = await fetch(`${baseUrl}/api/teacher`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTeacher = createAsyncThunk(
  'api/delete/teacher',
  async (id: string) => {
    const response = await fetch(`${baseUrl}/api/teacher?id=${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
);

export const updateTeacher = createAsyncThunk(
  'api/update/student',
  async (value: TeachersProps) => {
    const response = await fetch(`${baseUrl}/api/teacher`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return data;
  }
);

export const fetchTeacher = createAsyncThunk('api/fecth/teacher', async () => {
  const response = await fetch(`${baseUrl}/api/teacher`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
});

export const TeacherSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacher.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachers = action.payload.data;
      })
      .addCase(fetchTeacher.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createTeacher.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.teachers.push(action.payload.newTeacher);
      })
      .addCase(createTeacher.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.teachers = state.teachers.filter(
          (item) => item._id !== action.payload.deletedTeacher._id
        );
      })
      .addCase(deleteTeacher.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateTeacher.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachers = action.payload;
      })
      .addCase(updateTeacher.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default TeacherSlice.reducer;
