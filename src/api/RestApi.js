import {Get, Post} from './axios.config';

export const GetProducts = idPage =>
  Get({endPoint: `/product/list/all?page=${idPage}`});

export const GetPets = idPage =>
  Get({endPoint: `/pet/list/all?page=${idPage}`});

export const GetProductsByIdShop = id =>
  Get({endPoint: `/product/list/shop/${id}`});

export const GetPetByIdShop = id => Get({endPoint: `/pet/list/shop/${id}`});

export const InsertBill = data =>
  Post({endPoint: `/bill-product/insert`, data: data});
export const GetPayments = () => Get({endPoint: `/server/payments`});

export const GetBills = id =>
  Get({endPoint: `/bill-product/listBillProduct?idStatus=${id}`});

export const GetCart = () => Get({endPoint: `/cart`});

export const InsertProductToCart = data =>
  Post({endPoint: `/cart`, data: data});

export const UpdateCart = data => Post({endPoint: `/cart/update`, data: data});

export const GetShops = () => Get({endPoint: `/shop`});

export const GetDetailProduct = action =>
  Get({
    endPoint: `/${action.type === 0 ? 'pet' : 'product'}/detail/${action.id}`,
  });

export const SearchProduct = key => Get({endPoint: `/search/${key}`});

export const GetCategorys = () => Get({endPoint: `/category/list/all`});

export const ListProductByCategory = (id) =>
  Get({endPoint: `/category/list/product&pet/${id}`});
