import { combineReducers } from "@reduxjs/toolkit";
import listPetReducer from "./pet/PetReducer";
import listProductReducer from "./product/ProductReducer";
import searchFilterReducer from "./filters/FiltersReducer";
import categoryReducer from "./category/category";

const rootReducer = combineReducers({
    listPet: listPetReducer,
    listProduct: listProductReducer,
    searchFilter: searchFilterReducer,
    category: categoryReducer 
})
export default rootReducer