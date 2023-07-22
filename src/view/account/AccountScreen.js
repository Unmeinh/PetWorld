import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from '../../styles/temp.style';

export default function AccountScreen() {
  return (
    <View style={{backgroundColor: '#FEF6E4', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 50, color: '#001858', fontFamily: 'ProductSans'}}>Account</Text>
    </View>
  )
}