import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAxiosGet } from '../../../api/axios.function';
import { encodeToAscii, decodeFromAscii } from '../../../function/functionHash';
const initialState = {
    data: [],
    dataUser: [],
    canLoadMore: false,
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
                    if (action.payload.data?.isPage != undefined) {
                        if (action.payload.data?.isPage == 0) {
                            state.data = action.payload.data.list;
                            state.canLoadMore = action.payload.data.canLoadMore;
                        } else {
                            state.data = [...state.data, ...action.payload.data.list];
                            state.canLoadMore = action.payload.data.canLoadMore;
                        }
                    } else {
                        state.data = action.payload.data.list;
                        state.canLoadMore = action.payload.data.canLoadMore;
                    }
                    state.status = 'being idle';
                } else {
                    if (action.payload.data?.isMaxPage) {
                        state.canLoadMore = false;
                    }
                    state.status = 'being idle';
                }
            })
            .addCase(fetchBlogsPage.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogsPage.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    for (let i = 0; i < action.payload.data.list.length; i++) {
                        const element = action.payload.data.list[i];
                        state.data.splice(i, 1, element);
                    }
                    state.status = 'being idle';
                } else {
                    state.status = 'being idle';
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
                    state.status = 'being idle';
                }
            });
    },
});

export const fetchBlogs = createAsyncThunk(
    'blog/list/all',
    async (page) => {
        let res = null;
        if (page != undefined) {
            res = await onAxiosGet('/blog/list/all?page=' + page);
        } else {
            res = await onAxiosGet('/blog/list/all');
        }
        return res;
    },
);

export const fetchBlogsPage = createAsyncThunk(
    'blog/list/all/page',
    async ([page, loadBefore]) => {
        let res = null;
        if (page != undefined) {
            res = await onAxiosGet('/blog/list/all?page=' + page + '&&loadBefore=' + loadBefore);
        } else {
            res = await onAxiosGet('/blog/list/all');
        }
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