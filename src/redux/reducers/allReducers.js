import { combineReducers } from "@reduxjs/toolkit";
import listPetReducer from "./pet/PetReducer";
import listProductReducer from "./product/ProductReducer";
import searchFilterReducer from "./filters/FiltersReducer";
import categoryReducer from "./category/category";
import listShopReducer from "./shop/ShopReducer";
import listBlogReducer from "./blog/ListBlogReducer";
import listCommentReducer from "./comment/ListCommentReducer";

const rootReducer = combineReducers({
    listPet: listPetReducer,
    listProduct: listProductReducer,
    searchFilter: searchFilterReducer,
    category: categoryReducer,
    listShop: listShopReducer,
    listBlog: listBlogReducer,
    listComment: listCommentReducer,
});

export default rootReducer;