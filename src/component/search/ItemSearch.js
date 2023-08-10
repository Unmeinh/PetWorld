import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ItemSearch({item}) {  
  const name = item.namePet === undefined ? item?.nameProduct: item?.namePet
  return (
    <View>
      <TouchableOpacity>
      <Text
        style={{
          fontFamily: 'ProductSans',
          fontSize: 15,
          paddingTop: 10,
          paddingBottom: 10,
          color:'#001858'
        }}>
        {name}
      </Text>
    </TouchableOpacity>
    <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}}/>
    </View>
  );
}

const styles = StyleSheet.create({});
