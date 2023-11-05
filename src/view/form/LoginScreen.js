import {
  View
} from 'react-native';
import React, {useEffect, useState } from 'react';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { storageMMKV } from '../../storage/storageMMKV';

export default function LoginScreen() {
  const [selectedTab, setselectedTab] = useState(0);
  const [inputUsername, setinputUsername] = useState("");
  const requestNotificationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.NOTIFICATIONS);
      if (result === RESULTS.GRANTED) {
        console.log('Quyền truy cập thông báo đã được cấp.');
      } else {
        console.log('Quyền truy cập thông báo không được cấp.');
      }
    } catch (error) {
      console.error('Lỗi khi yêu cầu quyền truy cập thông báo:', error);
    }
  };
  
  
  requestNotificationPermission();
  const sendTokenToFirebase = async (newToken) => {
    try {
      const hasSentToken = storageMMKV.getBoolean('hasSentToken'); 
      if (!hasSentToken) { 
        const databaseRef = database().ref('/tokens');
        const tokenData = {
          token: newToken,
        };
        await databaseRef.push(tokenData);
        storageMMKV.setValue('hasSentToken', true); 
      }
    } catch (error) {
      console.error('Lỗi khi gửi token đến Firebase:', error);
    }
  };
  useEffect(() => {
    messaging()
    .getToken()
    .then(async (token) => {
      console.log('Device Token:', token);
      sendTokenToFirebase(token);
    })});
  function onCallBackChangeTab(userName) {
    setinputUsername(userName);
    if (selectedTab == 0) {
      setselectedTab(1);
    } else {
      setselectedTab(0);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {
        (selectedTab == 0)
          ? <LoginTab callback={onCallBackChangeTab} user={inputUsername} />
          : <RegisterTab callback={onCallBackChangeTab} user={inputUsername}/>
      }

    </View>
  );
}
