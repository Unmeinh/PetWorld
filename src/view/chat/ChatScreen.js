import {
  Text, View,
  ScrollView,
  Dimensions
} from 'react-native'
import React from 'react'
import styles from '../../styles/temp.style';

export default function ChatScreen({ scrollRef, onScrollView }) {
  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <ScrollView ref={scrollRef}
        onScroll={onScrollView} style={{ height: '100%', width: '100%' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height}}>
          <Text style={{ fontSize: 50, color: '#001858', fontFamily: 'ProductSans' }}>Chat</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height}}>
          <Text style={{ fontSize: 50, color: '#001858', fontFamily: 'ProductSans' }}>Screen</Text>
        </View>
      </ScrollView>
    </View>
  )
}