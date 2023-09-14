import {useCallback} from 'react';

const useCart = (cart, shops) => {
  if (cart || shops) {
    const groupProductsByShop = {};
    const listCartCallBack = useCallback(() => {
      cart.forEach(result => {
        const {idProduct, amount} = result;
        const shop = shops.find(shop => shop._id === idProduct.idShop);
        if (shop) {
          const idShop = shop._id;
          if (!groupProductsByShop[idShop]) {
            groupProductsByShop[idShop] = {
              idShop: shop,
              cart: [],
            };
          }
          const productWithAmount = {idProduct, amount};
          groupProductsByShop[idShop].cart.push(productWithAmount);
        }
      });

      return Object.values(groupProductsByShop);
    }, [cart, shops]);

    return listCartCallBack();
  }
};

export default useCart;
