import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles/temp.style';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '../../component/Slider';
import {makeMutable} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import dataCategory from '../../data/category';
import dataPet from '../../data/listpet';
import ListPetHorizontal from '../../component/ListPetHorizontal';
import PetAISupport from '../../component/PetAISupport';
import { listPetSelector ,listProductSelector} from '../../redux/selector';
import CategoryList from '../../component/CategoryList';
import ListProductHorizontal from '../../component/ListProductHorizotal';
export default function HomeScreen({navigation}) {
  const [countCart, setCountCart] = useState(0);
  const listPet = useSelector(listPetSelector)
  const listProduct = useSelector(listProductSelector)

  return (
    <View>
      <ScrollView>
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
        <Pressable
          onPress={()=>navigation.navigate('SearchFilters')}
          style={{
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
          }}>
          <Icon
            name="search"
            color="#656565"
            size={24}
            style={{marginLeft: 10}}
          />

          <Text
            style={{flexGrow: 1}}
            >Tìm kiếm</Text>
        </Pressable>
        {/* slideshow */}
        <Slider />
        {/* category */}
        <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'ProductSansBold',
              fontSize: 20,
              color: '#001858',
            }}>
            Sản phẩm chính
          </Text>
          <CategoryList data={listCategory} navigation={navigation} />
        </View>
        {/* listpetnew */}
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'ProductSansBold',
              fontSize: 20,
              color: '#001858',
            }}>
            Thú cưng mới
          </Text>
          <Text
            style={{
              marginRight: 20,
              fontSize: 14,
              fontFamily: 'ProductSansBold',
              color: '#F252AE',
            }}>
            Xem tất cả
          </Text>
        </View>
        <ListPetHorizontal data={listPet} />
        {/* listproductnew */}
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'ProductSansBold',
              fontSize: 20,
              color: '#001858',
            }}>
            Sản phẩm mới
          </Text>
          <Text
            style={{
              marginRight: 20,
              fontSize: 14,
              fontFamily: 'ProductSansBold',
              color: '#F252AE',
            }}>
            Xem tất cả
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <ListProductHorizontal data={listProduct} />
        </View>
      </ScrollView>
      <PetChatSuport />
    </View>
  );
}
