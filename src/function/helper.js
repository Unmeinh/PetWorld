import {
  ACCESS_KEY_MOMO,
  PANENT_CODE_MOMO,
  SECRET_KEY_MOMO,
} from '../../env/env.config';
import sha256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require('crypto-js');

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
      moneyShip: ship,
    });
  });
  return result;
};

export const HansKeyPaymentMomo = (
  requestType,
  orderId,
  amount,
  orderInfo,
  requestId,
  extraData,
  notifyUrl,
  returnUrl,
) => {
  let key = '';
  var signature =
    'accessKey=' +ACCESS_KEY_MOMO +'&amount=' +amount +'&extraData=' +extraData +'&ipnUrl=' +notifyUrl +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&partnerCode=' +
    PANENT_CODE_MOMO +
    '&redirectUrl=' +
    returnUrl +
    '&requestId=' +
    requestId +
    '&requestType=' +
    requestType;
  var hash = CryptoJS.HmacSHA256(signature, SECRET_KEY_MOMO);
  key = CryptoJS.enc.Hex.stringify(hash);
  return key;
};
