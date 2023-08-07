import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ItemHorizontal from './ItemHorizontal';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import listfakeloader from '../../data/listfakeloader';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);
export default function ListHorizontal({data, title, isLoader}) {
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
  console.log('Chạy vào đây');
  return (
    <View style={{marginTop: 18}}>
      <View style={styles.title}>
        {isLoader
          ? [
              <ShimerPlaceHolder
                shimmerColors={colorLoader}
                shimmerStyle={styles.loaderText}
              />,
              <ShimerPlaceHolder
                shimmerColors={colorLoader}
                shimmerStyle={styles.loaderText}
              />,
            ]
          : [
              <Text style={styles.fontStyle}>{title}</Text>,
              <Text style={styles.fontAll}>Xem tất cả</Text>,
            ]}
      </View>
      {isLoader ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listfakeloader}
          renderItem={() => (
            <ShimerPlaceHolder
              shimmerColors={colorLoader}
              shimmerStyle={styles.loaderItem}
            />
          )}
        />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <ItemHorizontal item={item} />}
          keyExtractor={({id}) => id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontStyle: {
    fontFamily: 'ProductSansBold',
    fontSize: 20,
    color: '#001858',
  },
  fontAll: {
    marginRight: 20,
    fontSize: 14,
    fontFamily: 'ProductSansBold',
    color: '#F252AE',
  },
  loaderText: {
    borderRadius: 8,
    width: 120,
    marginRight: 20,
  },
  loaderItem: {
    width: 100,
    height: 135,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 20,
  },
});
