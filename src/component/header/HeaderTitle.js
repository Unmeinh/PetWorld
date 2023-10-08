import {TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HeaderTitle({nav, titleHeader, colorHeader, callback}) {
  return (
    <View
      style={{
        backgroundColor: String(colorHeader),
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingVertical: 13,
        marginBottom: 3,
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          if (callback) {
            callback();
          }else {
            nav.goBack();
          }

        }}>
        <AntDesign name="arrowleft" size={25} color={'#001858'} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          color: '#001858',
          fontFamily: 'ProductSans',
          fontWeight: 'bold',
          marginLeft: 20,
        }}>
        {titleHeader}
      </Text>
    </View>
  );
}
