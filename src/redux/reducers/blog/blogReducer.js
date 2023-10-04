import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAxiosGet } from '../../../api/axios.function';
import { encodeToAscii, decodeFromAscii } from '../../../function/functionHash';
const initialState = {
    data: [],
    dataUser: [],
    status: '',
    message: '',
    selectId: '',
    userId: ''
};

const blogReducer = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        changeBlogIsFollow: (state, action) => {
            if (state.data.length > 0) {
                for (let i = 0; i < state.data.length; i++) {
                    const blog = state.data[i];
                    if (blog.idUser._id == action.payload[0]) {
                        state.data.splice(i, 1, {
                            ...state.data[i],
                            isFollowed: action.payload[1]
                        })
                    }
                }
            }
        },
        addBlog: (state, action) => {
            state.data.unshift(action.payload)
        },
        updateBlog: (state, action) => {
            if (state.data.length > 0) {
                let i = state.data.findIndex((blog) => String(blog._id) == action.payload[0]);
                if (i > -1) {
                    state.data.splice(i, 1, action.payload[1])
                }
            }
        },
        removeBlog: (state, action) => {
            if (state.data.length > 0) {
                let i = state.data.findIndex((blog) => String(blog._id) == action.payload);
                if (i > -1) {
                    state.data.splice(i, 1)
                }
            }
        },
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
                    state.dataUser = action.payload.data;
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
        // let idHex = encodeToAscii(id);
        const res = await onAxiosGet('/blog/list/user/' + id);
        return res;
    },
);

export const { changeBlogIsFollow, addBlog, updateBlog, removeBlog } = blogReducer.actions;
export default blogReducer.reducer;