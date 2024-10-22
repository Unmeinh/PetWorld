import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import ItemHorizontal from './ItemHorizontal';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import listfakeloader from '../../data/listfakeloader';
import {useNavigation} from '@react-navigation/native';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
function ListHorizontal({data, title, isLoader, type}) {
  const navigation = useNavigation();
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
  return (
    <View style={{marginTop: 18}}>
      <View style={styles.title}>
        {isLoader === 'loading'
          ? <>
              <ShimmerPlaceHolder
                shimmerColors={colorLoader}
                shimmerStyle={styles.loaderText}
              />
              <ShimmerPlaceHolder
                shimmerColors={colorLoader}
                shimmerStyle={styles.loaderText}
              />
            </>
          : <>
              <Text style={styles.fontStyle}>{title}</Text>
              <Pressable
                onPress={() => navigation.navigate('ListProductScreen',{type})}>
                <Text style={styles.fontAll}>Xem thêm</Text>
              </Pressable>
              </>}
      </View>
      {isLoader === 'loading' ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listfakeloader}
          renderItem={() => (
            <ShimmerPlaceHolder
              shimmerColors={colorLoader}
              shimmerStyle={styles.loaderItem}
            />
          )}
        />
      ) : (
        <FlatList
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?._id?.toString()}
          data={data}
          renderItem={({item}) => <ItemHorizontal item={item} type={type} />}
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
export default React.memo(ListHorizontal);
