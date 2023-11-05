import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserByID, userSelectStatus } from '../../redux/selectors/userSelector'; // Điều chỉnh đường dẫn theo đúng cấu trúc của dự án
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer'; // Điều chỉnh đường dẫn theo đúng cấu trúc của dự án

export default function HeaderBlog() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
  

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftHeader}>
        <Image style={styles.avatarImage} source={infoLogin.avatarUser ? { uri: infoLogin.avatarUser } : require('../../assets/images/logoApp/logo.png')} />
      </View>
      <View style={styles.centerHeader}>
        <Text style={styles.nameAccount}>{infoLogin.fullName}</Text>
        <View style={styles.centerFlow}>
          <Text style={styles.textFlow}>Người theo dõi {infoLogin.followers}</Text>
          <Text style={styles.textFlow}> | </Text>
          <Text style={styles.textFlow}>Đang theo dõi {infoLogin.followings}</Text>
        </View>
        <Text style={styles.nameText}>Xem trang cá nhân</Text>
      </View>
      <View style={styles.rightHeader}>
        <Feather 
          style={styles.rightHeaderIcon}
          name='settings' size={24} color={'#001858'} />
        <Feather 
          style={styles.rightHeaderIconCart}
          name='shopping-cart' size={24} color={'#001858'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Xếp hàng ngang
    alignItems: 'center', // Canh giữa theo chiều dọc
    backgroundColor: '#F582AE',
    padding: 20,
  },
  centerHeader: {
    marginLeft: 10,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  centerFlow: {
    flexDirection: 'row', // Xếp hàng ngang
    alignItems: 'center',
  },
  rightHeader: {
    flexDirection: 'row', // Xếp hàng ngang
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: -30,
  },
  nameAccount: {
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
    fontSize: 20,
    color: '#001858',
  },
  nameText: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 15,
    color: '#001858',
  },
  textFlow: {
    marginLeft: 5,
    fontSize: 12,
    color: '#001858',
  },
  rightHeaderIcon: {},
  rightHeaderIconCart: {
    marginLeft: 10,
  },
});
