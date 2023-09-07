import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemProductVertical from './ItemProductVertical';
import {useDispatch} from 'react-redux';
import { idProduct } from '../../redux/reducers/filters/FiltersReducer';
export default function ListProductVertical({data}) {
  const dispatch = useDispatch();
  return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ItemProductVertical
            item={item}
            disPatchIdProduct={id => dispatch(idProduct(id))}
          />
        )}
      />

  );
}

const styles = StyleSheet.create({});
