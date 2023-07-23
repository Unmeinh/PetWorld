import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React from 'react'

import ItemPetHorizontal from './ItemPetHorizontal'

export default function ListPetHorizontal({data}) {
  return (
    <View style={{marginLeft:20,marginTop:18}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => <ItemPetHorizontal item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({})