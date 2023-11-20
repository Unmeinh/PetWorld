import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function ItemSearch({item}) {
  const name = item.namePet === undefined ? item?.nameProduct : item?.namePet;
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.push('DetailProduct', {id: item?._id, type: item?.type})
        }>
        <Text
          style={{
            fontFamily: 'ProductSans',
            fontSize: 15,
            paddingTop: 10,
            paddingBottom: 10,
            color: '#001858',
          }}>
          {name}
        </Text>
      </TouchableOpacity>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}} />
    </View>
  );
}

const styles = StyleSheet.create({});
