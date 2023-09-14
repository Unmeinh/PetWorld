import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: ''
};

const tokenReducer = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setOneTimeToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setOneTimeToken } = tokenReducer.actions;
export default tokenReducer.reducer;