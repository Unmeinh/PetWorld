import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemProduct from './ItemProduct';
import ItemPet from './ItemPet';
import {useNavigation} from '@react-navigation/native';
export default function ItemList({item}) {
  const navigation = useNavigation();
  const shop = item?.shopInfo[0];
  const type = item?.petInfo?.length > 0 ? 1 : 0;
  const getData = () => {
    if (item?.petInfo?.length > 0) {
      return item?.petInfo;
    } else {
      return item?.productInfo;
    }
  };
  const renderStatus = () => {
    if (item.deliveryStatus === 0) {
      return 'Chờ Xác nhận';
    } else if (item.deliveryStatus === 1) {
      return 'Đã Xác nhận';
    } else if (item.deliveryStatus === 2) {
      return 'Đang giao';
    } else if (item.deliveryStatus === 3) {
      return 'Giao hàng thành công';
    } else if (item.deliveryStatus === -1) {
      return 'Đã hủy';
    }
  };
  return (
    <TouchableOpacity
      style={styles.content}
      onPress={() => navigation.navigate('DetailBill', {item})}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: shop?.avatarShop}} style={styles.image} />
          <Text style={styles.nameShop}>{shop?.nameShop}</Text>
          <Icon name="chevron-right" size={24} />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'ProductSansBold',
            color: '#001858',
          }}>
          {renderStatus()}
        </Text>
      </View>
      <FlatList
        data={getData()}
        keyExtractor={item => item?._id}
        renderItem={({item}) => {
          if (type === 0) {
            return <ItemProduct data={item[0]} />;
          } else {
            return <ItemPet data={item} />;
          }
        }}
      />
      <View style={styles.item}>
        <Text style={styles.textTotal}>
          {getData()?.length} Mặt hàng:{' '}
          <Text style={styles.text2}>
            {item.total.toLocaleString('vi-VN')}đ
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    borderBottomColor: 'rgba(214, 214, 214,0.2)',
    borderBottomWidth: 10,
    padding: 10,
  },
  nameShop: {
    fontSize: 16,
    color: '#001858',
    fontFamily: 'ProductSansBold',
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 6,
  },
  item: {flex: 1, alignItems: 'flex-end'},
  textTotal: {fontFamily: 'ProductSans', fontSize: 16, color: '#001858'},
  text2: {fontFamily: 'ProductSansBold'},
});