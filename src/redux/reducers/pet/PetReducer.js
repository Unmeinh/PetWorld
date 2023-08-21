import dataPet from '../../../data/listpet'
import { createSlice } from '@reduxjs/toolkit';
const listPetSlice = createSlice({
    name:'listpet',
    initialState:dataPet,
    reducers:{}
})


export default listPetSlice.reducer