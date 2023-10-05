import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  listCartSelector,
  listShopSelector,
  listCartStatusSelector,
  listShopStatusSelector,
} from '../../redux/selector';
import useCart from '../../hooks/useCart';
import ListCart from '../../component/list/ListCart';
import {
  fetchCart,
  selectAllItemCart,
  updateCart,
} from '../../redux/reducers/shop/CartReduces';
import {fetchShops} from '../../redux/reducers/shop/ShopReducer';
import {usePrice} from '../../hooks/usePrice';
import {addPrice} from '../../redux/reducers/shop/billSlice';
const {width} = Dimensions.get('screen');
export default function CartScreen({navigation}) {
  const dispatch = useDispatch();
  const result = useSelector(listCartSelector);
  const resultShops = useSelector(listShopSelector);
  const statusCart = useSelector(listCartStatusSelector);
  const statusShops = useSelector(listShopStatusSelector);
  const [selectedAll, setSelectedAll] = useState(checkSelected);
  const [total, discount] = usePrice(result);
  const resultCart = useCart(result, resultShops);

  function Bottom({total, discount, isSelectAll}) {
    const [isSelect, setIsSelect] = useState(isSelectAll);
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
              onPress={() => dispatch(selectAllItemCart())}
              disabled={statusCart === 'loading' ? true : false}
            />
          </Text>
          <Text style={[styles.fontFamyly, styles.textSelect]}>
            Chọn tất cả
          </Text>
        </View>
        <View style={styles.total}>
          <Text style={[styles.fontFamyly, styles.textTotal]}>
            {total.toLocaleString('vi-VN')} đ
          </Text>
          <Text style={[styles.fontFamyly, styles.textDiscont]}>
            Tiết kiệm {discount.toLocaleString('vi-VN')} đ
          </Text>
        </View>
        <Pressable
          style={styles.button}
          disabled={statusCart === 'loading' ? true : false}
          onPress={() => {
            dispatch(addPrice({priceTotal: total, discount: discount}));
            navigation.navigate('SummaryBill');
          }}>
          <Text style={[styles.fontFamyly, styles.textButton]}>Thanh toán</Text>
        </Pressable>
      </View>
    );
  }
  function checkSelected() {
    const isSelect = result.every(item => item.isSelected === true);
    return isSelect;
  }
  useEffect(() => {
    if (statusCart == 'idle') {
      dispatch(fetchCart());
    }
    dispatch(fetchShops());
  }, []);
  useEffect(() => {
    setSelectedAll(checkSelected());
  }, [result]);

  useEffect(() => {
    const subcriber = navigation.addListener('blur', () => {
      dispatch(updateCart(result));
    });
    return subcriber;
  }, [navigation, result]);
  return (
    <View style={{flex: 1, backgroundColor: '#FEF6E4'}}>
      <HeaderTitle
        titleHeader="Giỏ hàng"
        colorHeader={'#FEF6E4'}
        nav={navigation}
      />
      {(statusCart && statusShops) === 'loading' ? (
        <ActivityIndicator size={'large'} color={'#F582AE'} />
      ) : (
        <ListCart data={resultCart} />
      )}

      {resultCart?.length > 0 ? (
        <Bottom total={total} discount={discount} isSelectAll={selectedAll} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 6,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 16,
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
