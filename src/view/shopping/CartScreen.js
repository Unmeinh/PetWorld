import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  listCartSelector,
  listProductSelector,
  listShopSelector,
} from '../../redux/selector';
import useCart from '../../hooks/useCart';
import ListCart from '../../component/list/ListCart';
const {width} = Dimensions.get('screen');
export default function CartScreen({navigation}) {
  const result = useSelector(listCartSelector);
  const products = useSelector(listProductSelector);
  const resultCart = useCart(result,products)

  function Bottom() {
    const [isSelect, setIsSelect] = useState(() => false);
    const iconSelect = isSelect
      ? 'checkbox-marked-circle'
      : 'checkbox-blank-circle-outline';
    return (
      <View style={styles.bottom}>
        <View style={styles.select}>
          <Text>
            <Icon
              name={iconSelect}
              size={24}
              color="#F582AE"
              onPress={() => setIsSelect(!isSelect)}
            />
          </Text>
          <Text style={[styles.fontFamyly, styles.textSelect]}>
            Chọn tất cả
          </Text>
        </View>
        <View style={styles.total}>
          <Text style={[styles.fontFamyly, styles.textTotal]}>22.222.222đ</Text>
          <Text style={[styles.fontFamyly, styles.textDiscont]}>
            Tiết kiệm 222.222đ
          </Text>
        </View>
        <Pressable style={styles.button} onPress={()=>navigation.navigate('SummaryBill')}>
          <Text style={[styles.fontFamyly,styles.textButton]}>Thanh toán (3)</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#FEF6E4'}}>
      <HeaderTitle
        titleHeader="Giỏ hàng"
        colorHeader={'#FEF6E4'}
        nav={navigation}
      />

      <ListCart data={resultCart()}/>
      <Bottom />
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
  textButton:{
    color:'#FFFFFF'
    ,fontSize:16
  },
  button: {
    width: 130,
    height: 40,
    backgroundColor: '#F582AE',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDiscont: {
    color: '#F582AE',
    fontSize: 14,
  },
  textTotal: {
    fontSize: 16,
    color: '#001858',
  },
  total: {
    flexGrow: 1,
    alignItems: 'flex-end',
    marginRight: 8,
  },
  textSelect: {
    fontSize: 14,
    marginLeft: 6,
  },
  select: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  fontFamyly: {
    fontFamily: 'ProductSansBold',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: width,
    borderTopWidth: 0.8,
    borderTopColor: '#BFB9B9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEF6E4',
  },
});
