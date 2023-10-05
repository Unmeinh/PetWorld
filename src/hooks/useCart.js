import {useCallback} from 'react';

const useCart = (cart, shops, user) => {
  if (cart || shops) {
    const groupProductsByShop = {};
      cart.forEach(result => {
        const {idProduct, amount,isSelected} = result;
        const shop = shops.find(shop => shop._id === idProduct.idShop);
        if (shop) {
          const idShop = shop._id;
          if (!groupProductsByShop[idShop]) {
            groupProductsByShop[idShop] = {
              idShop: shop,
              cart: [],
            };
          }
          const productWithAmount = {idProduct, amount,isSelected};
          groupProductsByShop[idShop].cart.push(productWithAmount);
        }
      });
      return Object.values(groupProductsByShop);
  }
};

export default useCart;
