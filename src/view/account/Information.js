import {
  Text, View,
  ScrollView,
  Dimensions, StyleSheet, TouchableOpacity
} from 'react-native'
import React , { useEffect }from 'react'
import styles from '../../styles/temp.style';
import HeaderTitleAccount from '../../component/header/HeaderTitleAccount';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserByID, userSelectStatus } from '../../redux/selectors/userSelector'; // Điều chỉnh đường dẫn theo đúng cấu trúc của dự án
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer';
const listItems = [

  {
    text: 'Hồ sơ của tôi',
  },
  {
    text: 'Tên người dùng',
    name: 'Vergil'
  },
  {
    text: 'Điện thoại',
    number: '*********320'
  },
  {
    text: 'Email',
    status: 'Chưa xác minh'
  },
  {
    text: 'Ngày sinh',
    status: 'Chưa xác minh'
  },
  {
    text: 'Địa chỉ',
    status: 'Chưa xác minh'
  },
]

export default function Information({ scrollRef, onScrollView }) {
  const navigation = useNavigation();
  const [birthDate, setBirthDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const infoLogin = useSelector(selectUserByID);
  const uSelectStatus = useSelector(userSelectStatus);

  useEffect(() => {
    if (uSelectStatus === "being idle") {
      console.log("infoLogin:", infoLogin);
      console.log("avatarUser:", infoLogin.avatarUser);
    }

  }, [uSelectStatus]);
  
  React.useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
        dispatch(fetchInfoLogin());
        // setisLoader(true);

        // return navigation.remove();
        return () => {
            unsub.remove();
        };
    });

    return unsub;
}, [navigation]);

const toggleModal = () => {
  setIsModalVisible(!isModalVisible);
};
const handleSaveBirthDate = (selectedDate) => {
  setBirthDate(selectedDate);
  setIsModalVisible(false);

  // Cập nhật trạng thái "chưa xác minh" thành ngày tháng năm sinh vừa nhập
  // Ví dụ: cập nhật listItems[4] trong mảng listItems
};
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(254, 246, 228, 0.5)' }}>
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
                console.log('Item pressed:', item.text);
                // Example: navigate to another screen
                if (item.text === 'Số điện thoại') {
                  navigation.navigate('NumberPhone');
                } else if (item.text === 'Mật khẩu') {
                  navigation.navigate('PhoneVerification');
                }else if (item.text === 'Email') {
                  navigation.navigate('Email');
                }else if (item.text === 'Ngày sinh') {
                  toggleModal(); ;
                }
              }}
            >

              <View style={localStyles.rowItemUtilities}>

                <View style={localStyles.centerContentUtilities}>
                  <Text style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                    width:100,
                  }}>{item.text}</Text>

                  {item.name && <Text
                  style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                    fontWeight: 'bold',
                  }}
                  >{infoLogin.fullName}</Text>}
                  {item.number && <Text
                  style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                  }}
                  >{infoLogin.phoneNumber}</Text>}
                  {item.status && <Text
                  style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                    color:'red',
                  }}
                  >{infoLogin.email}</Text>}
                </View>
                <View style={localStyles.rightContentUtilities}>
                 
                  <MaterialIcons
                    name='navigate-next' size={30} color={'#001858'} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>




      </ScrollView>
      
    </View>
  )
}
const localStyles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'rgba(254, 246, 228, 0.5)',
  },
  rowUtilities: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3D2C1',
    backgroundColor: '#FEF6E4',
  },

  rowItemUtilities: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Optional, to evenly distribute content horizontally
  },
  centerContentUtilities: {
    marginLeft: 20,
    width: 320,
    flexDirection: 'row',
    alignItems: 'center'
  },

});
