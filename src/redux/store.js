import { configureStore } from '@reduxjs/toolkit';
import listPetReducer from './reducers/pet/PetReducer';
import listProductReducer from './reducers/product/ProductReducer';
import categoryReducer from './reducers/category/category';
import listShopReducer from './reducers/shop/ShopReducer';
import blogReducer from './reducers/blog/blogReducer';
import commentReducer from './reducers/comment/commentReducer';
import listCartReducer from './reducers/shop/CartReduces';
import filterReducer from './reducers/filters/filtersReducer';
import userReducer from './reducers/user/userReducer';
import billSlice from './reducers/shop/billSlice';
import noticeReducer from './reducers/notice/NoticeReducer';


const store = configureStore({
  reducer: {
    listPet: listPetReducer,
    listProduct: listProductReducer,
    searchFilter: filterReducer,
    category: categoryReducer,
    listShop: listShopReducer,
    listBlog: blogReducer,
    listComment: commentReducer,
    listUser: userReducer,
    listCart: listCartReducer,
    bill: billSlice,
    noticeReducer: noticeReducer,
  },
});

export default store;