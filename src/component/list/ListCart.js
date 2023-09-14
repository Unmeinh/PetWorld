import {StyleSheet, Text, View,FlatList} from 'react-native';
import React from 'react';
import ItemCartProduct from '../ListProduct/ItemCartProduct';

 function ListCart({data}) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={({item}) => <ItemCartProduct result={item} />}
    />
  );
}
export default React.memo(ListCart)

