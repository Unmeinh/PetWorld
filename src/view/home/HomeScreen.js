import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {
  listPetSelector,
  listProductSelector,
  categorySelector,
  categoryStatusSelector,
  listStatusProductSelector,
  listStatusPetsSelector,
  listCartSelector,
} from '../../redux/selector';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import Slider from '../../component/slideshow/Slider';
import CategoryList from '../../component/list/CategoryList';
import ListHorizontal from '../../component/list/ListHorizontal';
import {fetchCategorys} from '../../redux/reducers/category/category';
import {useDispatch} from 'react-redux';
import {fetchProducts} from '../../redux/reducers/product/ProductReducer';
import {fetchPets} from '../../redux/reducers/pet/PetReducer';
import {fetchCart} from '../../redux/reducers/shop/CartReduces';
import {fetchBanner} from '../../redux/Home/homeSlice';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const listPet = useSelector(listPetSelector);
  const listProduct = useSelector(listProductSelector);
  const listCategory = useSelector(categorySelector);
  const result = useSelector(listCartSelector);
  const statusCategorys = useSelector(categoryStatusSelector);
  const statusProducts = useSelector(listStatusProductSelector);
  const statusPets = useSelector(listStatusPetsSelector);
  const dataHome = useSelector(state => state.home);
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
  useEffect(() => {
    dispatch(fetchCategorys());
    dispatch(fetchPets());
    dispatch(fetchProducts());
    dispatch(fetchCart());
    dispatch(fetchBanner());
  }, []);
  return (
    <ScrollView
      style={{backgroundColor: '#FEF6E4'}}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, marginBottom: 60}}>
        <SafeAreaView>
          <Pressable
            onPress={() => navigation.navigate('CartScreen')}
            style={{alignItems: 'flex-end', marginTop: 10, marginEnd: 20}}>
            <Icon name="cart-outline" color="#F582AE" size={30} />
            <View
              style={{
                width: 16,
                height: 16,
                position: 'absolute',
                backgroundColor: '#F582AE',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 12, fontFamily: 'ProductSans'}}>
                {result?.length}
              </Text>
            </View>
          </Pressable>
        </SafeAreaView>

        {(statusCategorys &&
          statusPets &&
          statusProducts &&
          dataHome?.status) === 'loading' ? (
          <View style={styles.margin20}>
            <ShimmerPlaceHolder
              shimmerStyle={styles.styleLoader}
              shimmerColors={colorLoader}
            />
          </View>
        ) : (
          <Pressable
            onPress={() => navigation.navigate('SearchFilters')}
            style={styles.search}>
            <Icon
              name="search"
              color="#656565"
              size={24}
              style={{marginLeft: 10}}
            />

            <Text style={{flexGrow: 1}}>Tìm kiếm</Text>
          </Pressable>
        )}
        {/* slideshow */}
        <Slider isLoader={false} data={dataHome?.dataBanner} />
        {/* category */}

        <CategoryList data={listCategory} isLoader={statusCategorys} />
        {/* listpetnew */}
        <ListHorizontal
          data={listPet}
          title="Thú cưng mới"
          isLoader={statusPets}
          type={0}
        />
        {/* listproductnew */}
        <View style={{marginBottom: 20}}>
          <ListHorizontal
            data={listProduct}
            title="Sản phẩm mới"
            isLoader={statusProducts}
            type={1}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  search: {
    height: 40,
    backgroundColor: '#DBDBDB',
    opacity: 0.5,
    borderRadius: 17,
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  margin20: {
    margin: 20,
  },
  styleLoader: {width: '100%', height: 40, borderRadius: 17},
});
