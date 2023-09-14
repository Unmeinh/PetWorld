import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {minusProduct, plusProduct} from '../../redux/reducers/shop/CartReduces';
export default function ItemListCart({data, isSelect}) {
  const dispatch = useDispatch();
  const product = data.idProduct
  const [selectChild, setSelectChild] = useState(isSelect);
  const iconSelect = selectChild
    ? 'checkbox-marked-circle'
    : 'checkbox-blank-circle-outline';
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <Text style={styles.price}>
          {(price - (price * discount) / 100).toLocaleString('vi-VN') + 'đ'}
          {'\n'}
          <Text style={styles.discount}>
            {price.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.price}>{price.toLocaleString('vi-VN') + 'đ'}</Text>
      );
    }
  };
  useEffect(() => {
    setSelectChild(isSelect);
  }, [isSelect]);
  return (
    <View style={styles.container}>
      <Icon
        name={iconSelect}
        size={24}
        color={'#F582AE'}
        onPress={() => setSelectChild(!selectChild)}
      />
      <Image source={{uri:product?.arrProduct[0]}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.nameProduct}>{product.nameProduct}</Text>
        <Text>{priceDiscount(product.priceProduct, product.discount)}</Text>
      </View>
      <View style={styles.boxCount}>
        <View style={styles.icon}>
          <Text>
            <Icon
              name="minus"
              size={16}
              color={'#001858'}
              onPress={() => dispatch(minusProduct(product.id))}
            />
          </Text>
        </View>
        <Text size={20} style={[styles.textMount]}>
          {data.amount}
        </Text>
        <View style={styles.icon}>
          <Text>
            <Icon
              name="plus"
              size={16}
              color={'#001858'}
              onPress={() => dispatch(plusProduct(product.id))}
            />
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxCount: {
    flexDirection: 'row',
    marginRight: 10,
  },
  textMount: {
    width: 22,
    height: 23,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#9A9A9A',
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
    marginLeft:8
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
