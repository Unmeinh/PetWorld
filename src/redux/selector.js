import {createSelector} from '@reduxjs/toolkit';
export const listPetSelector = state => state.listPet.pets;
export const listStatusPetsSelector = state => state.listPet.status;
export const listProductSelector = state => state.listProduct.products;
export const listStatusProductSelector = state => state.listProduct.status;
export const searchFilterSelector = state => state.searchFilter.search;
export const selectFilterIdSelector = state => state.searchFilter.idCategory;
export const selectFilterDetailProduct = state => state.searchFilter.detailProduct;
export const selectStatusDetailProduct = state => state.searchFilter.status;
export const categorySelector = state => state.category.categorys;
export const categoryStatusSelector = state => state.category.status;
export const categoryDataSelector = state => state.category.data;
export const listShopSelector = state => state.listShop.shops;
export const listShopStatusSelector = state => state.listShop.status;
export const listCartSelector = state => state.listCart.carts
export const listCartStatusSelector = state => state.listCart.status
export const statusAddProductToCart = state => state.listCart.statusAddProductoCart
export const messageCart = state => state.listCart.message
export const billSelector = state => state.bill
export const statusUserSelector = state => state.listUser.status
export const userLocation = state => state.listUser.data?.locationDelivery
export const listItemBill = createSelector(listCartSelector,(listcart) =>{
    return listcart.filter(item => item.isSelected === true)
})
export const useLocationSeleted = createSelector(userLocation,(location) =>{
  let user ={}
  let district = ''
  if(location){
     user = location.find(item => item.isSelected === true)
    if(user){
      const parts = user.location.split(', ')
      district = parts[parts.length - 1]
    }
  }
  return [user,district.trim()]
})
export const listFilterSelector = createSelector(
  listPetSelector,
  searchFilterSelector,
  listProductSelector,
  (listPet, search, listProduct) => {
    const list = [...listPet, ...listProduct];
    if (search === '') {
      return {};
    }
    return list.filter(list => {
      return (
        list.namePet?.toLowerCase().includes(search.toLowerCase()) ||
        list.nameProduct?.toLowerCase().includes(search.toLowerCase())
      );
    });
  },
);
export const categoryIdSelector = createSelector(
  listPetSelector,
  listProductSelector,
  selectFilterIdSelector,
  (pets, products, id) => {
    if (id === null || id === 1) {
      return pets;
    } else {
      return products;
    }
  },
);
export const filterAll = state => state.searchFilter.filterProduct;


