import {StyleSheet, Text, View, FlatList, Pressable, Alert, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import Icon from 'react-native-vector-icons/Feather';
import {statusUserSelector, userLocation} from '../../redux/selector';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {userMessage} from '../../redux/selectors/userSelector';
import {editLocationSelect, editLocationUser, setMessageUser} from '../../redux/reducers/user/userReducer';
import {addLocationUser} from '../../redux/reducers/user/userReducer';
export default function ListAddress({navigation}) {
  const location = useSelector(userLocation);
  const status = useSelector(statusUserSelector);
  const message = useSelector(userMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    const subcriber = navigation.addListener('focus', () => {
      if (message) {
        dispatch(setMessageUser(''));
      }
    });
    return subcriber;
  }, [navigation]);
  const createTwoButtonAlert = (id) =>
    Alert.alert('Xác nhận', 'Bạn chắc chắc muốn đổi địa chỉ giao hàng', [
      {
        text: 'Hủy',
        
        style: 'cancel',
      },
      {text: 'Xác nhận', onPress: () => dispatch(editLocationSelect(id))},
    ]);
  return (
    <View style={styles.container}>
      <HeaderTitle
        titleHeader={'Địa chỉ của bạn'}
        nav={navigation}
        colorHeader={'#FEF6E4'}
      />
      <Pressable
        onPress={() =>
          navigation.navigate('AddNewAddress', {action: addLocationUser,title:'Thêm thông tin địa chỉ'})
        }
        style={styles.addNewAddress}>
        <Icon name="plus" color="#001858" size={24} />
        <Text style={styles.text}>Thêm địa chỉ mới</Text>
        <Icon name="chevron-right" size={24} color="#001858" />
      </Pressable>
      <FlatList
        data={location}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const iconSelect = item.isSelected
            ? 'checkbox-marked-circle'
            : 'checkbox-blank-circle-outline';
          return (
            <Pressable style={styles.list} onPress={()=>{
              createTwoButtonAlert(item._id)
            }}>
              <MaterialCommunityIcons
                name={iconSelect}
                size={24}
                color={'#F582AE'}
                // onPress={() => {
                //   setIsSelect(!isSelect);
                //   dispatch(selectAllItemsShop({idShop:idShop._id,isSelect}));
                // }}
              />
              <View style={{flexGrow: 1, marginLeft: 20}}>
                <Text style={[styles.fontFamily, styles.textName]}>
                  {item.fullName}
                </Text>
                <Text style={[styles.fontFamily]}>{item.phoneNumber}</Text>
                <Text style={[styles.fontFamily, styles.textLocation]}>
                  {item.location}
                </Text>
              </View>
              <Text
                style={[styles.fontFamily, styles.textEdit]}
                onPress={() =>
                  navigation.navigate('AddNewAddress', {
                    data: item,
                    action: editLocationUser,
                    title:'Sửa thông tin địa chỉ'
                  })
                }>
                Chỉnh sửa
              </Text>
            </Pressable>
          );
        }}
      />
      {status === 'loading' ? <View style={[StyleSheet.absoluteFillObject,{justifyContent:'center',alignItems:'center',zIndex:999}]}><ActivityIndicator size={'large'} color={'#F582AE'}/></View>:''}
    </View>
  );
}

const styles = StyleSheet.create({
  textEdit: {
    color: '#F582AE',
  },

  textLocation: {
    width: 200,
  },
  textName: {
    fontFamily: 'ProductSansBold',
  },
  fontFamily: {
    fontFamily: 'ProductSans',
    fontSize: 15,
    color: '#001858',
  },
  list: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: 'rgba(101, 101, 101,0.2)',
  },
  container: {
    flex: 1,
    backgroundColor: '#FEF6E4',
  },
  addNewAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: 'rgba(101, 101, 101,0.2)',
  },
  text: {
    fontFamily: 'ProductSans',
    color: '#001858',
    flexGrow: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});
