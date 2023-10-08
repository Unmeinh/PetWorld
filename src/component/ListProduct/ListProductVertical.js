import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemProductVertical from './ItemProductVertical';
import {fetchDetailProduct} from '../../redux/reducers/filters/filtersReducer';
import {useDispatch} from 'react-redux';
export default function ListProductVertical({data,loadMoreData,isLoadingMore}) {
  const dispatch = useDispatch();
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <ItemProductVertical
          item={item}
        />
      )}
      onEndReached={loadMoreData}
      ListEmptyComponent={() => {
        return (
          <Text style={{textAlign: 'center', fontSize: 23, marginTop: 20}}>
            Không có sản phẩm nào thích hợp
          </Text>
        );
      }}
      ListFooterComponent={
        isLoadingMore ? <ActivityIndicator size="large" color={'#F582AE'} style={{marginBottom:10}}/> : null
      }
      onEndReachedThreshold={0.3}
    />
  );
}

const styles = StyleSheet.create({});
