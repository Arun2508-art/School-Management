import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface StandardProps {
  _id?: string;
  name: string;
  capacity?: number;
  supervisor?: string;
}
interface StudentsState {
  standard: StandardProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StudentsState = {
  standard: [],
  status: 'idle'
};

export const createClass = createAsyncThunk(
  'Class/createClass',
  async ({ name, capacity, supervisor }: StandardProps) => {
    const response = await fetch(`${baseUrl}/api/class`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, capacity, supervisor })
    });
    const data = await response.json();
    return data;
  }
);

export const deleteClass = createAsyncThunk(
  'api/delete/Class',
  async (id: string) => {
    const response = await fetch(`${baseUrl}/api/class?id=${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
);

export const updateClass = createAsyncThunk(
  'api/update/Class',
  async (value: StandardProps) => {
    const response = await fetch(`${baseUrl}/api/class`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return data;
  }
);

export const fetchClass = createAsyncThunk('api/fecth/Class', async () => {
  const response = await fetch(`${baseUrl}/api/class`, {
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
        state.standard = action.payload.standard;
      })
      .addCase(fetchClass.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.standard.push(action.payload.data);
      })
      .addCase(createClass.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.standard = state.standard.filter(
          (item) => item._id !== action.payload.data._id
        );
      })
      .addCase(deleteClass.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.standard = action.payload;
      })
      .addCase(updateClass.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default ClassSlice.reducer;
