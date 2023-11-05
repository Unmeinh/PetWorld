import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';

const listNoticeSlice = createSlice({
  name: 'listNotice',
  initialState: {status: 'idle',data: [], message: ''},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotices.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.notices = action.payload.data;
     
          state.status = 'idle';
        } else {
          state.status = 'loading';
        }
      });
  },
});
export const fetchNotices = createAsyncThunk(
  'notices/fetchNotices',
  async () => {
    try {
      const res = await api.get('notice/list/all');
      // console.log(res.data); // Log dữ liệu từ API
      return res.data;
    } catch (error) {
      console.error('Error fetching notices:', error);
      throw error; // Nếu có lỗi, bạn có thể xử lý hoặc rethrow lỗi ở đây
    }
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
