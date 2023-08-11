import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterSelector from '../../component/filters/filterSelector';
import ListProductVertical from '../../component/ListProduct/ListProductVertical';
import {useSelector} from 'react-redux';
import {categoryIdSelector} from '../../redux/selector';
export default function ListProductScreen({navigation}) {
  const list = useSelector(categoryIdSelector);
  return (
    <View style={{backgroundColor:"#FEF6E4"}}>
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
      <ListProductVertical data={list}/>
    </View>
  );
}

const styles = StyleSheet.create({});
