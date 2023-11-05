import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ItemSearch from './ItemSearch';

export default function ShowSearchFilters({data}) {
  return (
    <View style={{paddingHorizontal: 20}}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => <ItemSearch item={item} />}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              fontSize: 16,
              fontFamily: 'ProductSansBold',
            }}>
            Hãy thử tìm kiếm một thứ gì đó!
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
