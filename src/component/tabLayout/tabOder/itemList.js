import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemProduct from './ItemProduct';
import ItemPet from './ItemPet';
export default function ItemList({item}) {
  const shop = item?.shopInfo[0];
  const type = item?.petInfo?.length > 0 ? 1 : 0;
  const getData = () => {
    if (item?.petInfo?.length > 0) {
      return item?.petInfo;
    } else {
      return item?.productInfo;
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Image source={{uri: shop?.avatarShop}} style={styles.image} />
        <Text style={styles.nameShop}>{shop?.nameShop}</Text>
        <Icon name="chevron-right" size={24} />
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
    </>
  );
}

const styles = StyleSheet.create({
  nameShop: {
    fontSize: 16,
    color: '#001858',
    fontFamily: 'ProductSansBold',
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 6,
  },
});
