import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

export default function CategoryList({data,navigation}) {
  return (
    <View style={{marginTop:16}}>
      <FlatList 
        horizontal
        data={data}
        renderItem={({item}) =>  <CategoryItem item={item} navigation={navigation} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({})