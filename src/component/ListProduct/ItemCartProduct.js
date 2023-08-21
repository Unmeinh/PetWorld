import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {listShopSelector} from '../../redux/selector';
import {Image} from 'react-native-animatable';
import ItemListCart from '../shop/ItemListCart';
import {useDispatch} from 'react-redux';
import { selectItem } from '../../redux/reducers/shop/CartReduces';
export default function ItemCartProduct({result}) {
  const shops = useSelector(listShopSelector);
  const dispatch = useDispatch();
  const [isSelect, setIsSelect] = useState(false);
  const [shop, setShop] = useState([]);
  const iconSelect = isSelect
    ? 'checkbox-marked-circle'
    : 'checkbox-blank-circle-outline';
  useEffect(() => {
    const shopfind = shops.find(shop => shop.id === result.idShop);
    setShop(shopfind);
  }, [result]);
  return (
    <View>
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
        {shop.avatar ? (
          <Image source={shop.avatar} style={styles.image} />
        ) : null}

        <Text style={styles.nameShop}>{shop.nameShop}</Text>
        <Icon name="chevron-right" size={24} />
      </View>
      <FlatList
        data={result.products}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ItemListCart data={item} isSelect={isSelect} />
        )}
      />
    </View>
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
