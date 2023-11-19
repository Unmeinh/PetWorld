import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import UserTag from '../../component/shop/UserTag';
import ItemCartSummary from '../../component/ListProduct/ItemCartSummary';
import {useSelector, useDispatch} from 'react-redux';
import {billSelector, useLocationSeleted} from '../../redux/selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalTicket from '../../component/modals/ModalTicket';
import {fetchInfoUserNoMessage} from '../../redux/reducers/user/userReducer';
import {userSelectStatus} from '../../redux/selectors/userSelector';
import {
  createBill,
  getPayments,
  setStatusChangeBill,
  setSuccessBill,
} from '../../redux/reducers/shop/billSlice';
import moment from 'moment';
import Loading from '../../component/Loading';
const {width} = Dimensions.get('screen');
export default function SummaryBill({navigation, route}) {
  const item = route?.params?.item;
  const [user, district] = useSelector(useLocationSeleted);
  const statusUser = useSelector(userSelectStatus);
  const [date, setDate] = useState(dateShip());
  const {statusChange, status, payments, successBill} =
    useSelector(billSelector);
  const [selectedId, setSelectedId] = useState(null);

  const districtProduct = location => {
    let result = '';
    if (location) {
      const parts = location.split(',');
      result = parts[parts.length - 1];
    }
    return result.trim();
  };
  const showShip = () => {
    const money =
      districtProduct(item?.idShop?.locationShop) == districtProduct(district)
        ? 10000
        : 30000;
    return money;
  };
  function dateShip() {
    const step = 2;
    const gap = 2;
    let currentDate = new Date();
    const dateFirst = currentDate.setDate(currentDate.getDate() + step);
    const dateLast = currentDate.setDate(currentDate.getDate() + gap);
    return {
      dateFirst: moment(dateFirst).format('DD/MM'),
      dateLast: moment(dateLast).format('DD/MM'),
    };
  }
  const dispatch = useDispatch();
  function PayMent() {
    const Item = ({item, onPress, icon, textColor}) => (
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <Text style={styles.textDefault}>{item.nameMethod}</Text>
        <Ionicons name={icon} color="#F582AE" size={22} />
      </Pressable>
    );

    const renderItem = ({item}) => {
      const icon =
        item.type === selectedId
          ? 'radio-button-on-outline'
          : 'radio-button-off-outline';

      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.type)}
          icon={icon}
        />
      );
    };
    return (
      <FlatList
        data={payments}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    );
  }
  function ModalTicketShow() {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <View>
        <Pressable
          onPress={() => setIsVisible(!isVisible)}
          style={styles.flexRow}>
          <Icon name="ticket" color="#F582AE" size={22} />
          <Text style={styles.textBold}>Chiết khấu của PetWord</Text>
          <Icon name="chevron-right" size={24} color="#001858" />
        </Pressable>
        <ModalTicket isVisible={isVisible} setIsVisible={setIsVisible} />
      </View>
    );
  }
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
  const showSave = (price, discount) => {
    let money = 0;
    if (discount > 0) {
      return (money = price - (price - (price * discount) / 100));
    }
    return money;
  };
  const showTotal = () => {
    let money = 0;
    const price = item?.priceProduct ? item?.priceProduct : item?.pricePet;
    if (price > 0) {
      return (money = price - (price * item?.discount) / 100 + showShip());
    }
    return (money = 0);
  };
  const generateRandomCode = () => {
    return Array.from({length: 30}, () =>
      Math.random().toString(36).charAt(2).toUpperCase(),
    ).join('');
  };
  const checkValidate = () => {
    if (selectedId === null) {
      ToastAndroid.show(
        'Bạn chưa chọn phương thức thanh toán',
        ToastAndroid.SHORT,
      );
      return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch(getPayments());
    dispatch(fetchInfoUserNoMessage());
  }, []);

  useEffect(() => {
    if (successBill) {
      dispatch(
        createBill({
          paymentMethod: selectedId,
          deliveryStatus: 0,
          detailCard: null,
          locationDetail: {
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            location: user.location,
          },
          products: [
            {
              idShop: item?.idShop?._id,
              items: [
                {
                  idProduct: item._id,
                  amount: 1,
                },
              ],
              moneyShip: showShip(),
            },
          ],
        }),
      );
      dispatch(setSuccessBill(false));
    }
  }, [successBill]);
  useEffect(() => {
    if (statusChange) {
      navigation.navigate('BillScreen', {idName: 3});
    }
  }, [statusChange]);
  useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      dispatch(setStatusChangeBill(false));
    });
    return sub;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <HeaderTitle
        titleHeader="Tóm tắt đơn hàng"
        nav={navigation}
        colorHeader="#FEF6E4"
      />
      {statusUser === 'loading' ? (
        <ActivityIndicator color={'#F582AE'} size={'large'} />
      ) : (
        <ScrollView style={{marginTop: 0}} scrollEnabled={true}>
          <UserTag data={user} />
          <View>
            <View style={styles.containerItem}>
              {item?.idShop?.avatarShop ? (
                <Image
                  source={{uri: item?.idShop?.avatarShop}}
                  style={styles.image}
                />
              ) : null}
              <Text style={styles.nameShop}>{item?.idShop?.nameShop}</Text>
            </View>
            <View style={styles.container2}>
              <Image
                source={{
                  uri: item?.arrProduct
                    ? item?.arrProduct[0]
                    : item?.imagesPet[0],
                }}
                style={styles.imageItem}
              />
              <View style={styles.content}>
                <Text style={styles.nameProduct}>
                  {item?.nameProduct ? item?.nameProduct : item?.namePet}
                </Text>
                <Text>
                  {priceDiscount(
                    item?.priceProduct ? item?.priceProduct : item?.pricePet,
                    item?.discount,
                  )}
                </Text>
              </View>
              <View style={styles.boxCount}>
                <Text size={20} style={[styles.textMount]}>
                  Số lượng: 1
                </Text>
              </View>
            </View>
            {/* <View style={styles.discountOfShop}>
              <Text style={styles.styleDiscount}>Chiết khấu từ shop</Text>
              <Icon name="chevron-right" size={24} color={'#001858'} />
            </View> */}
            <View style={styles.discountOfShop}>
              <View style={{marginTop: 10}}>
                <Text style={styles.styleDiscount}>Vận chuyển tiêu chuẩn</Text>
                <View style={[{marginLeft: 0, flexDirection: 'row'}]}>
                  <Text>
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={16}
                      color="#001858"
                    />
                  </Text>
                  <Text style={styles.styleDiscount}>
                    {districtProduct(item?.idShop?.locationShop)}
                  </Text>
                </View>
                <View style={[styles.flexRow, {marginLeft: 0}]}>
                  <Text>
                    <Ionicons name="time-outline" size={16} color="#001858" />
                  </Text>
                  <Text style={styles.styleDiscount}>
                    {' '}
                    Ngày giao hàng dự kiến: {date.dateFirst} - {date.dateLast}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[styles.price, {color: '#001858', fontSize: 12}]}>
                  {showShip()?.toLocaleString('vi-VN')} đ
                </Text>
                <Text style={[styles.discount, {fontSize: 12}]}></Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.line} />
          <ModalTicketShow /> */}
          <View style={styles.line} />
          <View>
            <Text style={styles.textBold}>Tóm tắt đơn hàng</Text>
            <View style={styles.flexRow}>
              <Text style={styles.textDefault}>Tổng phụ</Text>
              <Text style={styles.textDefault}>
                {(item?.pricePet
                  ? item?.pricePet
                  : item?.priceProduct
                )?.toLocaleString('vi-VN')}{' '}
                đ
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.textDefault}>Vận chuyển</Text>
              <Text style={styles.textDefault}>
                {showShip()?.toLocaleString('vi-VN')} đ
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={[styles.textDefault, styles.textdiscount]}>
                Tiết kiệm
              </Text>
              <Text style={[styles.textDefault, styles.textdiscount]}>
                {showSave(
                  item?.priceProduct ? item?.priceProduct : item?.pricePet,
                  item?.discount,
                )?.toLocaleString('vi-VN')}{' '}
                đ
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.textDefault}>Tổng</Text>
              <Text style={styles.bold}>
                {showTotal().toLocaleString('vi-VN')} đ
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <Text style={styles.textBold}>Phương thức thanh toán</Text>
          <PayMent />
          <View style={styles.line} />
        </ScrollView>
      )}
      {statusUser === 'loading' ? null : (
        <View style={styles.bottomButton}>
          <View style={styles.flexRow}>
            <Text style={styles.bold}>Tổng</Text>
            <Text style={styles.bold}>
              {showTotal()?.toLocaleString('vi-VN')} đ
            </Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (checkValidate()) {
                if (selectedId === 1) {
                  const code = generateRandomCode();
                  navigation.navigate('MomoPayment', {
                    code: code,
                    amount: showTotal(),
                  });
                } else {
                  dispatch(
                    createBill({
                      paymentMethod: selectedId,
                      deliveryStatus: 0,
                      detailCard: null,
                      locationDetail: {
                        fullName: user.fullName,
                        phoneNumber: user.phoneNumber,
                        location: user.location,
                      },
                      products: [
                        {
                          idShop: item?.idShop?._id,
                          items: [
                            {
                              idProduct: item._id,
                              amount: 1,
                            },
                          ],
                          moneyShip: showShip(),
                        },
                      ],
                    }),
                  );
                }
              }
            }}>
            <Text style={styles.textButton}>Xác nhận</Text>
          </Pressable>
        </View>
      )}
      {status ? <Loading /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  textButton: {fontFamily: 'ProductSansBold', fontSize: 16, color: '#001858'},
  button: {
    height: 40,
    backgroundColor: '#F582AE',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 5,
  },
  bottomButton: {
    width: width,
    height: 70,
    backgroundColor: '#FEF6E4',
    borderTopWidth: 1,
    borderColor: 'rgba(128, 128, 128,0.6)',
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
  container: {
    flex: 1,
    backgroundColor: '#FEF6E4',
  },
  containerItem: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  line: {
    width: width,
    height: 10,
    backgroundColor: '#F4EBD9',
    marginVertical: 10,
  },
  textBold: {
    flexGrow: 1,
    color: '#001858',
    fontFamily: 'ProductSansBold',
    marginLeft: 8,
    fontSize: 15,
  },
  textdiscount: {
    color: '#F582AE',
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
  container2: {
    height: 80,
    marginLeft: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  styleDiscount: {
    fontFamily: 'ProductSans',
    color: '#001858',
    marginLeft: 7,
  },
  imageItem: {
    width: 70,
    height: 70,
    borderRadius: 4,
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
  textMount: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
  },
  boxCount: {
    flexDirection: 'row',
    marginRight: 10,
    position: 'absolute',
    right: 10,
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
});
