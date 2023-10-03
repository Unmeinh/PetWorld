import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAxiosGet } from '../../../api/axios.function';
const initialState = {
    data: {},
    status: '',
    message: '',
    selectId: '',
    followType: ''
};

const followReducer = createSlice({
    name: 'follows',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMyFollow.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMyFollow.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.followType = action.payload.type;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            })
            .addCase(fetchUserFollow.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUserFollow.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.followType = action.payload.type;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            });
    },
});

export const fetchMyFollow = createAsyncThunk(
    'follow/list/myFollow',
    async (flType) => {
        let res = null;
        if (flType == "following") {
            res = await onAxiosGet('/follow/list/myFollowing');
        } else {
            res = await onAxiosGet('/follow/list/myFollower');
        }
        return res;
    },
);
export const fetchUserFollow = createAsyncThunk(
    'user/myFollower',
    async ([flType, idUser]) => {
        let res = null;
        if (flType == "following") {
            res = await onAxiosGet('/follow/list/following/' + idUser);
        } else {
            res = await onAxiosGet('/follow/list/follower/' + idUser);
        }
        return res;
    },
);

export default followReducer.reducer;