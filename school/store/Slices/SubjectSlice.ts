import { baseUrl } from '@/utills/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type SubjectType = {
  _id?: string;
  subject: string;
  teacherName?: string[];
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
  'api/create/subject',
  async ({ subject, teacherName }: SubjectType) => {
    const res = await fetch(`${baseUrl}/api/subject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, teacherName })
    });
    const data = res.json();
    return data;
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
        console.log(action.payload);
        state.subject.push(action.payload.data);
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
