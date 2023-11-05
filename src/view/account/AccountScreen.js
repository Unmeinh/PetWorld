import {
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';

import styles from '../../styles/temp.style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import HeaderAccount from '../../component/header/HeaderAccount';
import {useNavigation} from '@react-navigation/native';
import {storageMMKV} from '../../storage/storageMMKV';
import {useDispatch, useSelector} from 'react-redux';
import {getAllBillCount} from '../../redux/reducers/shop/billSlice';
import Loading from '../../component/Loading';

const listItems = [
  {
    iconType: 'Ionicons',
    icon: 'paw-outline',
    text: 'Thú cưng của tôi',
  },
  {
    iconType: 'AntDesign',
    icon: 'hearto',
    text: 'Đã thích',
  },
  {
    iconType: 'MaterialIcons',
    icon: 'create-new-folder',
    text: 'Đang theo dõi',
  },
  {
    iconType: 'Feather',
    icon: 'calendar',
    text: 'Đặt lịch của tôi',
  },
  {
    iconType: 'Feather',
    icon: 'headphones',
    text: 'Trợ giúp và yêu cầu hỗ trợ',
  },
];
const listItems1 = [
  {
    iconType: 'Fontisto',
    icon: 'person',
    text: 'Tài khoản',
  },
  {
    iconType: 'Feather',
    icon: 'lock',
    text: 'Quyền riêng tư',
  },
];

export default function AccountScreen({scrollRef, onScrollView}) {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const {countBill, status} = useSelector(state => state.bill);
  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      navigation.navigate('BillScreen');
    }, 200); // Reset the state after 200ms
  };

  function onLogout() {
    storageMMKV.setValue('login.token', 'null');
    storageMMKV.setValue('login.isLogin', false);
    if (
      !storageMMKV.getBoolean('login.isLogin') &&
      storageMMKV.getString('login.token') == 'null'
    ) {
      navigation.navigate('LoginScreen');
    } else {
    }
  }
  useEffect(() => {
    dispatch(getAllBillCount());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(254, 246, 228, 0.5)'}}>
      <ScrollView
        ref={scrollRef}
        onScroll={onScrollView}
        style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <HeaderAccount nav={navigation} />
          <View style={localStyles.Container}>
            <View style={localStyles.rowContainer}>
              <View style={localStyles.rowItem}>
                <TouchableOpacity>
                  <View style={localStyles.purchaseOrder}>
                    <Text
                      style={{
                        color: '#001858',
                        fontFamily: 'ProductSansBold',
                      }}>
                      Đơn mua
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={localStyles.rightContent}
                  onPress={handlePress}>
                  <Text
                    style={{
                      color: '#001858',
                      fontFamily: 'ProductSans',
                    }}>
                    Xem lịch sử mua hàng
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={30}
                    color={'#001858'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={localStyles.gridContainer}>
              <TouchableOpacity
                style={localStyles.gridColumn}
                onPress={() => {
                  navigation.navigate('BillScreen', {index: 0});
                }}>
                <MaterialIcons
                  name="hourglass-empty"
                  size={30}
                  color={'#001858'}
                />
                <Text
                  style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                  }}>
                  Chờ xác nhận
                </Text>
                {countBill['0'] ? (
                  <View style={localStyles.count}>
                    <Text style={localStyles.textCount}>{countBill['0']}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.gridColumn}
                onPress={() => {
                  navigation.navigate('BillScreen', {index: 1});
                }}>
                <Feather name="box" size={30} color={'#001858'} />
                <Text
                  style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                  }}>
                  Chờ lấy hàng
                </Text>
                {countBill['1'] ? (
                  <View style={localStyles.count}>
                    <Text style={localStyles.textCount}>{countBill['1']}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.gridColumn}
                onPress={() => {
                  navigation.navigate('BillScreen', {index: 2});
                }}>
                <Feather name="truck" size={30} color={'#001858'} />
                <Text
                  style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                  }}>
                  Đang giao
                </Text>
                {countBill['2'] ? (
                  <View style={localStyles.count}>
                    <Text style={localStyles.textCount}>{countBill['2']}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.gridColumn}
                onPress={() => {
                  navigation.navigate('BillScreen', {index: 3});
                }}>
                <Feather name="star" size={30} color={'#001858'} />
                <Text
                  style={{
                    color: '#001858',
                    fontFamily: 'ProductSans',
                  }}>
                  Đánh giá
                </Text>
                {countBill['3'] ? (
                  <View style={localStyles.count}>
                    <Text style={localStyles.textCount}>{countBill['3']}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>

          <View style={localStyles.Utilities}>
            <View style={localStyles.Utilities1}>
              <Text
                style={{
                  color: '#001858',
                  fontFamily: 'ProductSans',
                }}>
                Tiện ích
              </Text>
            </View>
            {listItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={localStyles.rowUtilities}
                onPress={() => {
                  // Handle the press event here
                  // Example: navigate to another screen
                  if (item.text === 'Thú cưng của tôi') {
                    navigation.navigate('MyPetScreen');
                  } else item.text === 'Đã thích';
                  {
                    navigation.navigate('Favorite'); // Handle other cases
                  }
                }}>
                <View style={localStyles.rowItemUtilities}>
                  {item.iconType === 'Fontisto' && (
                    <Fontisto name={item.icon} size={30} color={'#001858'} />
                  )}
                  {item.iconType === 'Ionicons' && (
                    <Ionicons name={item.icon} size={30} color={'#001858'} />
                  )}
                  {item.iconType === 'AntDesign' && (
                    <AntDesign name={item.icon} size={30} color={'#001858'} />
                  )}
                  {item.iconType === 'MaterialIcons' && (
                    <MaterialIcons
                      name={item.icon}
                      size={30}
                      color={'#001858'}
                    />
                  )}
                  {item.iconType === 'Feather' && (
                    <Feather name={item.icon} size={30} color={'#001858'} />
                  )}

                  <View style={localStyles.centerContentUtilities}>
                    <Text
                      style={{
                        color: '#001858',
                        fontFamily: 'ProductSans',
                      }}>
                      {item.text}
                    </Text>
                  </View>
                  <MaterialIcons
                    style={localStyles.rightContentUtilities}
                    name="navigate-next"
                    size={30}
                    color={'#001858'}
                  />
                </View>
              </TouchableOpacity>
            ))}
            <View style={localStyles.Utilities1}>
              <Text
                style={{
                  color: '#001858',
                  fontFamily: 'ProductSans',
                }}>
                Tài khoản và quyền riêng tư
              </Text>
            </View>
            {listItems1.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={localStyles.rowUtilities}
                onPress={() => {
                  // Handle the press event here
                  console.log('Item pressed:', item.text);
                  // Example: navigate to another screen
                  if (item.text === 'Tài khoản') {
                    navigation.navigate('InformationAccount');
                  }
                }}>
                <View style={localStyles.rowItemUtilities}>
                  {item.iconType === 'Fontisto' && (
                    <Fontisto name={item.icon} size={30} color={'#001858'} />
                  )}
                  {item.iconType === 'Ionicons' && (
                    <Ionicons name={item.icon} size={30} color={'#001858'} />
                  )}
                  {item.iconType === 'AntDesign' && (
                    <AntDesign name={item.icon} size={30} color={'#001858'} />
                  )}
                  {item.iconType === 'MaterialIcons' && (
                    <MaterialIcons
                      name={item.icon}
                      size={30}
                      color={'#001858'}
                    />
                  )}
                  {item.iconType === 'Feather' && (
                    <Feather name={item.icon} size={22.5} color={'#001858'} />
                  )}

                  <View style={localStyles.centerContentUtilities}>
                    <Text
                      style={{
                        color: '#001858',
                        fontFamily: 'ProductSans',
                      }}>
                      {item.text}
                    </Text>
                  </View>
                  <MaterialIcons
                    style={localStyles.rightContentUtilities}
                    name="navigate-next"
                    size={30}
                    color={'#001858'}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={localStyles.logoutContainer}>
          <View style={localStyles.logoutButton}>
            <MaterialIcons name="logout" size={30} color={'#001858'} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OrboadScreen');
              }}>
              <Text style={localStyles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {status ? <Loading /> : null}
    </View>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  rowContainer: {
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#F3D2C1',
    marginTop: 10,
  },
  rowItem: {
    backgroundColor: '#FEF6E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Optional, to evenly distribute content horizontally
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 160,
  },
  gridContainer: {
    backgroundColor: '#FEF6E4',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  Container: {
    flex: 1,
  },
  purchaseOrder: {
    paddingHorizontal: 15,
    color: '#001858',
  },
  gridColumn: {
    width: '25%', // 2 columns with a little space between
    alignItems: 'center',
    marginBottom: 15,
  },
  Utilities1: {
    backgroundColor: '#FEF6E4',
    paddingHorizontal: 15,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3D2C1',
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
    width: 300,
    fontFamily: 'ProductSansBlod',
    color: '#001858',
  },
  rightContentUtilities: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
    borderWidth: 1,

    borderColor: '#F3D2C1',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FEF6E4',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF6E4',
  },
  logoutButtonText: {
    marginLeft: 20,
    color: '#001858',

    fontFamily: 'ProductSansBlod',
    color: '#001858',
  },
  count: {
    backgroundColor: '#F582AE',
    padding: 2,
    position: 'absolute',
    borderRadius: 11,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    top: -10,
  },
  textCount: {fontSize: 11, fontFamily: 'ProductSans'},
});
