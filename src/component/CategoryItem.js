import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import { selectIdCategoryAction } from '../redux/action';
export default function CategoryItem({item, navigation}) {
  const dispatch = useDispatch()
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(selectIdCategoryAction(item.id))
        navigation.navigate('ListProductScreen')
      }}
      style={{marginRight: 20}}>
      <View
        style={{
          width: 70,
          height: 70,
          backgroundColor: '#FFF6F6',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
        }}>
        <Image source={item.image} />
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'ProductSans',
            marginTop: 8,
            color: '#001858',
            fontSize: 13,
          }}>
          {item.nameCategory}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
