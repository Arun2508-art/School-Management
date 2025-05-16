import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ParentsProps {
  _id?: string;
  name: string;
  dateOfBirth?: Date;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}
interface ParentsState {
  parents: ParentsProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ParentsState = {
  parents: [],
  status: 'idle'
};

export const createParent = createAsyncThunk(
  'api/add/parent',
  async (value: ParentsProps) => {
    const response = await fetch(`${baseUrl}/api/parent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
    const data = await response.json();
    return data;
  }
);

export const deleteParent = createAsyncThunk(
  'api/delete/parent',
  async (id: string) => {
    const response = await fetch(`${baseUrl}/api/parent?id=${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
);

export const updateParent = createAsyncThunk(
  'api/update/parent',
  async (value: ParentsProps) => {
    const response = await fetch(`${baseUrl}/api/parent`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return data;
  }
);

export const fetchParent = createAsyncThunk('api/fecth/parent', async () => {
  const response = await fetch(`${baseUrl}/api/parent`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
});

export const ParentSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parents = action.payload.parents;
      })
      .addCase(fetchParent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createParent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createParent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.parents.push(action.payload.newParent);
      })
      .addCase(createParent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteParent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteParent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parents = state.parents.filter(
          (item) => item._id !== action.payload.deletedParent._id
        );
      })
      .addCase(deleteParent.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateParent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateParent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parents = action.payload;
      })
      .addCase(updateParent.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default ParentSlice.reducer;
