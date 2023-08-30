import {StyleSheet, Text, View, FlatList,Pressable} from 'react-native';
import React from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const data = [
  {
    id: 1,
    name: 'Lương Việt Hoàng',
    phoneNumber: '08********32',
    location: 'Cầu diễn, Phú Diễn, Bắc từ Liêm, Hà Nội',
  },
  {
    id: 2,
    name: 'Lương Việt Hoàng',
    phoneNumber: '08********32',
    location: 'Cầu diễn, Phú Diễn, Bắc từ Liêm, Hà Nội',
  },
  {
    id: 3,
    name: 'Lương Việt Hoàng',
    phoneNumber: '08********32',
    location: 'Cầu diễn, Phú Diễn, Bắc từ Liêm, Hà Nội',
  },
];
export default function ListAddress() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <HeaderTitle
        titleHeader={'Địa chỉ của bạn'}
        nav={navigation}
        colorHeader={'#FEF6E4'}
      />
      <Pressable
      onPress={()=>navigation.navigate('AddNewAddress')}
       style={styles.addNewAddress}>
        <Icon name="plus" color="#001858" size={24} />
        <Text style={styles.text}>Thêm địa chỉ mới</Text>
        <Icon name="chevron-right" size={24} color="#001858" />
      </Pressable>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.list}>
              <View>
                <Text style={[styles.fontFamily, styles.textName]}>
                  {item.name}
                </Text>
                <Text style={[styles.fontFamily]}>{item.phoneNumber}</Text>
                <Text style={[styles.fontFamily, styles.textLocation]}>
                  {item.location}
                </Text>
              </View>
              <Text style={[styles.fontFamily, styles.textEdit]}>
                Chỉnh sửa
              </Text>
            </View>
          );
        }}
      />
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
