import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import UserTag from '../../component/shop/UserTag';
import ItemCartSummary from '../../component/ListProduct/ItemCartSummary';
import {useSelector, useDispatch} from 'react-redux';
import {
  billSelector,
  listItemBill,
  listShopSelector,
  useLocationSeleted,
} from '../../redux/selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCart from '../../hooks/useCart';
import ModalTicket from '../../component/modals/ModalTicket';
import {fetchInfoUserNoMessage} from '../../redux/reducers/user/userReducer';
import {userSelectStatus} from '../../redux/selectors/userSelector';
import {
  createBill,
  getPayments,
  setStatusChangeBill,
  setSuccessBill,
} from '../../redux/reducers/shop/billSlice';
import Loading from '../../component/Loading';
import {deleteItemCart} from '../../redux/reducers/shop/CartReduces';
import {convertCart} from '../../function/helper';
const {width} = Dimensions.get('screen');
export default function SummaryBill({navigation, route}) {
  const result = useSelector(listItemBill);
  const [user, district] = useSelector(useLocationSeleted);
  const statusUser = useSelector(userSelectStatus);
  const dispatch = useDispatch();
  const {
    price: {discount, priceTotal},
    statusChange,
    status,
    payments,
    successBill,
  } = useSelector(billSelector);
  const shop = useSelector(listShopSelector);
  const resultCart = useCart(result, shop, user);
  const [selectedId, setSelectedId] = useState(null);
  const districtSlice = location => {
    let result = '';
    if (location) {
      const parts = location.split(',');
      result = parts[parts.length - 1];
    }
    return result.trim();
  };
  const moneyShip = () => {
    let money = 0;
    if (resultCart) {
      for (const item of resultCart) {
        if (
          districtSlice(item?.idShop?.locationShop) ===
          districtSlice(user?.location)
        ) {
          money += 10000;
          continue;
        }
        money += 30000;
      }
    }
    return money;
  };
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
    dispatch(fetchInfoUserNoMessage());
    dispatch(getPayments());
  }, []);

  useEffect(() => {
    if (successBill) {
      dispatch(
        createBill({
          paymentMethods: selectedId,
          deliveryStatus: 0,
          locationDetail: {
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            location: user.location,
          },
          products: convertCart(resultCart, district),
        }),
      );
      dispatch(setSuccessBill(false));
    }
  }, [successBill]);
  useEffect(() => {
    if (statusChange) {
      dispatch(deleteItemCart());
      navigation.navigate('BillScreen', {idName: 3});
    }
  }, [statusChange]);
  useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      dispatch(setStatusChangeBill(false));
    });
    return sub;
  }, [navigation]);

  ///randomcode

  const generateRandomCode = () => {
    return Array.from({length: 30}, () =>
      Math.random().toString(36).charAt(2).toUpperCase(),
    ).join('');
  };

  // const startRandomCodeGeneration = () => {
  //   // Run the function initially
  //   generateRandomCode();

  //   // Set up interval to run the function every 5 minutes
  //   const id = setInterval(() => {
  //     generateRandomCode();
  //   }, 5 * 60 * 1000);

  //   // Save the interval ID to state
  //   setIntervalId(id);
  // };

  // const stopRandomCodeGeneration = () => {
  //   // Clear the interval using the stored ID
  //   clearInterval(intervalId);
  // };
  // console.log(randomCode);

  const handleSaveBill = () => {
    if (checkValidate()) {
      if (selectedId === 1) {
        const code = generateRandomCode();
        navigation.navigate('MomoPayment', {
          code: code,
          amount: priceTotal + moneyShip(),
        });
      } else {
        dispatch(
          createBill({
            paymentMethods: selectedId,
            deliveryStatus: 0,
            locationDetail: {
              fullName: user.fullName,
              phoneNumber: user.phoneNumber,
              location: user.location,
            },
            products: convertCart(resultCart, district),
          }),
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTitle
        titleHeader="Tóm tắt đơn hàng"
        nav={navigation}
        colorHeader="#FEF6E4"
        callback={() => navigation.pop(2)}
      />
      {statusUser === 'loading' ? (
        <ActivityIndicator color={'#F582AE'} size={'large'} />
      ) : (
        <ScrollView style={{marginTop: 0}} scrollEnabled={true}>
          <UserTag data={user} />
          <FlatList
            data={resultCart}
            scrollEnabled={false}
            keyExtractor={item => item.idShop._id}
            renderItem={({item}) => (
              <ItemCartSummary result={item} locationShop={district} />
            )}
          />
          <View style={styles.line} />
          <ModalTicketShow />
          <View style={styles.line} />
          <View>
            <Text style={styles.textBold}>Tóm tắt đơn hàng</Text>
            <View style={styles.flexRow}>
              <Text style={styles.textDefault}>Tổng phụ</Text>
              <Text style={styles.textDefault}>
                {(priceTotal + discount)?.toLocaleString('vi-VN')} đ
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.textDefault}>Vận chuyển</Text>
              <Text style={styles.textDefault}>
                {moneyShip()?.toLocaleString('vi-VN')}đ
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={[styles.textDefault, styles.textdiscount]}>
                Tiết kiệm
              </Text>
              <Text style={[styles.textDefault, styles.textdiscount]}>
                {discount.toLocaleString('vi-VN')} đ
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.textDefault}>Tổng</Text>
              <Text style={styles.bold}>
                {(priceTotal + moneyShip()).toLocaleString('vi-VN')} đ
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
              {(priceTotal + moneyShip()).toLocaleString('vi-VN')} đ
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSaveBill}>
            <Text style={styles.textButton}>Xác nhận</Text>
          </TouchableOpacity>
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
});
