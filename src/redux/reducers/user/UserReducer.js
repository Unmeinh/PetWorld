import listUser from '../../../data/user';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    data: {},
    selectId: '',
    followType: ''
};

const userReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getInfoLogin: (state, action) => {
            state.data = action.payload;
        },
        getInfoUser: (state, action) => {
            state.selectId = action.payload;
        },
        getFollowUser: (state, action) => {
            state.selectId = action.payload[0];
            state.followType = action.payload[1];
        },
    },
});

export const { getInfoLogin, getInfoUser, getFollowUser } = userReducer.actions;
export default userReducer.reducer;