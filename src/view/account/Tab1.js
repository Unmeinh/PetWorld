import {
  Text, View,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'
import React from 'react'
import HeaderBlog from '../account/HeaderBlog'
import { Image } from 'react-native-animatable';

export default function Tab1({ scrollRef, onScrollView }) {
  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <ScrollView ref={scrollRef}
        onScroll={onScrollView} style={{ height: '100%', width: '100%' }}>
          <HeaderBlog/>
          <View style={styles.centerImageContainer}>
            <Image style={styles.centerImage} source={require('../account/demo.png')} />
          </View>
        
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  // ... (các styles khác)
  centerImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, 
    marginLeft:30,
    marginRight:30,
  },
  centerImage: {
   
  },
});

