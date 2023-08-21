import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {listShopSelector} from '../../redux/selector';
import {Image} from 'react-native-animatable';
export default function ItemCartSummary({result}) {
  const shops = useSelector(listShopSelector);
  const [shop, setShop] = useState([]);
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
  useEffect(() => {
    const shopfind = shops.find(shop => shop.id === result.idShop);
    setShop(shopfind);
  }, [result]);
  return (
    <View>
      <View style={styles.container}>
      {shop.avatar ? <Image source={shop.avatar} style={styles.image} /> : null}
        <Text style={styles.nameShop}>{shop.nameShop}</Text>
      </View>
      <FlatList
        data={result.products}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.container2}>
              <Image
                source={item.avatar ? item.avatar : null}
                style={styles.imageItem}
              />
              <View style={styles.content}>
                <Text style={styles.nameProduct}>{item.nameProduct}</Text>
                <Text>{priceDiscount(item.priceProduct, item.discount)}</Text>
              </View>
              <View style={styles.boxCount}>
                <Text size={20} style={[styles.textMount]}>
                  Số lượng: {item.amount}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.discountOfShop}>
        <Text style={styles.styleDiscount}>Chiết khấu từ shop</Text>
        <Icon name="chevron-right" size={24} color={'#001858'} />
      </View>
      <View style={styles.discountOfShop}>
        <View style={{marginTop:10}}>
          <Text style={styles.styleDiscount}>Vận chuyển tiêu chuẩn</Text>
          <View style={styles.flexRow}>
          <Text>
            <Ionicons
              name="arrow-forward-circle-outline"
              size={16}
              color="#001858"
            />
          </Text>
          <Text style={styles.styleDiscount}>Từ Hà Nội</Text>
          </View>
          <View style={styles.flexRow}>
          <Text>
            <Ionicons
              name="time-outline"
              size={16}
              color="#001858"
            />
          </Text>
          <Text style={styles.styleDiscount}> Ngày giao hàng dự kiến: Jun 20 - Jul 22</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.price,{color:"#001858",fontSize:12}]}>30.000 đ</Text>
          <Text style={[styles.discount,{fontSize:12}]}>30.000 đ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow:{
    flexDirection:'row',
    alignItems:'center'
    ,marginTop:6
  },
  styleDiscount: {
    fontFamily: 'ProductSans',
    color: '#001858',
  },
  discountOfShop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  boxCount: {
    flexDirection: 'row',
    marginRight: 10,
  },
  textMount: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
  },
  icon: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9A9A9A',
    width: 22,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameProduct: {
    fontFamily: 'ProductSansBold',
    fontSize: 18,
    color: '#001858',
  },
  content: {
    height: '100%',
    flexGrow: 1,
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  container2: {
    height: 80,
    marginLeft: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  imageItem: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#F582AE',
  },
  discount: {
    fontFamily: 'ProductSans',
    
    color: '#656565',
    textDecorationLine: 'line-through',
  },
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
    marginTop:10
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 6,
  },
});
