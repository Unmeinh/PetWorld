import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ItemHorizontal({item}) {
  const rateShow = rate => {
    let result = [];
    if (rate) {
      for (let i = 0; i < rate; i++) {
        result.push(<Icon name="star" color="#FFC20F" size={12} />);
      }
    }
    return result;
  };
  return (
    <View
      style={{
        width: 100,
        height: 155,
        borderColor: '#F252AE',
        borderWidth: 1,
        marginLeft: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}>
      <Image
        source={item.avatar}
        style={{
          width: '100%',
          height: 90,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <View style={{marginLeft: 10, marginTop: 5}}>
        <Text
          style={{
            fontFamily: 'ProductSansBold',
            fontSize: 14,
            color: '#001858',
          }}>
          {item.namePet ? item.namePet : item.nameProduct}
        </Text>
        <Text style={{flexDirection: 'row'}}>{rateShow(item?.rate)}</Text>
        <Text
          style={{
            fontFamily: 'ProductSansBold',
            color: '#F582AE',
            fontSize: 14,
          }}>
          {(item.pricePet ? item.pricePet : item.priceProduct).toLocaleString(
            'vi-VN',
          )}
          đ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
