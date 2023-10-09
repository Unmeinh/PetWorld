import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
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
export default function ShopScreen({navigation, route}) {
  const data = route.params.data;
  const listProduct = useSelector(state => state.listProduct);
  const listPet = useSelector(state => state.listPet);
  const countCart = useSelector(listCartSelector)
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const [routes] = React.useState([
    {key: 'pet', title: 'Thú cưng'},
    {key: 'product', title: 'Sản Phẩm'},
  ]);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'pet':
        return listPet?.statusPetByIdShop === 'loading' ? (
          <ActivityIndicator size={'large'} color={'#F582AE'} style={{marginTop:10}}/>
        ) : (
          <GridProduct
            data={listPet?.petsByIdShop}
          />
        );

      case 'product':
        return listProduct?.statusProductsShop === 'loading' ? (
          <ActivityIndicator size={'large'} color={'#F582AE'} style={{marginTop:10}} />
        ) : (
          <GridProduct
          data={listProduct?.productsShop}
        />
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
    return () => {
      dispatch(setDataPetByShop([]));
      dispatch(setDataProductsByShop([]));
    };
  }, []);
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
              navigation.navigate('SearchFilters');
            }}>
            <Icon name="search" size={26} color="#001858" />
            <Text>Tìm kiếm trong cửa hàng</Text>
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
                top:-3
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
            <View style={styles.flexRow}>
              <Text style={styles.textShop}>{data.nameShop}</Text>
              <Icon name="chevron-forward" size={20} color={'#001858'} />
            </View>
            <View style={[styles.flexRow, styles.content]}>
              <View style={[styles.flexRow, {marginRight: 10}]}>
                <Icon name="star" size={16} color={'#FFC20F'} />
                <Text>{data.rate}</Text>
              </View>
              <Text style={{fontFamily: 'ProductSans'}}>
                Đã bán {data.quantitySold}
              </Text>
            </View>
          </View>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Trò chuyện</Text>
          </Pressable>
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
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
});
