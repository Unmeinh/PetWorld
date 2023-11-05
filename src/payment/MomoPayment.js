import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import axios from 'axios';
import {
  EXTRA_DATA_MOMO,
  NOTIFY_URL,
  PANENT_CODE_MOMO,
  RETURN_URL,
  URL_PAYMENT_MOMO,
} from '../../env/env.config';
import {HansKeyPaymentMomo} from '../function/helper';

export default function MomoPayment() {
  var date = new Date().getTime();
  var requestId = date + 'id';
  var orderId = date + ':0123456778';
  var requestType = 'captureWallet';
  var orderInfo = 'Thanh toán qua ví MoMo';
  var autoCapture = true;
  const amount = 100000;

  const handlePayment = async () => {
    const result = await axios.post(URL_PAYMENT_MOMO, {
      partnerCode: PANENT_CODE_MOMO,
      partnerName: 'Test',
      storeId: PANENT_CODE_MOMO,
      requestType: requestType,
      ipnUrl: NOTIFY_URL,
      redirectUrl: RETURN_URL,
      orderId: orderId,
      amount: amount,
      lang: 'vi',
      autoCapture: autoCapture,
      orderInfo: orderInfo,
      requestId: requestId,
      extraData: EXTRA_DATA_MOMO,
      signature: HansKeyPaymentMomo({
        amount: amount,
        extraData: EXTRA_DATA_MOMO,
        notifyUrl: NOTIFY_URL,
        orderId: orderId,
        orderInfo: orderInfo,
        requestId: requestId,
        requestType: requestType,
        returnUrl: RETURN_URL,
      }),
    });
  };

  useEffect(() => {
    handlePayment();
  }, []);
  return (
    <WebView source={{uri: 'https://reactnative.dev/'}} style={{flex: 1}} />
  );
}

const styles = StyleSheet.create({});
