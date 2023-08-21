import {StyleSheet, Text, View,FlatList} from 'react-native';
import React from 'react';
import ItemCartProduct from '../ListProduct/ItemCartProduct';

export default function ListCart({data}) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ItemCartProduct result={item} />}
    />
  );
}

