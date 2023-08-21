import {configureStore} from '@reduxjs/toolkit';
import listPetReducer from './reducers/pet/PetReducer';
import listProductReducer from './reducers/product/ProductReducer';
import categoryReducer from './reducers/category/category';
import listShopReducer from './reducers/shop/ShopReducer';
import listBlogReducer from './reducers/blog/ListBlogReducer';
import listCommentReducer from './reducers/comment/ListCommentReducer';
import userReducer from './reducers/user/UserReducer';
import listCartReducer from './reducers/shop/CartReduces';
import  searchFilterReducer  from './reducers/filters/filtersReducer';

const store = configureStore({
  reducer: {
    listPet: listPetReducer,
    listProduct: listProductReducer,
    searchFilter:searchFilterReducer,
    category: categoryReducer,
    listShop: listShopReducer,
    listBlog: listBlogReducer,
    listComment: listCommentReducer,
    listUser: userReducer,
    listCart: listCartReducer,
  },
});
export default store
