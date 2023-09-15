import listBlog from '../../../data/blog';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAxiosGet } from '../../../api/axios.function';
const initialState = {
    data: {},
    status: '',
    message: '',
    selectId: '',
    userId: ''
};

const blogReducer = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        // getAllBlogs: (state, action) => {
        //     state.data = action.payload;
        // },
        // getUserBlogs: (state, action) => {
        //     state.userId = action.payload;
        // },
        // getDetailBlog: (state, action) => {
        //     state.selectId = action.payload;
        //     // state.followType = action.payload[1];
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlogs.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            })
            .addCase(fetchBlogsUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogsUser.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            });
    },
});

export const fetchBlogs = createAsyncThunk(
    'blog/list/all',
    async () => {
        const res = await onAxiosGet('/blog/list/all');
        return res;
    },
);

export const fetchBlogsUser = createAsyncThunk(
    'blog/list/user',
    async (id) => {
        const res = await onAxiosGet('/blog/list/user/' + id);
        return res;
    },
);

export default blogReducer.reducer;