import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React from 'react'
import ItemSearch from './ItemSearch'

export default function ShowSearchFilters({data}) {
  return (
    <View style={{marginLeft:18,marginRight:18}}>
      <FlatList
        data={data}
        renderItem={({item}) => <ItemSearch item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({})