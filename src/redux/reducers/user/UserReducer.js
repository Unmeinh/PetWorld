import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosGet from '../../../api/axios.config';
const initialState = {
    data: {},
    status: '',
    message: '',
    selectId: '',
    followType: ''
};

const userReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // getInfoLogin: (state, action) => {
        //     state.data = action.payload;
        // },
        // getInfoUser: (state, action) => {
        //     state.selectId = action.payload;
        // },
        // getFollowUser: (state, action) => {
        //     state.selectId = action.payload[0];
        //     state.followType = action.payload[1];
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchInfoLogin.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchInfoLogin.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            })
            .addCase(fetchInfoUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchInfoUser.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            });
    },
});

export const fetchUsers = createAsyncThunk(
    'users/list/all',
    async () => {
        const res = await axiosGet.get('/users/list/all');
        return res.data;
    },
);
export const fetchInfoLogin = createAsyncThunk(
    'user/myDetail',
    async () => {
        const res = await axiosGet.get('/user/myDetail');
        return res.data;
    },
);
export const fetchInfoUser = createAsyncThunk(
    'user/userDetail',
    async (id) => {
        const res = await axiosGet.get('/user/userDetail/' + id);
        return res.data;
    },
);
export const fetchFollowUser = createAsyncThunk(
    'user/myDetail',
    async () => {
        const res = await axiosGet.get('/user/userDetal');
        return res.data;
    },
);
export const { getInfoLogin, getInfoUser, getFollowUser } = userReducer.actions;
export default userReducer.reducer;