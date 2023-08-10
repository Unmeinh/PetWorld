import {
    Text, View,
    ScrollView,
    Dimensions
  } from 'react-native'
  import React from 'react'
  import styles from '../../styles/temp.style';
  import HeaderTitle from '../notify/HeaderSetting';
  
  export default function SettingNotify(navigation) {
    return (
      <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
       <HeaderTitle nav={navigation} titleHeader="Notify Setting"/>
      </View>
    )
  }