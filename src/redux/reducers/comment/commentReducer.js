import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAxiosGet } from '../../../api/axios.function';
const initialState = {
    data: [],
    status: '',
    message: ''
};

const commentReducer = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        changeStatusComment: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCommentByBlog.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCommentByBlog.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            });
    },
});

export const fetchCommentByBlog = createAsyncThunk(
    'comment/list/blog',
    async (idBlog) => {
        const res = await onAxiosGet('/comment/list/' + idBlog);
        return res;
    },
);


export const { changeStatusComment } = commentReducer.actions;
export default commentReducer.reducer;
