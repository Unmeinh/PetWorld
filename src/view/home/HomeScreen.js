import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {makeMutable} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {
  listPetSelector,
  listProductSelector,
  categorySelector,
} from '../../redux/selector';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import Slider from '../../component/slideshow/Slider';
import CategoryList from '../../component/list/CategoryList';
import ListHorizontal from '../../component/list/ListHorizontal';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);
export default function HomeScreen({scrollRef, onScrollView, navigation}) {
  const [countCart, setCountCart] = useState(0);
  const listPet = useSelector(listPetSelector);
  const listProduct = useSelector(listProductSelector);
  const listCategory = useSelector(categorySelector); 
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
  const [isLoader, setIsLoader] = useState(() =>true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 3000);
  }, []);
  return (
    <>
      <ScrollView ref={scrollRef} onScroll={onScrollView} style={{backgroundColor:"#FEF6E4"}}>
        <SafeAreaView>
          <View style={{alignItems: 'flex-end', marginTop: 10, marginEnd: 20}}>
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
                {countCart}
              </Text>
            </View>
          </View>
        </SafeAreaView>

        {isLoader ? (
          <View style={styles.margin20}>
            <ShimerPlaceHolder
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
        <Slider isLoader={isLoader} />
        {/* category */}

        <CategoryList data={listCategory} isLoader={isLoader}/>
        {/* listpetnew */}
        <ListHorizontal data={listPet} title="Thú cưng mới" isLoader={isLoader} />
        {/* listproductnew */}
        <ListHorizontal data={listProduct} title="Sản phẩm mới" isLoader={isLoader}/>
       
      </ScrollView>
    </>
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
