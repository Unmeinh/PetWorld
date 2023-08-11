import {
  Text, View,
  ScrollView,
  Dimensions
} from 'react-native'
import React from 'react'
import styles from '../../styles/temp.style';
import { Image } from 'react-native-animatable';

export default function AccountScreen({ scrollRef, onScrollView }) {
  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <ScrollView ref={scrollRef}
        onScroll={onScrollView} style={{ height: '100%', width: '100%' }}>
      <Image source={require('../account/tk.png')}/>
      </ScrollView>
    </View>
  )
}