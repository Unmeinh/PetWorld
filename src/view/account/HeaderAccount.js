import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HeaderTitle({ nav, titleHeader, colorHeader }) {

  return (
    <View style={{
      backgroundColor: "#FEF6E4",
      padding: 20, flexDirection: 'row',
      paddingBottom: 15, marginBottom: 15,
      alignItems: 'center',
      shadowColor: "#FEF6E4",
      elevation: 5,
    }}>
      <TouchableOpacity onPress={() => { nav.goBack() }}>
        <AntDesign name='arrowleft' size={30} color={'#001858'} />
      </TouchableOpacity>
      
    </View>
  )
}