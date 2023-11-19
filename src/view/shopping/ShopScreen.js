import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabView, TabBar} from 'react-native-tab-view';
import GridProduct from '../../component/ListProduct/GridProduct';
import {useSelector, useDispatch} from 'react-redux';
import {listCartSelector, listPetSelector} from '../../redux/selector';
import {
  fetchPetsByIdShop,
  setDataPetByShop,
} from '../../redux/reducers/pet/PetReducer';
import {
  fetchProductsByIdShop,
  setDataProductsByShop,
} from '../../redux/reducers/product/ProductReducer';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import {fetchDetailShop} from '../../redux/reducers/shop/ShopReducer';
export default function ShopScreen({navigation, route}) {
  const data = route.params.data;
  const listProduct = useSelector(state => state.listProduct);
  const listPet = useSelector(state => state.listPet);
  const shop = useSelector(state => state.listShop);
  const {
    avatarShop,
    createdAt,
    description,
    email,
    followers,
    hotline,
    locationShop,
    nameShop,
    revenue,
    status,
  } = shop.detail;
  const countCart = useSelector(listCartSelector);
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const [routes] = React.useState([
    {key: 'pet', title: 'Thú cưng'},
    {key: 'product', title: 'Sản Phẩm'},
  ]);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'pet':
        return listPet?.statusPetByIdShop === 'loading' ? (
          <ActivityIndicator
            size={'large'}
            color={'#F582AE'}
            style={{marginTop: 10}}
          />
        ) : (
          <GridProduct data={listPet?.petsByIdShop} />
        );

      case 'product':
        return listProduct?.statusProductsShop === 'loading' ? (
          <ActivityIndicator
            size={'large'}
            color={'#F582AE'}
            style={{marginTop: 10}}
          />
        ) : (
          <GridProduct data={listProduct?.productsShop} />
        );
      default:
        return null;
    }
  };
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        pressColor="transparent"
        indicatorStyle={{backgroundColor: '#F582AE'}}
        style={{backgroundColor: '#FEF6E4'}}
        renderLabel={({route, focused, color}) => (
          <Text
            style={{
              color: focused ? '#001858' : '#858383',
              fontSize: 16,
              fontFamily: 'ProductSans',
            }}>
            {route.title}
          </Text>
        )}
      />
    );
  };

  useEffect(() => {
    dispatch(fetchProductsByIdShop(data._id));
    dispatch(fetchPetsByIdShop(data._id));
    dispatch(fetchDetailShop(data._id));
    return () => {
      dispatch(setDataPetByShop([]));
      dispatch(setDataProductsByShop([]));
    };
  }, []);

  const quantitySold = useCallback(() => {
    let amount = 0;
    if (
      listProduct?.statusProductsShop !== 'loading' &&
      listPet?.statusPetByIdShop !== 'loading'
    ) {
      if (
        listProduct.productsShop?.length !== 0 ||
        listProduct.petsByIdShop?.length !== 0
      ) {
        const amountProduct = listProduct.productsShop?.reduce(
          (pre, crv) => pre + crv?.quantitySold,
          0,
        );
        const amountPet = listPet.petsByIdShop?.reduce(
          (pre, crv) => pre + crv?.quantitySold,
          0,
        );
        amount = amountProduct + amountPet;
      }
    }

    return amount;
  }, [listPet?.statusPetByIdShop, listProduct?.statusProductsShop]);
  const renderDetail = (sub, value, newSlyle) => {
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailSub}>{sub}</Text>
        <Text style={[styles.detailValue, newSlyle]}>{value}</Text>
      </View>
    );
  };
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{backgroundColor: 'white', borderRadius: 7, padding: 10}}>
          <Text style={styles.modalText}>Thông tin Shop</Text>
          <View style={styles.detailsContainer}>
            {renderDetail('Tên shop:', nameShop)}
            {renderDetail(
              'Ngày mở shop:',
              moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
            )}
            {renderDetail('Email:', email)}
            {renderDetail('Hotline:', '+' + hotline)}
            {renderDetail('Địa chỉ:', locationShop)}
            {renderDetail('Giới thiệu:', description, {width: '70%'})}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Pressable
            onPress={() => {
              // dispatch(setStatusFilter('idle'))
              navigation.goBack();
            }}>
            <Icon name="arrow-back" size={26} color="#001858" />
          </Pressable>
          <Pressable
            style={styles.headerSearch}
            onPress={() => {
              navigation.navigate('SearchFiltersShop', {idShop: data?._id});
            }}>
            <Icon name="search" size={26} color="#001858" />
            <Text style={{color: '#b3aaaa'}}>Tìm kiếm trong cửa hàng</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('CartScreen');
            }}>
            <Icon name="cart-outline" size={26} color="#001858" />
            <View
              style={{
                width: 16,
                height: 16,
                position: 'absolute',
                backgroundColor: '#F582AE',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                top: -3,
                right: -3,
              }}>
              <Text style={{fontSize: 12, fontFamily: 'ProductSans'}}>
                {countCart?.length}
              </Text>
            </View>
          </Pressable>
        </SafeAreaView>
        <View style={styles.tagShop}>
          <Image source={{uri: data.avatarShop}} style={styles.image} />
          <View style={styles.titleShop}>
            <TouchableOpacity
              style={styles.flexRow}
              disabled={shop.status === 'loading' ? true : false}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textShop}>{data.nameShop}</Text>
              <Icon name="chevron-forward" size={20} color={'#001858'} />
            </TouchableOpacity>
            <View style={[styles.flexRow, styles.content]}>
              <View style={[styles.flexRow, {marginRight: 10}]}>
                <Icon name="star" size={16} color={'#FFC20F'} />
                <Text>{data.rate}</Text>
              </View>
              {listPet?.statusPetByIdShop === 'loading' &&
              listProduct?.statusProductsShop === 'loading'  ? null : (
                <Text style={{fontFamily: 'ProductSans', color: '#001858'}}>
                  Đã bán: {quantitySold()}
                </Text>
              )}
            </View>
          </View>
          {/* <Pressable style={styles.button}>
            <Text style={styles.textButton}>Trò chuyện</Text>
          </Pressable> */}
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
      {renderModal()}
    </>
  );
}

const styles = StyleSheet.create({
  textButton: {fontFamily: 'ProductSans', color: '#F582AE'},
  button: {
    width: 100,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#F582AE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 8,
  },
  textShop: {
    fontSize: 18,
    fontFamily: 'ProductSansBold',
    color: '#001858',
  },
  titleShop: {
    flexGrow: 1,
    marginLeft: 10,
  },
  tagShop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 14,
    alignItems: 'center',
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 36,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  container: {
    backgroundColor: '#FEF6E4',
    flex: 1,
  },
  headerSearch: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(176, 174, 175,0.6)',
    marginHorizontal: 10,
    height: 38,
    paddingHorizontal: 10,
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(06, 0, 0,0.3)',
  // },

  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'ProductSansBold',
  },

  avatar: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailSub: {
    marginRight: 8,
    fontFamily: 'ProductSansBold',
  },
  detailValue: {
    fontFamily: 'ProductSans',
  },
});
