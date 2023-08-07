import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CategoryItem from './CategoryItem';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import listfakeloader from '../../data/listfakeloader';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);
export default function CategoryList({data, isLoader}) {
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
  return (
    <View style={{marginTop: 16}}>
      {isLoader
        ? [
            <ShimerPlaceHolder
              shimmerColors={colorLoader}
              shimmerStyle={{borderRadius: 9,marginLeft:20}}
            />,
            <FlatList
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              data={listfakeloader}
              renderItem={({item}) => (
                <ShimerPlaceHolder
                  shimmerColors={colorLoader}
                  shimmerStyle={styles.loader}
                />
              )}
            />,
          ]
        : [
            <Text style={styles.title}>Sản phẩm chính</Text>,
            <FlatList
              horizontal
              scrollEnabled={false}
              keyExtractor={item => console.log(item.id)}
              data={data}
              renderItem={({item}) => <CategoryItem item={item} />}
            />,
          ]}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'ProductSansBold',
    fontSize: 20,
    color: '#001858',
    marginBottom: 16,
    marginLeft:20
  },
  loader: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft:20
    ,marginTop:20
  },
});
