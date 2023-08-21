import { useCallback } from "react";

const useCart = (results, products) => {
  const groupProductsByShop = {};

  const listCartCallBack = useCallback(() => {
    results.forEach(result => {
      const { idProduct, amount } = result;
      const product = products.find(product => product.id === idProduct);
      if (product) {
        const idShop = product.idShop;
        if (!groupProductsByShop[idShop]) {
          groupProductsByShop[idShop] = {
            idShop: idShop,
            products: [],
          };
        }
        const productWithAmount = { ...product, amount };
        groupProductsByShop[idShop].products.push(productWithAmount);
      }
    });

    return Object.values(groupProductsByShop);
  }, [results, products]);

  return listCartCallBack;
};

export default useCart;