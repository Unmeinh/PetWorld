import data from '../../../data/category';
import {createSlice} from '@reduxjs/toolkit';
const categorySlice = createSlice({
  name: 'category',
  initialState: data,
  reducers: {},
});
export default categorySlice.reducer;
