import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type SubjectType = {
  _id?: string;
  name: string;
  teacher?: string[];
};

export interface SubjectProps {
  subject: SubjectType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SubjectProps = {
  subject: [],
  status: 'idle'
};

export const createSubject = createAsyncThunk(
  'subject/createSubject',
  async ({ name, teacher }: SubjectType, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/api/subject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, teacher })
      });

      if (!res.ok) {
        console.log(await res.json());
        return rejectWithValue('Failed to create subject');
      }

      const newSubject = res.json();
      return newSubject;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Network error');
    }
  }
);

export const fecthSubject = createAsyncThunk('api/fecth/subjects', async () => {
  try {
    const res = await fetch(`${baseUrl}/api/subject`);
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteSubject = createAsyncThunk(
  'api/delete/subject',
  async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/subject?id=${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
);

export const SubjectSlice = createSlice({
  name: 'Subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subject.push(action.payload.newSubject);
      })
      .addCase(createSubject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fecthSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthSubject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subject = action.payload.data;
      })
      .addCase(fecthSubject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subject = state.subject.filter(
          (item) => item._id !== action.payload.deleteSubject._id
        );
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default SubjectSlice.reducer;
