import {createSelector} from '@reduxjs/toolkit';
export const listPetSelector = state => state.listPet;
export const listProductSelector = state => state.listProduct;
export const searchFilterSelector = state => state.searchFilter.search;
export const selectFilterIdSelector = state => state.searchFilter.idCategory;
export const categorySelector = state => state.category;
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
export const filterAll = state => state.searchFilter.filterProduct
