import { combineReducers } from "@reduxjs/toolkit";
import listPetReducer from "./pet/PetReducer";
import listProductReducer from "./product/ProductReducer";
import searchFilterReducer from "./filters/FiltersReducer";

const rootReducer = combineReducers({
    listPet: listPetReducer,
    listProduct: listProductReducer,
    searchFilter: searchFilterReducer
    
})
export default rootReducer