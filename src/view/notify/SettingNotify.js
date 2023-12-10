import {
  Text, View,
  ScrollView,
  Dimensions,StyleSheet,TouchableOpacity
} from 'react-native'
import React from 'react'
import HeaderTitleAccount from '../../component/header/HeaderTitleAccount';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export default function SettingNotify({}) {
  const navigation = useNavigation();
  
  // Trạng thái mặc định là tắt (false)
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [soundToggle, setSoundToggle] = useState(false);
  
  // Hàm xử lý khi người dùng nhấp vào nút toggle
  const handleToggleNotification = () => {
    setNotificationToggle(!notificationToggle); // Đảo ngược trạng thái
  };

  const handleToggleSound = () => {
    setSoundToggle(!soundToggle); // Đảo ngược trạng thái
  };

  return (
    <View style={{ flex: 1 , backgroundColor:'rgba(254, 246, 228, 0.5)' }}>
      <ScrollView style={{ height: '100%', width: '100%' }}>
           
        <HeaderTitleAccount 
          nav={navigation} titleHeader="Cài đặt" colorHeader='rgba(245, 130, 174, 1)'
        />

        <View style={localStyles.contentContainer}>
          <View style={localStyles.row}>
            <View style={localStyles.left}>
              <Feather name='bell' size={30} color={'#001858'} />
            </View>
            <View style={localStyles.center}>
              <Text
                style={{
                  color: '#001858',
                  fontFamily: 'ProductSans',
                  fontWeight: 'bold',
                  fontSize:15,
                }}
              >
                Bật/tắt thông báo
              </Text>
              <Text
                 style={{
                  color: '#001858',
                  fontFamily: 'ProductSans',

                  fontSize:13,
                }}
              >
                Cho phép gửi thông báo cho bạn ở ngoài thiết bị
              </Text>
            </View>
            <View style={localStyles.right}>
            <TouchableOpacity style={localStyles.right} onPress={handleToggleNotification}>
    <MaterialCommunityIcons
      name={notificationToggle ? 'toggle-switch-outline' : 'toggle-switch-off-outline'}
      size={30} color={'#001858'}
    />
  </TouchableOpacity>
            </View>
          </View>
          <View style={localStyles.row}>
            <View style={localStyles.left}>
            <Feather name='volume-2' size={30} color={'#001858'} />
            </View>
            <View style={localStyles.center}>
              <Text
                style={{
                  color: '#001858',
                  fontFamily: 'ProductSans',
                  fontWeight: 'bold',
                  fontSize:15,
                  marginLeft:-65,
                }}
              >
               Âm thanh thông báo PetWord
              </Text>
             
            </View>
            <View style={localStyles.right}>
            <TouchableOpacity style={localStyles.right} onPress={handleToggleSound}>
    <MaterialCommunityIcons
      name={soundToggle ? 'toggle-switch-outline' : 'toggle-switch-off-outline'}
      size={30} color={'#001858'}
    />
  </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </ScrollView>
    </View>
  )
}
const localStyles = StyleSheet.create({
  contentContainer: {
   
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding:10,
    backgroundColor:'#FEF6E4',
    borderRadius:10,
  },
  left: {
    flex: 1,
  },
  center: {
    
    
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
