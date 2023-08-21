import { useCallback } from "react";

export default (result,products) => {
  const groupProductsByShop = {};
  const listCartCallBack = useCallback(() => {
    result.forEach(result => {
      const {idProduct, amount} = result;
      const product = products.find(product => product.id === idProduct);
      if (product) {
        const idShop = product.idShop;
        if (!groupProductsByShop[idShop]) {
          groupProductsByShop[idShop] = {
            idShop: idShop,
            products: [],
          };
        }
        product.amount = amount;
        groupProductsByShop[idShop].products.push(product);
      }
    });
    return Object.values(groupProductsByShop);
  }, [result]);
  return listCartCallBack
};
