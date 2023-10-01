import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemProductVertical from './ItemProductVertical';
import { fetchDetailProduct } from '../../redux/reducers/filters/filtersReducer';
import { useDispatch } from 'react-redux';
export default function ListProductVertical({data,type}) {
  const dispatch = useDispatch();
  return (
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ItemProductVertical
            item={item}
            type={type}
            disPatchIdProduct={id => dispatch(fetchDetailProduct({id,type}))}
          />
        )}
      />

  );
}

const styles = StyleSheet.create({
  
});
