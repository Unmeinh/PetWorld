import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import  api, {axiosJSON} from '../../../api/axios.config';
const cartSlice = createSlice({
  name: 'cart',
  initialState:{status:'idle',carts:[],message:''},
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
    },
    plusProduct: (state, action) => {
      const cart = state.find(item => item.idProduct === action.payload);
      if (cart && cart.amount < 99) {
        cart.amount++;
      }
    },
    minusProduct: (state, action) => {
      const index = state.findIndex(item => item.idProduct === action.payload);
      if (index !== -1) {
        if (state[index].amount > 1) {
          state[index].amount--;
        } else {
          state.splice(index, 1);
        }
      }
    },
    selectItem: (state, action) => {
      const selectedIds = action.payload.map(itemAction => itemAction.id);
      state.forEach(item => {
        item.isSelect = selectedIds.includes(item.idProduct);
      });
    },
  },
  extraReducers: builder =>{
    builder.addCase(fetchCart.pending,(state, action) => {
      state.status = 'loading';
    }).addCase(fetchCart.fulfilled,(state, action) => {
      if(action.payload.success){
        state.carts = action.payload.data.carts
        state.status = 'idle';
      }else{
        state.status = 'loading';
      }
    })
  }
});
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const res = await api.get('/cart');
    return res.data;
  },
);
export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (action) => {
    const res = await axiosJSON.post('/cart',action);
  },
);
export const { addCart, plusProduct, minusProduct, selectItem } = cartSlice.actions;

export default cartSlice.reducer;
