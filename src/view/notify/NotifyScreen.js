import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import HeaderNotify from '../../component/header/HeaderNotify';
import TabLayout from '../../component/tabLayout/tabMain/TabLayoutNotify';
import { useSelector, useDispatch } from 'react-redux';

export default function NotifyScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: 'rgba(254, 246, 228, 0.90)', flex: 1 }}>
      <HeaderNotify
        nav={navigation}
        titleHeader="Notify Screen"
        colorHeader="#FF0000"
      />
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
    marginBottom: 50
  },
});
