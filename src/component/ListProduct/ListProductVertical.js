import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemProductVertical from './ItemProductVertical';

export default function ListProductVertical({data}) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <ItemProductVertical item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
