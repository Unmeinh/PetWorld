import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const rateShow = rate => {
  let result = [];
  if(rate){
    for (let i = 0; i < rate; i++) {
      console.log("Đã chạy vào đây2");
      result.push(<Icon name="star" color="#FFC20F" size={14} />);
    }
  }
  return result
};
export default function ItemPetHorizontal({item}) {
  return (
    <View
      style={{
        width: 100,
        height: 155,
        marginRight: 20,
        borderColor: '#F252AE',
        borderWidth: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}>
      <Image
        source={item.imagePet}
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
          {item.namePet}
        </Text>
        <Text style={{flexDirection:'row'}}>
        {rateShow(item.rate)}
        </Text>
        <Text style={{fontFamily:'ProductSansBold',color:'#F582AE',fontSize:14}}>{item.pricePet}đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
