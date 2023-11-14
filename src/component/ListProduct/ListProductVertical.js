import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ItemProductVertical from './ItemProductVertical';
import {useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';

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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={loadMoreData}
      ListEmptyComponent={() => {
        return isLoadingMore || refreshing ? null : (
          <>
            <LottieView
              source={require('../../assets/imageEmpty.json')}
              autoPlay
              loop
              style={styles.container}
            />
          </>
        );
      }}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF6E4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:300,
    width:300
  },
});
