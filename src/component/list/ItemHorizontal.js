import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {selectIdProductAction} from '../../redux/action';
import {SharedElement} from 'react-navigation-shared-element';
export default function ItemHorizontal({item}) {
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
        dispatch(selectIdProductAction(item.id));
        navigation.navigate('DetailProduct', {item});
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
      <SharedElement id={`item.${item.id}.image`}>
        <Image
          source={item.avatar}
          style={{
            width: '100%',
            height: 100,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </SharedElement>
      <View style={{marginLeft: 6, marginTop: 5}}>
        <SharedElement id={`item.${item.id}.name`}>
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
        </SharedElement>
        <SharedElement id={`item.${item.id}.rate`}>
          <Text style={{flexDirection: 'row'}}>{rateShow(item?.rate)}</Text>
        </SharedElement>

        <SharedElement id={`item.${item.id}.price`}>
          {priceDiscount(
            item.pricePet ? item.pricePet : item.priceProduct,
            item.discount,
          )}
        </SharedElement>
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
