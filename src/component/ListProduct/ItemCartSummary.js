import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native-animatable';
import moment from 'moment';
import { setShip } from '../../redux/reducers/shop/billSlice';
import { useDispatch } from 'react-redux';
function ItemCartSummary({result,locationShop}) {
  const {idShop,cart} = result
  const [date,setDate] = useState(dateShip())
  const dispatch = useDispatch()
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <Text style={styles.price}>
          {(price - (price * discount) / 100)?.toLocaleString('vi-VN') + 'đ'}
          {'\n'}
          <Text style={styles.discount}>
            {price?.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.price}>{price?.toLocaleString('vi-VN') + 'đ'}</Text>
      );
    }
  };
  const district = (location) =>{
    let result = ''
    if(location){
      const parts = location.split(', ')
      result = parts[parts.length - 1]
    }
    return result.trim()
  }
  const showShip = () =>{
    const money = district(idShop.locationShop) == locationShop ? 10000 : 30000
    return money
  }
  function dateShip(){
    const step = 2;
    const gap = 2
    let currentDate = new Date()
    const dateFirst = currentDate.setDate(currentDate.getDate() + step)
    const dateLast = currentDate.setDate(currentDate.getDate() + gap)
    return {dateFirst:moment(dateFirst).format('DD/MM'), dateLast: moment(dateLast).format('DD/MM')}
  }
  return (
    <View>
      <View style={styles.container}>
      {idShop.avatarShop ? <Image source={{ uri:idShop.avatarShop}} style={styles.image} /> : null}
        <Text style={styles.nameShop}>{idShop.nameShop}</Text>
      </View>
      <FlatList
        data={cart}
        keyExtractor={item => item.idProduct._id}
        renderItem={({item}) => {
          const product = item.idProduct
          return (
            <View style={styles.container2}>
              <Image
                source={{uri:product.arrProduct[0] ? product.arrProduct[0] : product.imagePet[0]}}
                style={styles.imageItem}
              />
              <View style={styles.content}>
                <Text style={styles.nameProduct}>{product.nameProduct}</Text>
                <Text>{priceDiscount(product.priceProduct, product.discount)}</Text>
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
      {/* <View style={styles.discountOfShop}>
        <Text style={styles.styleDiscount}>Chiết khấu từ shop</Text>
        <Icon name="chevron-right" size={24} color={'#001858'} />
      </View> */}
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
          <Text style={styles.styleDiscount}>{district(idShop.locationShop)}</Text>
          </View>
          <View style={styles.flexRow}>
          <Text>
            <Ionicons
              name="time-outline"
              size={16}
              color="#001858"
            />
          </Text>
          <Text style={styles.styleDiscount}> Ngày giao hàng dự kiến: {date.dateFirst} - {date.dateLast}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.price,{color:"#001858",fontSize:12}]}>{showShip()?.toLocaleString('vi-VN')}đ</Text>
          <Text style={[styles.discount,{fontSize:12}]}></Text>
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
export default React.memo(ItemCartSummary)