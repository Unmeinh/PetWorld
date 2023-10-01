import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native-animatable';
import ItemListCart from '../shop/ItemListCart';
import {useDispatch} from 'react-redux';
import { selectAllItemsShop } from '../../redux/reducers/shop/CartReduces';
export default function ItemCartProduct({result}) {
  const dispatch = useDispatch();
  const {idShop,cart} = result
  const [isSelect, setIsSelect] = useState(selectedShop);
  const iconSelect = isSelect
    ? 'checkbox-marked-circle'
    : 'checkbox-blank-circle-outline';
  function selectedShop(){
    const isSelect = cart.every(item => item.isSelected === true);
    return isSelect
  }
  useEffect(() =>{
    setIsSelect(selectedShop())
  },[result])
  return (
    <>
      <View style={styles.container}>
        <Icon
          name={iconSelect}
          size={24}
          color={'#F582AE'}
          onPress={() => {
            setIsSelect(!isSelect);
            dispatch(selectAllItemsShop({idShop:idShop._id,isSelect}));
          }}
        />
        {idShop.avatarShop ? (
          <Image source={{uri:idShop.avatarShop}} style={styles.image} />
        ) : null}
        <Text style={styles.nameShop}>{idShop.nameShop}</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      {cart ? cart.map(product => (
        <ItemListCart data={product} key={product.idProduct._id} isSelect={product.isSelected} />
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
