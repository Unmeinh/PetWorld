import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import axios from 'axios';
import {
  ZALOPAY_APP_ID,
  ZALOPAY_BANK_CODE,
  ZALOPAY_URL,
} from '../../../env/env.config';
import Loading from '../../component/Loading';
import {useDispatch} from 'react-redux';
import {setSuccessBill} from '../../redux/reducers/shop/billSlice';
const CryptoJS = require('crypto-js');

export default function MomoPayment({navigation, route}) {
  const dispatch = useDispatch();
  const {code, amount, content} = route.params;
  const date = new Date();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currrentUrl, setCurrrentUrl] = useState('');
  const appUser = content;

  const embedData = '{"promotioninfo":"","merchantinfo":"embeddata123"}';
  const item =
    '[{"itemid":"knb","itemname":"kim nguyen bao","itemprice":198400,"itemquantity":1}]';
  const time = date.getTime();

  const keyOriginal = 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL';
  const handlePayment = async () => {
    setLoading(true);

    const apptranid = `${
      date.getFullYear().toString().substr(2, 2) +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2)
    }_${code}`;
    const description = `Demo &#45; Thanh toan don hang &#35;&#60;ORDERID&#62;`;
    let mac = `${ZALOPAY_APP_ID}|${apptranid}|${appUser}|${amount}|${time}|${embedData}|${item}`;
    let hash = CryptoJS.HmacSHA256(mac, keyOriginal);
    let key = CryptoJS.enc.Hex.stringify(hash);

    const instance = axios.create({
      baseURL: ZALOPAY_URL,
    });
    instance.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = `app_id=2553&app_trans_id=${apptranid}&app_user=${appUser}&app_time=${time}&embed_data=${embedData}&item=${item}&amount=${amount}&mac=${key}&description=${description}&bank_code=${ZALOPAY_BANK_CODE}&callback_url=http://10.0.2.2:3000/api`;
    const result = await instance.post(`/v2/create?${params}`);
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    handlePayment();
  }, []);

  useEffect(() => {
    const status = currrentUrl?.url?.split('&status=');
    if (status?.length === 2) {
      if (status[1] === '1') {
        dispatch(setSuccessBill(true));
        navigation.goBack();
      } else {
        dispatch(setSuccessBill(false));
        navigation.goBack();
      }
    }
  }, [currrentUrl.url]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <WebView
          source={{uri: data?.order_url}}
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
