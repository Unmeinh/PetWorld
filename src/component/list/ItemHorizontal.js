import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchDetailProduct} from '../../redux/reducers/filters/filtersReducer';
import Animated from 'react-native-reanimated';

export default function ItemHorizontal({item,type,route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const rateShow = rate => {
    let result = [];
    if (rate) {
      for (let i = 0; i < rate; i++) {
        result.push(<Icon name="star" color="#FFC20F" size={12} />);
      }
    }
    return result;
  };
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
  return (
    <Pressable
      onPress={() => {
        dispatch(fetchDetailProduct({id:item._id,type}));
        navigation.push('DetailProduct',{type});
      }}
      style={{
        width: 110,
        height: 175,
        borderColor: '#F252AE',
        borderWidth: 1,
        marginLeft: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}>
      <Animated.Image
        source={
          item.arrProduct ? {uri: item.arrProduct[0]} : {uri: item.imagesPet[0]}
        }
        style={{
          width: '100%',
          height: 100,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        sharedTransitionTag={`detail_${item._id}`}
      />

      <View style={{marginLeft: 6, marginTop: 5}}>
        <View>
          <Text
            style={{
              fontFamily: 'ProductSansBold',
              fontSize: 14,
              color: '#001858',
            }}>
            {item.namePet ? item.namePet : item.nameProduct}
          </Text>
        </View>

        <Text style={{flexDirection: 'row'}}>{rateShow(item?.rate)}</Text>
        {priceDiscount(
          item.pricePet ? item.pricePet : item.priceProduct,
          item.discount,
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#F582AE',
    fontSize: 14,
  },
  discount: {
    fontFamily: 'ProductSans',
    marginLeft: 8,
    color: '#656565',
    textDecorationLine: 'line-through',
    fontSize: 10,
  },
});
