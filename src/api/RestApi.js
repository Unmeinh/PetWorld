import {Get, Post} from './axios.config';

export const GetProducts = idPage =>
  Get({endPoint: `/product/list/all?page=${idPage}`});

export const GetProductsMulti = (idPage, sort) =>
  Get({
    endPoint: `/product/list/all?page=${idPage}${sort ? '&' + sort : ''}`,
  });

export const GetPets = (idPage, sort) =>
  Get({endPoint: `/pet/list/all?page=${idPage}${sort ? '&' + sort : ''}`});

export const GetProductsByIdShop = id =>
  Get({endPoint: `/product/list/shop/${id}`});

export const GetPetByIdShop = id => Get({endPoint: `/pet/list/shop/${id}`});

export const InsertBill = data =>
  Post({endPoint: `/bill-product/insert`, data: data});
export const GetPayments = () => Get({endPoint: `/server/payments`});

export const GetBills = (id, statusReview) =>
  Get({
    endPoint: `/bill-product/listBillProduct?idStatus=${id}${
      typeof statusReview !== 'undefined' ? `&review=${statusReview}` : ''
    }`,
  });

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

export const ListProductByCategory = (id, page, sort) =>
  Get({
    endPoint: `/category/list/category/all/${id}?page=${page}${
      sort ? `&sortBy=${sort}` : ''
    }`,
  });

export const GetCountAllBill = () => Get({endPoint: `bill-product/getCount`});

export const AddLocationUser = action =>
  Post({endPoint: `/cart/addLocations`, data: action});

export const GetDetailUser = () => Get({endPoint: `/user/myDetail`});
export const EditLocationSelect = action =>
  Post({endPoint: `/cart/editLocations/${action}`});

export const EditLocationUser = action =>
  Post({endPoint: `/cart/editLocation`, data: action});

export const CancelBill = params =>
  Get({endPoint: `/bill-product/cancelBill/${params}`});

export const GetAllNotice = (status, page) =>
  Get({endPoint: `notice/list/all/${status}?page=${page}`});

export const GetAllFavorite = () => Get({endPoint: `favorite/list`});
export const AddFavorite = id => Post({endPoint: `favorite/insert`, data: id});
export const DeleteFavorite = id =>
  Post({endPoint: `favorite/delete`, data: id});

export const GetDetailShop = id => Get({endPoint: `/shop/detail/${id}`});

export const SeachProductForShop = (idShop, keyWords) =>
  Get({endPoint: `/search/shop/${keyWords}?idShop=${idShop}`});

export const GetListBanner = () => Get({endPoint: `/server/listBanner`});
export const CreateRating = (data, header, idBill) =>
  Post({endPoint: `/review/insert/${idBill}`, data: data, header: header});
export const GetRating = (id, page = 1) =>
  Get({endPoint: `/review/list/product/${id}?page=${page}`});

export const ConfirmBill = id =>
  Get({endPoint: `/bill-product/comfirmBill/${id}`});
