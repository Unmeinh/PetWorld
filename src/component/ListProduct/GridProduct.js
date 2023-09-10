import React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {idProduct} from '../../redux/reducers/filters/filtersReducer';
function GridProduct({data}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <Text style={styles.price}>
          {(price - (price * discount) / 100).toLocaleString('vi-VN') + 'đ'}
          {'\n'}
          <Text style={styles.discount}>
            {price.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.price}>{price.toLocaleString('vi-VN') + 'đ'}</Text>
      );
    }
  };
  return (
    <FlatGrid
      itemDimension={130}
      data={data}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({item}) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            dispatch(idProduct(item.id));
            navigation.navigate('DetailProduct', {item});
          }}>
          <Image
            source={{
              uri: item.arrProduct
                ? item.arrProduct[0]
                : item.imagesPet[0],
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.itemName}>
              {item.namePet ? item.namePet : item.nameProduct}
            </Text>
            {priceDiscount(
              item.pricePet ? item.pricePet : item.priceProduct,
              item.discount,
            )}
          </View>
          <Text
            style={styles.sold}>
            Đã bán {item.quantitySold}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {padding: 3},
  image: {width: '100%', height: '70%',borderRadius:4},
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 4,
    height: 230,
    backgroundColor: '#f2f2eb',
  },
  itemName: {
    fontSize: 16,
    color: '#001858',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#F582AE',
    fontSize: 16,
  },
  discount: {
    fontFamily: 'ProductSans',
    marginLeft: 10,
    color: '#656565',
    textDecorationLine: 'line-through',
    fontSize: 13,
  },
  sold:{position: 'absolute', bottom: 7, right: 7, fontSize: 12,fontFamily:'ProductSans'}
});
export default React.memo(GridProduct);
