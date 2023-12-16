import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import axios from 'axios';
import {
  EXTRA_DATA_MOMO,
  NOTIFY_URL,
  PANENT_CODE_MOMO,
  RETURN_URL,
  SECRET_KEY_MOMO,
  URL_PAYMENT_MOMO,
} from '../../../env/env.config';
import Loading from '../../component/Loading';
import HeaderTitle from '../../component/header/HeaderTitle';
import {useDispatch} from 'react-redux';
import {setSuccessBill} from '../../redux/reducers/shop/billSlice';
var CryptoJS = require('crypto-js');

export default function MomoPayment({navigation, route}) {
  const dispatch = useDispatch();
  const {code, amount} = route.params;
  const date = new Date().getDate();
  var requestId = code;
  var orderId = date + code;
  var requestType = 'captureWallet';
  var orderInfo = 'Thanh toán qua ví MoMo';
  var autoCapture = false;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currrentUrl, setCurrrentUrl] = useState('');
  const handlePayment = async () => {
    setLoading(true);
    let key = '';
    let signature = `accessKey=klm05TvNBzhg7h7j&amount=${amount}&extraData=${EXTRA_DATA_MOMO}&ipnUrl=${NOTIFY_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${PANENT_CODE_MOMO}&redirectUrl=${RETURN_URL}&requestId=${requestId}&requestType=${requestType}`;
    var hash = CryptoJS.HmacSHA256(signature, SECRET_KEY_MOMO);
    key = CryptoJS.enc.Hex.stringify(hash);
    const instance = axios.create({
      baseURL: URL_PAYMENT_MOMO,
    });
    instance.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const result = await instance.post('/v2/gateway/api/create', {
      partnerCode: PANENT_CODE_MOMO,
      partnerName: 'Test',
      storeId: PANENT_CODE_MOMO,
      requestType: requestType,
      ipnUrl: NOTIFY_URL,
      redirectUrl: NOTIFY_URL,
      orderId: orderId,
      amount: amount,
      lang: 'vi',
      autoCapture: autoCapture,
      orderInfo: orderInfo,
      requestId: requestId,
      extraData: EXTRA_DATA_MOMO,
      signature: key,
    });
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    handlePayment();
  }, []);

  useEffect(() => {
    if (currrentUrl?.url === 'https://test-payment.momo.vn/v2/gateway/action') {
    } else if (currrentUrl?.url === `${NOTIFY_URL}account/login`) {
      dispatch(setSuccessBill(true));
      navigation.goBack();
    }
  }, [currrentUrl.url]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <WebView
          source={{uri: data?.payUrl}}
          style={{flex: 1}}
          startInLoadingState={true}
          onMessage={event => console.log(event)}
          renderLoading={() => <Loading />}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          onNavigationStateChange={navstate => setCurrrentUrl(navstate)}
          onLoadProgress={({nativeEvent}) => {
            if (nativeEvent.progress === 1) {
              setLoading(false);
            }
          }}
        />
      )}
    </>
  );
}
