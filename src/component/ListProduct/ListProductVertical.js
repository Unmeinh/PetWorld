import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import ItemProductVertical from './ItemProductVertical';
import {useDispatch} from 'react-redux';
export default function ListProductVertical({
  data,
  loadMoreData,
  isLoadingMore,
  refreshing,
  onRefresh,
}) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <ItemProductVertical item={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
      onEndReached={loadMoreData}

      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator
            size="large"
            color={'#F582AE'}
            style={{marginBottom: 10}}
          />
        ) : null
      }
      onEndReachedThreshold={0.1}
    />
  );
}

const styles = StyleSheet.create({});
