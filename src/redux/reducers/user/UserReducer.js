import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { onAxiosGet } from '../../../api/axios.function';
import { goBack } from '../../../navigation/rootNavigation';
import axiosAPi from '../../../api/axios.config';
const initialState = {
    loginData: {},
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
                    state.loginData = action.payload.data;
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
            }).addCase(fetchInfoUserNoMessage.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchInfoUserNoMessage.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.data = action.payload.data;
                    state.status = 'being idle';
                } else {
                    state.status = 'loading';
                }
            })
    },
});

export const fetchUsers = createAsyncThunk(
    'user/list/all',
    async () => {
        const res = await onAxiosGet('/user/list/all');
        return res;
    },
);
export const fetchInfoLogin = createAsyncThunk(
    'user/myDetail',
    async () => {
        const res = await onAxiosGet('/user/myDetail');
        return res;
    },
);
export const fetchInfoUser = createAsyncThunk(
    'user/userDetail',
    async (id) => {
        const res = await onAxiosGet('/user/userDetail/' + id);
        return res;
    },
);
export const fetchFollowUser = createAsyncThunk(
    'user/myDetail',
    async () => {
        const res = await onAxiosGet('/user/userDetal');
        return res;
    },
);
export const addLocationUser = createAsyncThunk(
    'user/addLocationUser',
    async (action) => {
        const res = await axiosAPi.post('/cart/addLocations',action)
        return res.data
    }
)
export const editLocationUser = createAsyncThunk(
    'user/editLocationUser',
    async (action) => {

        const res = await axiosAPi.put(`/cart/editLocation`,{data: JSON.stringify(action)})
        return res.data
    }
)
export const editLocationSelect = createAsyncThunk(
    'user/editLocationUserSelect',
    async (action) => {
        const res = await axiosAPi.put(`/cart/editLocations/${action}`)
        return res.data
    }
)
export const fetchInfoUserNoMessage = createAsyncThunk(
    'user/userDetailNoMessage', 
    async () => {
        const res = await axiosAPi.get('/user/myDetail');
        return res.data;
    },
);
export const {setMessageUser} = userReducer.actions
export default userReducer.reducer;