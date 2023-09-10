import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterSelector from '../../component/filters/filterSelector';
import ListProductVertical from '../../component/ListProduct/ListProductVertical';
import {listPetSelector,listProductSelector,listStatusPetsSelector,listStatusProductSelector} from '../../redux/selector';
import { fetchPets, handleStatusPets } from '../../redux/reducers/pet/PetReducer';
import { fetchProducts, handleStatusProducts } from '../../redux/reducers/product/ProductReducer';
import { useDispatch,useSelector } from 'react-redux';
import LoaderListProductVertical from '../../component/list/LoaderListProductVertical';
export default function ListProductScreen({navigation, route}) {
  const dispatch = useDispatch()
  const type = route.params.type
  const list = type === 0 ? useSelector(listPetSelector) : useSelector(listProductSelector) 
  const status = type === 0 ? useSelector(listStatusPetsSelector) : useSelector(listStatusProductSelector) 
  useEffect(() =>{
    if(type === 0){
      dispatch(fetchPets())
    }else if(type === 1){
      dispatch(fetchProducts())
    }
    // return () =>{
    //   if(type === 0){
    //     dispatch(handleStatusPets('loading'))
    //   }else{
    //     dispatch(handleStatusProducts('loading'))
    //   }
    // }
  },[type])
  return (
    <View style={{backgroundColor: '#FEF6E4', flex: 1}}>
      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#001858" />
        </TouchableOpacity>
        <Text
          style={{
            flexGrow: 1,
            fontSize: 20,
            fontFamily: 'ProductSansBlod',
            color: '#001858',
            marginLeft: 20,
          }}>
          Gần tôi
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilters')}>
          <Icon name="search" size={30} color="#001858" />
        </TouchableOpacity>
      </View>
      {/* fillter */}
      <View>
        <FilterSelector />
      </View>
      {/* showlisst */}
      <View
        style={{
          height: 6,
          backgroundColor: '#ccc',
          opacity: 0.5,
          marginTop: 10,
        }}
      />
      {status === 'idle' ? <ListProductVertical data={list} type={type} /> :<LoaderListProductVertical/>}
    </View>
  );
}

const styles = StyleSheet.create({});
