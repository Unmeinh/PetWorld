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
export const addCartAction = cart => {
  return {
    type: 'cart/addCart',
    payload: cart,
  };
};

export const plusProductAction = id => {

  return {
    type: 'cart/plusProduct',
    payload: id,
  };
};
export const minusProductAction = id => {
  return {
    type: 'cart/minusProduct',
    payload: id,
  };
};

export const selectItemCart = product => {
  return {
    type: 'cart/selectItem',
    payload: product,
  }
}
