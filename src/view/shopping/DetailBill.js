import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import UserTag from '../../component/shop/UserTag';
import {FlatList} from 'react-native-gesture-handler';
import ItemProduct from '../../component/tabLayout/tabOder/ItemProduct';
import ItemPet from '../../component/tabLayout/tabOder/ItemPet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {cancelBill} from '../../redux/reducers/shop/billSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../component/Loading';
import {billSelector} from '../../redux/selector';
export default function DetailBill({route, navigation}) {
  const {status} = useSelector(billSelector);

  const item = route.params?.item;
  const shop = item?.shopInfo[0];
  const type = item?.petInfo?.length > 0 ? 1 : 0;
  const dispatch = useDispatch();
  const getData = () => {
    if (item?.petInfo?.length > 0) {
      return item?.petInfo;
    } else {
      return item?.productInfo;
    }
  };

  const renderStatus = () => {
    if (item.deliveryStatus === 0) {
      return 'Chờ Xác nhận';
    } else if (item.deliveryStatus === 1) {
      return 'Đã Xác nhận';
    } else if (item.deliveryStatus === 2) {
      return 'Đang giao';
    } else if (item.deliveryStatus === 3) {
      return 'Giao hàng thành công';
    } else if (item.deliveryStatus === -1) {
      return 'Đã hủy';
    }
  };

  const renderListProduct = () => (
    <View style={styles.content}>
      <View style={styles.container2}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: shop?.avatarShop}} style={styles.image} />
          <Text style={styles.nameShop}>{shop?.nameShop}</Text>
          <Icon name="chevron-right" size={24} />
        </View>
      </View>
      <FlatList
        data={getData()}
        scrollEnabled={false}
        keyExtractor={item => item?._id}
        renderItem={({item}) => {
          if (type === 0) {
            return (
              <ItemProduct
                data={item[0]}
                callBack={(id, type) =>
                  navigation.push('DetailProduct', {
                    id: id,
                    type: type,
                  })
                }
              />
            );
          } else {
            return (
              <ItemPet
                data={item}
                callBack={(id, type) =>
                  navigation.push('DetailProduct', {
                    id: id,
                    type: type,
                  })
                }
              />
            );
          }
        }}
      />
    </View>
  );

  const renderTotal = () => (
    <>
      <View style={styles.p10}>
        <Text style={styles.textBold}>Tóm tắt đơn hàng</Text>
        <View style={styles.flexRow}>
          <Text style={styles.textDefault}>Tổng phụ</Text>
          <Text style={styles.textDefault}>
            {(item?.discountBill + item?.total).toLocaleString('vi-VN')}đ
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.textDefault}>Vận chuyển</Text>
          <Text style={styles.textDefault}>
            {item?.moneyShip.toLocaleString('vi-VN')}đ
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={[styles.textDefault, styles.textdiscount]}>
            Tiết kiệm
          </Text>
          <Text style={[styles.textDefault, styles.textdiscount]}>
            {item?.discountBill.toLocaleString('vi-VN')}đ
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.textDefault}>Tổng</Text>
          <Text style={styles.bold}>
            {(item?.moneyShip + item?.total).toLocaleString('vi-VN')}đ
          </Text>
        </View>
      </View>
      <View style={styles.line} />
    </>
  );

  const renderDetail = () => (
    <>
      <View style={styles.p10}>
        <Text style={styles.textBold}>Chi tiết đơn hàng</Text>
        <View style={styles.flexRow}>
          <Text style={styles.textDefault}>Mã đơn hàng</Text>
          <Text style={styles.textDefault}>{item._id}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.textDefault}>Ngày đặt</Text>
          <Text style={styles.textDefault}>
            {moment(item?.purchaseDate).format('lll')}
          </Text>
        </View>
        {/* <View style={styles.flexRow}>
          <Text style={[styles.textDefault, styles.textdiscount]}>
            Tiết kiệm
          </Text>
          <Text style={[styles.textDefault, styles.textdiscount]}>
            {item?.discountBill.toLocaleString('vi-VN')}đ
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.textDefault}>Tổng</Text>
          <Text style={styles.bold}>
            {(item?.moneyShip + item?.total).toLocaleString('vi-VN')}đ
          </Text>
        </View> */}
      </View>
      <View style={styles.line} />
    </>
  );

  const createTwoButtonAlert = id =>
    Alert.alert('Xác nhận', 'Bạn chắc chắc muốn hủy đơn hàng', [
      {
        text: 'Hủy',

        style: 'cancel',
      },
      {text: 'Xác nhận', onPress: () => dispatch(cancelBill(id))},
    ]);
  return (
    <>
      <ScrollView
        style={{flex: 1, backgroundColor: '#FEF6E4'}}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <HeaderTitle
          titleHeader={renderStatus()}
          nav={navigation}
          colorHeader="#FEF6E4"
        />
        <UserTag data={item?.locationDetail} disabled={true} />

        {/* renderProduct */}
        {renderListProduct()}

        {/* renderTotal */}
        {renderTotal()}
        {/* renderDetail */}
        {renderDetail()}

        <TouchableOpacity
          disabled={item.deliveryStatus === 0 ? false : true}
          onPress={() => {
            if (item.deliveryStatus === 0) {
              createTwoButtonAlert(item._id);
            }
          }}
          style={[
            styles.button,
            {borderColor: item.deliveryStatus === 0 ? '#F582AE' : '#ccc'},
            {
              backgroundColor:
                item.deliveryStatus === 0 ? '#F582AE' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.textButton,
              {
                color: item.deliveryStatus === 0 ? '#001858' : '#ccc',
              },
            ]}>
            Hủy đơn hàng
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {status ? <Loading /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF6E4',
    paddingBottom: 10,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 6,
  },
  nameShop: {
    fontSize: 16,
    color: '#001858',
    fontFamily: 'ProductSansBold',
    marginLeft: 8,
  },
  bold: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
  },
  textDefault: {
    fontFamily: 'ProductSans',
    color: '#001858',
    marginTop: 8,
  },
  content: {
    borderBottomColor: 'rgba(214, 214, 214,0.2)',
    borderBottomWidth: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  textBold: {
    color: '#001858',
    fontFamily: 'ProductSansBold',
    marginLeft: 8,
    fontSize: 15,
  },
  textdiscount: {
    color: '#F582AE',
  },
  p10: {
    padding: 10,
  },
  line: {
    width: '100%',
    height: 10,
    backgroundColor: '#F4EBD9',
    marginVertical: 10,
  },
  button: {
    height: 40,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,

    borderWidth: 1,
  },
  textButton: {fontFamily: 'ProductSansBold', fontSize: 16, color: '#001858'},
});
