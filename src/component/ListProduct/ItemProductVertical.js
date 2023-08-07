import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {selectFilterIdSelector} from '../../redux/selector';
export default function ItemProductVertical({item, navigation,disPatchIdProduct}) {
  const idCategory = useSelector(selectFilterIdSelector);
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <Text style={styles.price}>
          {(price-(price * discount) / 100).toLocaleString('vi-VN') + 'đ'}{' '}
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
  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor="#00185830"
        onPress={() => {
          disPatchIdProduct(item.id)
          navigation.navigate('DetailProduct')}}>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 14,
            marginBottom: 20,
            flexDirection: 'row',
          }}>
          <View>
            <Image
              source={idCategory === 1 ? item?.imagePet[0] : item?.imageProduct[0]}
              style={{width: 90, height: 90, borderRadius: 10}}
            />
          </View>
          <View style={{marginLeft: 12}}>
            {discountShow(item?.discount)}
            <Text
              style={{
                fontFamily: 'ProductSansBold',
                fontSize: 16,
                color: '#001858',
                marginTop: 6,
              }}>
              {idCategory === 1 ? item?.namePet : item?.nameProduct}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'ProductSans',
                  marginRight: 10,
                }}>
                20 phút
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: '#001858',
                  marginRight: 8,
                  borderRadius: 2,
                }}
              />
              <Text
                style={{
                  fontFamily: 'ProductSans',
                  marginRight: 10,
                }}>
                1.7 Km
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: '#001858',
                  marginRight: 8,
                  borderRadius: 2,
                }}
              />
              <Icon name="star" size={14} color="#FFC20F" />
              <Text style={{flexGrow: 1}}>{item?.rate}</Text>
            </View>
            <View>
              {priceDiscount(
                idCategory === 1 ? item?.pricePet : item?.priceProduct,
                item?.discount,
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
      <View
        style={{
          height: 1,
          backgroundColor: '#000000',
          opacity: 0.2,
          marginRight: 20,
          marginLeft: 20,
        }}
      />
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
