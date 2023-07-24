import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HeaderTitle( route ) {

  return (
    <View style={{ backgroundColor: String(route.colorHeader), padding: 20, flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => {route.nav.goBack()}}>
        <AntDesign name='arrowleft' size={30} color={'#001858'} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, color: '#001858', fontFamily: 'ProductSans', fontWeight: 'bold', marginLeft: 20 }}>
        {route.titleHeader}
      </Text>
    </View>
  )
}