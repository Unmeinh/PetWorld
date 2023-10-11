import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');
export default function ImageSliderItem({item}) {
  return (
    <View style={styles.container}>
      <Animated.Image source={{uri: item}}  style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 240,
    alignItems: 'center',
    
  },
  img: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    
  },
});
