import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import  api from '../../../api/axios.config';
const cartSlice = createSlice({
  name: 'cart',
  initialState:{status:'idle',carts:[],message:'',idCheckCart:'',statusAddProductoCart:'idle'},
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
    },
    plusProduct: (state, action) => {
      const cart = state.carts.find(item => item.idProduct._id === action.payload);
      if (cart && cart.amount < 99) {
        cart.amount++;
      }
    },
    minusProduct: (state, action) => {
      const index = state.carts.findIndex(item => item.idProduct._id === action.payload);
      if (index !== -1) {
        if (state.carts[index].amount > 1) {
          state.carts[index].amount--;
        } else {
          state.carts.splice(index, 1);
        }
      }
    },
    selectItem: (state, action) => {
      const product = state.carts.find(item => item.idProduct._id === action.payload.idProduct);
      if(product){
        product.isSelected = action.payload.isSelected;
      }
    },
    setStatusMessageCart: (state,action) =>{
      state.message = action.payload
    },
    selectAllItemsShop:(state, action) =>{
      state.carts.map((item) => {
        if(item.idProduct.idShop === action.payload.idShop){
          item.isSelected = !action.payload.isSelect
        }
      })
    },
    selectAllItemCart:(state,action) =>{
      state.carts.map(item => item.isSelected = true)
    }
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
    }).addCase(addProductToCart.pending,(state, action) => {
      state.statusAddProductoCart = 'loading'
      state.message = ''
    }).addCase(addProductToCart.fulfilled,(state, action) =>{
      state.message = action.payload.message
      state.statusAddProductoCart = 'idle'
    }).addCase(updateCart.pending,(state, action) =>{
      state.status = 'loading'
    }).addCase(updateCart.fulfilled,(state, action) =>{
      if(action.payload.success){
        state.status = 'idle'
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
    const res = await api.post('/cart',action);
    return res.data;
  },
);
export const updateCart = createAsyncThunk(
  'cart/update',async (action) => {
    const res = await api.post('/cart/update',{data: JSON.stringify(action)});
    return res.data
  }
)
export const { addCart, plusProduct, minusProduct, selectItem ,setStatusMessageCart,selectAllItemsShop,selectAllItemCart} = cartSlice.actions;

export default cartSlice.reducer;
