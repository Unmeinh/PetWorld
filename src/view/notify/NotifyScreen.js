import {
  Text, View,
  ScrollView,
  Dimensions,
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import styles from '../../styles/temp.style';
import HeaderTitle from '../../component/header/HeaderTitle';
import HeaderNotify from '../notify/HeaderNotify'
import { Image } from 'react-native-animatable';
import TabLayout from './TabLayout';

export default function NotifyScreen(navigation ) {
  return (
    <View style={{ backgroundColor: 'rgba(254, 246, 228, 0.90)', flex: 1}}>
      <HeaderNotify nav={navigation} titleHeader="Notify Screen" colorHeader="#FF0000" />
      <TabLayout />
    </View>
  )
}
