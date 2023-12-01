import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';
export default function ItemProductVertical({item}) {
  const navigation = useNavigation();
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <SharedElement id={`item.${item.id}.price`}>
          <Text style={styles.price}>
            {(price - (price * discount) / 100).toLocaleString('vi-VN') + 'đ'}{' '}
            <Text style={styles.discount}>
              {price.toLocaleString('vi-VN') + 'đ'}
            </Text>
          </Text>
        </SharedElement>
      );
    } else {
      return (
        <SharedElement id={`item.${item.id}.price`}>
          <Text style={styles.price}>
            {price.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </SharedElement>
      );
    }
  };
  const discountShow = discount => {
    if (discount > 0) {
      return (
        <Text
          style={{
            fontFamily: 'ProductSansBold',
            fontSize: 12,
            color: '#F582AE',
          }}>
          Ưu đãi lên đến {discount}%
        </Text>
      );
    }
  };

  const getRated = rating => {
    const result = [];
    for (let index = 0; index < rating; index++) {
      result.push(
        <Icon
          key={index}
          name={index < rating ? 'star' : 'star-o'}
          size={15}
          color={index < rating ? '#FFD700' : '#D3D3D3'}
        />,
      );
    }
    return result;
  };
  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor="#00185830"
        onPress={() => {
          navigation.push('DetailProduct', {id: item._id, type: item.type});
        }}>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 14,
            marginBottom: 8,
            flexDirection: 'row',
          }}>
          <Image
            source={{
              uri: item.imagesPet ? item.imagesPet[0] : item.arrProduct[0],
            }}
            style={{width: 90, height: 90, borderRadius: 10}}
          />

          <View style={{marginLeft: 12}}>
            {discountShow(item?.discount)}

            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'ProductSansBold',
                fontSize: 16,
                color: '#001858',
                marginTop: 6,
              }}>
              {item?.namePet ? item?.namePet : item?.nameProduct}
            </Text>

            <View
              style={{
                flexDirection: 'row',
              }}>
              {getRated(item?.rate)}
            </View>
            <View>
              {priceDiscount(
                item.pricePet ? item.pricePet : item.priceProduct,
                item.discount,
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#001858',
  },
  discount: {
    fontFamily: 'ProductSans',
    marginLeft: 10,
    color: '#656565',
    textDecorationLine: 'line-through',
  },
});
