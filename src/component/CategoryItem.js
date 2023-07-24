import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function CategoryItem({item}) {
  return (
    <View style={{marginRight: 20}}>
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
    </View>
  );
}
