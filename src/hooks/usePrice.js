import {useMemo} from 'react';

export const usePrice = cart => {
  const data = useMemo(() => {
    let total = 0;
    let discount = 0;
    if (cart) {
      cart.forEach(item => {
        if (item.isSelected === true) {
          const price = item.idProduct.priceProduct;
          const discountProduct = item.idProduct.discount;
          total += price*item.amount;
          discount += (price - (price * discountProduct) / 100) * item.amount;
        }
      });
    }
    return [total, discount];
  },[cart]);
  return data;
};
