import dataProduct from '../../../data/listproduct'
import { createSlice } from '@reduxjs/toolkit'
const initState = dataProduct
const listPetSlice = createSlice({
    name:'listPet',
    initialState:initState,
    reducers:{}
})
export default listPetSlice.reducer