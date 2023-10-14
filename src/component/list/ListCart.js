import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ItemCartProduct from '../ListProduct/ItemCartProduct';

function ListCart({data}) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item?.idShop?._id}
      renderItem={({item}) => <ItemCartProduct result={item} />}
      ListEmptyComponent={() => {
        return (
          <View style={{flex:1,justifyContent:'center', alignItems: 'center',marginTop:20}}>
            <Text style={{fontFamily: 'ProductSansBold', fontSize: 18}}>
              Không có sản phẩm nào trong giỏ hàng
            </Text>
          </View>
        );
      }}
    />
  );
}
export default React.memo(ListCart);
