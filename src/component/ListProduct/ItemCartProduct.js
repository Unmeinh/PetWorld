import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {listShopSelector} from '../../redux/selector';
import {Image} from 'react-native-animatable';
import ItemListCart from '../shop/ItemListCart';
import {useDispatch} from 'react-redux';
import {selectItem} from '../../redux/reducers/shop/CartReduces';
export default function ItemCartProduct({result}) {
  const dispatch = useDispatch();
  const {idShop,cart} = result
  const [isSelect, setIsSelect] = useState(false);
  const iconSelect = isSelect
    ? 'checkbox-marked-circle'
    : 'checkbox-blank-circle-outline';
  return (
    <>
      <View style={styles.container}>
        <Icon
          name={iconSelect}
          size={24}
          color={'#F582AE'}
          onPress={() => {
            setIsSelect(!isSelect);
            dispatch(selectItem(result.products));
          }}
        />
        {idShop.avatarShop ? (
          <Image source={{uri:idShop.avatarShop}} style={styles.image} />
        ) : null}
        <Text style={styles.nameShop}>{idShop.nameShop}</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      {cart ? cart.map(product => (
        <ItemListCart data={product} key={product._id} isSelect={isSelect} />
      )) : null}
      
    </>
  );
}

const styles = StyleSheet.create({
  nameShop: {
    fontSize: 16,
    color: '#001858',
    fontFamily: 'ProductSansBold',
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 6,
  },
});
