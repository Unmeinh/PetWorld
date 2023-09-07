import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderNotify from '../../component/header/HeaderNotify';
import TabLayout from '../../component/tabLayout/tabMain/TabLayoutNotify';
import database from '@react-native-firebase/database';

export default function NotifyScreen({ navigation }) {
  const sendTokenToFirebase = async () => {
    try {
      const newToken = await messaging().getToken();
      if (newToken) {
        console.log(newToken, 'new token');

        // Store the new FCM token
        // await AsyncStorage.setItem('fcmtoken', newToken);

        // Send token data to Realtime Database
        const databaseRef = database().ref('/tokens');
        await databaseRef.push({ token: newToken });
        console.log('Token data sent to Realtime Database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const requestPermissionAndToken = async () => {
      try {
        // Request user permission for notifications
        const authStatus = await messaging().requestPermission();
        if (
          authStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
          authStatus !== messaging.AuthorizationStatus.PROVISIONAL
        ) {
          console.log('Authorization status not granted:', authStatus);
          return;
        }

        // Check if FCM token is already stored
        // const fcmtoken = await AsyncStorage.getItem('fcmtoken');
        // console.log(fcmtoken, 'old token');

        // if (!fcmtoken) {
        //   sendTokenToFirebase();
        // }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    requestPermissionAndToken();

    // Tự động gửi token lên Firebase sau mỗi 24 giờ (86400000 ms)
    const interval = setInterval(() => {
      sendTokenToFirebase();
    }, 86400000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={{ backgroundColor: 'rgba(254, 246, 228, 0.90)', flex: 1 }}>
      <HeaderNotify nav={navigation} titleHeader="Notify Screen" colorHeader="#FF0000" />
      <View style={styles.container}>
        <TabLayout />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -13,
  },
});
