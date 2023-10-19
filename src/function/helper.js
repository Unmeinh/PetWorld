const districtSlice = location => {
  let result = '';
  if (location) {
    const parts = location.split(',');
    result = parts[parts.length - 1];
  }
  return result.trim();
};
export const convertCart = (inputData, loacaionUser) => {
  const result = [];
  inputData.forEach(data => {
    const productItems = data.cart.map(item => ({
      idProduct: item.idProduct._id,
      amount: item.amount,
    }));
    const locationShop = districtSlice(data.idShop?.locationShop);
    let ship = 0;
    if (locationShop === loacaionUser) {
      ship = 10000;
    } else {
      ship = 30000;
    }
    result.push({
      idShop: data.idShop._id,
      items: productItems,
      moneyShip:ship
    });
  });
  return result;
};
