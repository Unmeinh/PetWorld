import {
    Text, View,
    ScrollView,
    Dimensions,StyleSheet
  } from 'react-native'
  import React from 'react'
  import styles from '../../styles/temp.style';
  import HeaderTitleAccount from '../../component/header/HeaderTitleAccount';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  const listItems = [
  
    {
      text: 'Thông tin tài khoản',
    },
    {
      text: 'Mật khẩu',
    },
  ]
  
  export default function Account({ scrollRef, onScrollView,navigation }) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView ref={scrollRef}
          onScroll={onScrollView} style={{ height: '100%', width: '100%' }}>
               <View style={localStyles.contentContainer}>

               </View>
               <HeaderTitleAccount 
               style={localStyles.boder}
               nav={navigation} titleHeader="Tài khoản" colorHeader="#FEF6E4" 
               />
              <View   style={localStyles.boder}>
              {listItems.map((item, index) => (
            <View style={localStyles.rowUtilities} key={index}>
              <View style={localStyles.rowItemUtilities}>
              
                <View style={localStyles.centerContentUtilities}>
                  <Text>{item.text}</Text>
                </View>
                <MaterialIcons
                  style={localStyles.rightContentUtilities}
                  name='navigate-next' size={30} color={'#001858'} />
              </View>
            </View>
          ))}
              </View>
          
        </ScrollView>
      </View>
    )
  }
  const localStyles = StyleSheet.create({
    contentContainer:{
      backgroundColor: 'rgba(254, 246, 228, 0.90)',
    },
    rowUtilities: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3D2C1',
      backgroundColor:'#FEF6E4',
     
  
    },
    boder:{
      borderBottomWidth: 1,
      borderBottomColor: '#F3D2C1',
      borderRadius:10,
      margin:10,
    },
  rowItemUtilities: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Optional, to evenly distribute content horizontally
  },
  centerContentUtilities: {
    marginLeft: 20,
    width:320,
  },
  
  });
