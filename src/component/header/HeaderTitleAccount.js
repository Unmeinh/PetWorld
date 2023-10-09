import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function HeaderTitleAccount({ nav, titleHeader, colorHeader,goBack }) {

  return (
    <View style={{
      backgroundColor: String(colorHeader),
      padding: 20, flexDirection: 'row',
      paddingBottom: 15, marginBottom: 15,
      alignItems: 'center',
      shadowColor: "#000",
      elevation: 5,
    }}>
      <TouchableOpacity onPress={() =>{
        if(goBack){
          nav.pop(goBack)
        }else{
          nav.goBack()
        }
      }}>
        <AntDesign name='arrowleft' size={30} color={'#001858'} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, color: '#001858', fontFamily: 'ProductSans', fontWeight: 'bold', marginLeft: 20 ,borderBottomColor: '#F3D2C1',}}>
        {titleHeader}
      </Text>
    </View>
  )
}