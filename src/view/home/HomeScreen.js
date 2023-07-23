import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles/temp.style';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '../../component/Slider';
import {makeMutable} from 'react-native-reanimated';
import Category from '../../data/category';
import CategoryList from '../../component/CategoryList';
import dataCategory from '../../data/category';
import dataPet from '../../data/listpet'
import ListPetHorizontal from '../../component/ListPetHorizontal';
export default function HomeScreen() {
  const [countCart, setCountCart] = useState(0);
  return (
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
      <View
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

        <TextInput
          style={{flexGrow: 1}}
          maxLength={40}
          placeholder="Tìm kiếm"></TextInput>
      </View>
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
        <CategoryList data={dataCategory} />
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
      <ListPetHorizontal data={dataPet}/>
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
      <View style={{marginBottom:20}}>
      <ListPetHorizontal data={dataPet}/>
      </View>
    </ScrollView>
  );
}
