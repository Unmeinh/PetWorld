import {createSelector} from '@reduxjs/toolkit';
export const listPetSelector = state => state.listPet;
export const listProductSelector = state => state.listProduct;
export const searchFilterSelector = state => state.searchFilter.search;
export const selectFilterIdSelector = state => state.searchFilter.idCategory;
export const selectFilterIdProduct = state => state.searchFilter.idProduct;
export const categorySelector = state => state.category;
export const listShopSelector = state => state.listShop;
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

export const productSelector = createSelector(
  selectFilterIdProduct,
  listPetSelector,
  listProductSelector,
  (id, pets, products) => {
    const list = [...pets, ...products];
    return list.find(p => p.id === id);
  },
);

export const shopOftheProductSelector = createSelector(
  listShopSelector,
  productSelector,
  (shops, idProduct) => {
    if (idProduct !== 'undefined') {
      return shops.find(p => p.id === idProduct.idShop);
    }
  },
);
