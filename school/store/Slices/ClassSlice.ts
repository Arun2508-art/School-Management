import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ClassProps {
  standard: string;
  capacity?: number;
  grade?: string;
  supervisor?: string;
}
interface StudentsState {
  students: ClassProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StudentsState = {
  students: [],
  status: 'idle'
};

export const createClass = createAsyncThunk(
  'api/add/Class',
  async ({ standard, capacity, grade, supervisor }: ClassProps) => {
    const response = await fetch('http://localhost:3000/api/class', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ standard, capacity, grade, supervisor })
    });
    const data = await response.json();
    return data;
  }
);

export const deleteClass = createAsyncThunk(
  'api/delete/Class',
  async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/class/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
);

export const updateClass = createAsyncThunk(
  'api/update/Class',
  async (value: ClassProps) => {
    const response = await fetch('http://localhost:3000/api/class', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return data;
  }
);

export const fetchClass = createAsyncThunk('api/fecth/Class', async () => {
  const response = await fetch('http://localhost:3000/api/class', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
});

export const ClassSlice = createSlice({
  name: 'Class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchClass.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(createClass.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(deleteClass.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(updateClass.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default ClassSlice.reducer;
