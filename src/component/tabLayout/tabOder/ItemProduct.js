import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
export default function ItemProduct({data, callBack}) {
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <Text style={styles.price}>
          {(price - (price * discount) / 100)?.toLocaleString('vi-VN') + 'đ'}
          {'\n'}
          <Text style={styles.discount}>
            {price?.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.price}>{price?.toLocaleString('vi-VN') + 'đ'}</Text>
      );
    }
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (callBack) {
          callBack(data._id, 1);
        }
      }}>
      <Image
        source={{
          uri: data?.arrProduct[0],
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.nameProduct} numberOfLines={2}>
          {data?.nameProduct}
        </Text>
        <Text>{priceDiscount(data?.price, data?.discount)}</Text>
      </View>
      <View style={styles.boxCount}>
        <Text style={[styles.textMount]}>Số lượng :{data?.amount}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boxCount: {
    flexDirection: 'row',
    marginRight: 10,
    position: 'absolute',
    bottom: 6,
    right: 20,
  },
  textMount: {
    textAlign: 'center',
    fontFamily: 'ProductSansBold',
    color: '#001858',
  },
  icon: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9A9A9A',
    width: 22,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameProduct: {
    fontFamily: 'ProductSansBold',
    fontSize: 18,
    color: '#001858',
  },
  content: {
    height: '100%',
    flexGrow: 1,
    justifyContent: 'space-around',
    marginLeft: 10,
    paddingRight: 100,
  },
  container: {
    height: 80,
    marginLeft: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 4,
    marginLeft: 8,
  },
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#F582AE',
  },
  discount: {
    fontFamily: 'ProductSans',
    marginLeft: 10,
    color: '#656565',
    textDecorationLine: 'line-through',
  },
});
