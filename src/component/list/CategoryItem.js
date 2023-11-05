import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function CategoryItem({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListProductScreen', {type: 3,id: item._id});
      }}
      style={{marginLeft: 20,justifyContent:'center',alignItems:'center'}}>
      <View
        style={{
          width: 70,
          height: 70,
          backgroundColor: '#FFF6F6',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
        }}>
        <Icon name={item.nameIcon} size={24} color="#F582AE" />
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'ProductSans',
            marginTop: 8,
            color: '#001858',
            fontSize: 13,
          }}>
          {item.nameCategory}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
