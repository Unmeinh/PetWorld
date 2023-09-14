import { configureStore } from '@reduxjs/toolkit';
import listPetReducer from './reducers/pet/PetReducer';
import listProductReducer from './reducers/product/ProductReducer';
import categoryReducer from './reducers/category/category';
import listShopReducer from './reducers/shop/ShopReducer';
import blogReducer from './reducers/blog/blogReducer';
import listCommentReducer from './reducers/comment/ListCommentReducer';
import listCartReducer from './reducers/shop/CartReduces';
import searchFilterReducer from './reducers/filters/filtersReducer';
import userReducer from './reducers/user/userReducer';
import tokenReducer from './reducers/user/tokenReducer';

const store = configureStore({
  reducer: {
    listPet: listPetReducer,
    listProduct: listProductReducer,
    searchFilter: searchFilterReducer,
    category: categoryReducer,
    listShop: listShopReducer,
    listBlog: blogReducer,
    listComment: listCommentReducer,
    listUser: userReducer,
    listCart: listCartReducer,
    otToken: tokenReducer
  },
});

export default store;
