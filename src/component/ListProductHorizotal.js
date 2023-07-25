import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React from 'react'
import ItemProductHorizontal from './ItemProductHorizontal'

export default function ListProductHorizontal({data}) {
  return (
    <View style={{marginLeft:20,marginTop:18}}>
      <FlatList
        keyExtractor={(item) => item.id.toString()} 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => <ItemProductHorizontal item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({})