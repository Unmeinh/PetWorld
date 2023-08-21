import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState, useRef} from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import UserTag from '../../component/shop/UserTag';
import ItemCartSummary from '../../component/ListProduct/ItemCartSummary';
import {useSelector} from 'react-redux';
import {listCartSelector, listProductSelector} from '../../redux/selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCart from '../../hooks/useCart';
import ModalTicket from '../../component/modals/ModalTicket';
const data = {
  name: 'Lương Việt Hoàng',
  phoneNumber: '08********32',
  location: 'Cầu diễn, Phú Diễn, Bắc từ Liêm, Hà Nội',
};
const payment = [
  {id: 1, name: 'Thanh toán khi nhận hàng'},
  {id: 2, name: 'Ví điện tử'},
];
const {width, height} = Dimensions.get('screen');
export default function SummaryBill({navigation}) {
  const result = useSelector(listCartSelector);
  const products = useSelector(listProductSelector);
  const resultCart = useCart(result, products);
  function PayMent() {
    const [selectedId, setSelectedId] = useState();
    const Item = ({item, onPress, icon, textColor}) => (
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <Text style={styles.textDefault}>{item.name}</Text>
        <Ionicons name={icon} color="#F582AE" size={22} />
      </Pressable>
    );

    const renderItem = ({item}) => {
      const icon =
        item.id === selectedId
          ? 'radio-button-on-outline'
          : 'radio-button-off-outline';

      return (
        <Item item={item} onPress={() => setSelectedId(item.id)} icon={icon} />
      );
    };
    return (
      <FlatList
        data={payment}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    );
  }
  function ModalTicketShow(){
    const [isVisible, setIsVisible] = useState(false)
    return (
      <View>
         <Pressable
          onPress={() => setIsVisible(!isVisible)}
          style={styles.flexRow}>
          <Icon name="ticket" color="#F582AE" size={22} />
          <Text style={styles.textBold}>Chiết khấu của PetWord</Text>
          <Icon name="chevron-right" size={24} color="#001858" />
        </Pressable>
        <ModalTicket isVisible={isVisible} setIsVisible={setIsVisible}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <HeaderTitle
        titleHeader="Tóm tắt đơn hàng"
        nav={navigation}
        colorHeader="#FEF6E4"
      />
      <ScrollView style={{marginTop: -15}} scrollEnabled={true}>
        <UserTag data={data} />
        <FlatList
          data={resultCart()}
          scrollEnabled={false}
          keyExtractor={item => item.idShop}
          renderItem={({item}) => <ItemCartSummary result={item} />}
        />
        <View style={styles.line} />
        <ModalTicketShow/>
        <View style={styles.line} />
        <View>
          <Text style={styles.textBold}>Tóm tắt đơn hàng</Text>
          <View style={styles.flexRow}>
            <Text style={styles.textDefault}>Tổng phụ</Text>
            <Text style={styles.textDefault}>100.100đ</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textDefault}>Vận chuyển</Text>
            <Text style={styles.textDefault}>32.999đ</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textDefault}>Tổng</Text>
            <Text style={styles.bold}>100.100đ</Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.textBold}>Phương thức thanh toán</Text>
        <PayMent />
        <View style={styles.line} />
      </ScrollView>
      <View style={styles.bottomButton}>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>Tổng</Text>
          <Text style={styles.bold}>1.222.222đ</Text>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Xác nhận</Text>
        </Pressable>
      </View>
    
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
});