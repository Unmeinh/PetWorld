import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {onAxiosGet} from '../../../api/axios.function';
import {goBack} from '../../../navigation/rootNavigation';
import axiosAPi from '../../../api/axios.config';
import {
  AddLocationUser,
  EditLocationSelect,
  EditLocationUser,
  GetDetailUser,
} from '../../../api/RestApi';
const initialState = {
  loginData: {},
  data: {},
  status: '',
  message: '',
  selectId: '',
  followType: '',
  setChangeData: false,
};

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.loginData = action.payload;
    },
    changeStatusPending: (state, action) => {
      state.status = action.payload;
    },
    setMessageUser: (state, action) => {
      state.message = action.payload;
    },
    setChangeData: (state, action) => {
      state.setChangeData = action.payload;
      state.message = '';
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
      })
      .addCase(addLocationUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addLocationUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.setChangeData = true;
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.status = 'being idle';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(editLocationUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(editLocationUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.setChangeData = true;
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.status = 'being idle';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(editLocationSelect.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(editLocationSelect.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.data = action.payload.data;
          state.message = action.payload.message;
          state.status = 'being idle';
          goBack();
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchInfoUserNoMessage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchInfoUserNoMessage.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.data = action.payload.data;
          state.status = 'being idle';
        } else {
          state.status = 'loading';
        }
      });
  },
});

export const fetchUsers = createAsyncThunk('user/list/all', async () => {
  const res = await onAxiosGet('/user/list/all');
  return res;
});
export const fetchInfoLogin = createAsyncThunk('user/myDetail', async () => {
  const res = await onAxiosGet('/user/myDetail');
  return res;
});
export const fetchInfoUser = createAsyncThunk('user/userDetail', async id => {
  const res = await onAxiosGet('/user/userDetail/' + id);
  return res;
});
export const fetchFollowUser = createAsyncThunk('user/myDetail', async () => {
  const res = await onAxiosGet('/user/userDetal');
  return res;
});
export const addLocationUser = createAsyncThunk(
  'user/addLocationUser',
  async action => {
    const res = await AddLocationUser(action);
    return res;
  },
);
export const editLocationUser = createAsyncThunk(
  'user/editLocationUser',
  async action => {
    const res = await EditLocationUser({
      data: JSON.stringify(action),
    });
    return res;
  },
);
export const editLocationSelect = createAsyncThunk(
  'user/editLocationUserSelect',
  async action => {
    const res = await EditLocationSelect(action);
    return res;
  },
);
export const fetchInfoUserNoMessage = createAsyncThunk(
  'user/userDetailNoMessage',
  async () => {
    const res = await GetDetailUser();
    return res;
  },
);
export const {setUserLogin, setMessageUser, setChangeData} =
  userReducer.actions;
export default userReducer.reducer;
