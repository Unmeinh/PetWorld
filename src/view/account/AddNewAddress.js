import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTitle from '../../component/header/HeaderTitle'
import { useNavigation } from '@react-navigation/native'
import FormAddress from '../../component/form/FormAddress'

export default function AddNewAddress() {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
    <HeaderTitle
        titleHeader={'Thêm địa chỉ mới'}
        nav={navigation}
        colorHeader={'#FEF6E4'}
      />
    <FormAddress/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEF6E4'
    }
})