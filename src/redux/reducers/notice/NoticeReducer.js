 import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import {GetAllNotice} from '../../../api/RestApi';

const listNoticeSlice = createSlice({
  name: 'listNotice',
  initialState: {status: 'idle', data: [], message: ''},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotices.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.notices = action.payload.data;
        }
      });
  },
});
export const fetchNotices = createAsyncThunk(
  'notices/fetchNotices',
  async () => {
    const res = await GetAllNotice();
    return res;
  },
);
// export const updateNotices = createAsyncThunk(
//   'notices/fetchNotices',
//   async (idNotice) => {
//     try {
//       const res = await api.get('notice/update'+idNotice);
//       return res.data;
//     } catch (error) {
//       console.error('Error fetching notices:', error);
//       throw error;
//     }
//   },
// );
// export const deleteNotices = createAsyncThunk(
//   'notices/fetchNotices',
//   async (idNotice) => {
//     try {
//       const res = await api.get('notice/delete'+idNotice);
//       return res.data;
//     } catch (error) {
//       console.error('Error fetching notices:', error);
//       throw error;
//     }
//   },
// );
export default listNoticeSlice.reducer;
