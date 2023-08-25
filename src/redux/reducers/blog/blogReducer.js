import listBlog from '../../../data/blog';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    data: listBlog,
    selectId: '',
    userId: ''
};

const blogReducer = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        getAllBlogs: (state, action) => {
            state.data = action.payload;
        },
        getUserBlogs: (state, action) => {
            state.userId = action.payload;
        },
        getDetailBlog: (state, action) => {
            state.selectId = action.payload;
            // state.followType = action.payload[1];
        },
    },
});

export const { getAllBlogs, getUserBlogs, getDetailBlog } = blogReducer.actions;
export default blogReducer.reducer;