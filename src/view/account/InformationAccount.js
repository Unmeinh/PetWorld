import {
    Text, View,
    ScrollView,
    Dimensions,StyleSheet,TouchableOpacity
  } from 'react-native'
  import React from 'react'
  import styles from '../../styles/temp.style';
  import HeaderTitleAccount from '../../component/header/HeaderTitleAccount';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import { useNavigation } from '@react-navigation/native';
  const listItems = [
  
    {
      text: 'Thông tin tài khoản',
    },
    {
      text: 'Mật khẩu',
    },
    {
      text: 'Hủy kích hoạt hoặc xóa tài khoản',
    },
  ]
  
  export default function InformationAccount({ scrollRef, onScrollView }) {
    const navigation = useNavigation();
    return (
      <View style={{ flex: 1 , backgroundColor:'rgba(254, 246, 228, 0.5)' }}>
        <ScrollView ref={scrollRef}
          onScroll={onScrollView} style={{ height: '100%', width: '100%' }}>
             
               <HeaderTitleAccount 
               nav={navigation} titleHeader="Tài khoản" colorHeader="#FEF6E4" 
               />
                 <View style={localStyles.contentContainer}>
                 {listItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={localStyles.rowUtilities}
            onPress={() => {
              // Handle the press event here
              // Example: navigate to another screen
              if (item.text === 'Thông tin tài khoản') {
                navigation.navigate('Information');
            }else if(item.text === 'Mật khẩu') {
              navigation.navigate('PhoneVerification');
            }
          }}
          >

              <View style={localStyles.rowItemUtilities}>
              
                <View style={localStyles.centerContentUtilities}>
                  <Text     style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                  }}>{item.text}</Text>
                </View>
                <MaterialIcons
                  style={localStyles.rightContentUtilities}
                  name='navigate-next' size={30} color={'#001858'} />
              </View>
            </TouchableOpacity>
          ))}
              </View>
             
           
             
          
        </ScrollView>
      </View>
    )
  }
  const localStyles = StyleSheet.create({
    contentContainer:{
   backgroundColor:'rgba(254, 246, 228, 0.5)',
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
