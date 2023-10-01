import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosGet, { axiosJSON } from '../../../api/axios.config';
import { goBack } from '../../../navigation/rootNavigation';
import { updateCart } from '../shop/CartReduces';
const initialState = {
    data: {},
    status: 'being idle',
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
        setMessageUser: (state, action) => {
            state.message = action.payload
        },
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
            }).addCase(addLocationUser.pending, (state,action) =>{
                state.status = 'loading';
            }).addCase(addLocationUser.fulfilled, (state,action) =>{
                if(action.payload.success){
                    state.data = action.payload.data   
                    state.message = action.payload.message
                    state.status = 'being idle';
                    goBack()
                }else{
                    state.status = 'loading';
                }
            }).addCase(editLocationUser.pending, (state,action) =>{
                state.status = 'loading';
            }).addCase(editLocationUser.fulfilled, (state,action) =>{
                if(action.payload.success){
                    state.data = action.payload.data   
                    state.message = action.payload.message
                    state.status = 'being idle';
                    goBack()
                }else{
                    state.status = 'loading';
                }
            }).addCase(editLocationSelect.pending, (state,action) =>{
                state.status = 'loading';
            }).addCase(editLocationSelect.fulfilled, (state,action) =>{
                if(action.payload.success){
                    state.data = action.payload.data   
                    state.message = action.payload.message
                    state.status = 'being idle';
                    goBack()

                }else{
                    state.status = 'loading';
                }
            })
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
export const addLocationUser = createAsyncThunk(
    'user/addLocationUser',
    async (action) => {
        const res = await axiosJSON.post('/cart/addLocations',action)
        return res.data
    }
)
export const editLocationUser = createAsyncThunk(
    'user/editLocationUser',
    async (action) => {
        const res = await axiosJSON.put(`/cart/editLocation`,{data: JSON.stringify(action)})
        return res.data
    }
)
export const editLocationSelect = createAsyncThunk(
    'user/editLocationUserSelect',
    async (action) => {
        const res = await axiosJSON.put(`/cart/editLocations/${action}`)
        return res.data
    }
)
export const { getInfoLogin, getInfoUser, getFollowUser ,setMessageUser,setChangeLocationSelect} = userReducer.actions;
export default userReducer.reducer;