export const searchFilterAction = text => {
  return {
    type: 'filter/searchFilterChanged',
    payload: text,
  };
};
export const selectIdCategoryAction = id => {
  return {
    type: "filter/selectIdCategory",
    payload: id,
  };
};
export const selectIdProductAction = id => {
  return {
    type: 'filter/idProduct',
    payload: id,
  };
};