import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import HeaderTitle from '../../component/header/HeaderTitle'
import FormAddress from '../../component/form/FormAddress'
import { useDispatch } from 'react-redux'
import { clearLocations } from '../../redux/reducers/shop/billSlice'

export default function AddNewAddress({navigation,route}) {
  const dispatch = useDispatch()
  useEffect(() =>{
    const sub = navigation.addListener('blur' ,() =>{
        dispatch(clearLocations())
    }) 
    return sub
  },[navigation])
  return (
    <View style={styles.container}>
    <HeaderTitle
        titleHeader={route.params.title}
        nav={navigation}
        colorHeader={'#FEF6E4'}
      />
    <FormAddress action={route.params.action} value={route.params}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEF6E4'
    }
})