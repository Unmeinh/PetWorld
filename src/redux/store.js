import { configureStore } from '@reduxjs/toolkit';
import listPetReducer from './reducers/pet/PetReducer';
import listProductReducer from './reducers/product/ProductReducer';
import categoryReducer from './reducers/category/category';
import listShopReducer from './reducers/shop/ShopReducer';
import blogReducer from './reducers/blog/blogReducer';
import commentReducer from './reducers/comment/commentReducer';
import listCartReducer from './reducers/shop/CartReduces';
import searchFilterReducer from './reducers/filters/filtersReducer';
import userReducer from './reducers/user/userReducer';
import followReducer from './reducers/user/followReducer';

const store = configureStore({
  reducer: {
    listPet: listPetReducer,
    listProduct: listProductReducer,
    searchFilter: searchFilterReducer,
    category: categoryReducer,
    listShop: listShopReducer,
    listBlog: blogReducer,
    listComment: commentReducer,
    listUser: userReducer,
    listCart: listCartReducer,
    listFollow: followReducer
  },
});

export default store;
