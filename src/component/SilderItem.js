import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');
export default function SilderItem({item}) {
  return (
    <View style={styles.container}>
      <Image source={item.img} resizeMode="cover" style={styles.img} />
      <View style={styles.content}>
        {/* <Text>{item.nameRestaurants}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 200,
    alignItems: 'center',
  },
  img: {
    flex: 1,
    width: '89%',
    alignItems: 'center',
    borderRadius: 8,
  },
  content: {
    alignItems: 'center',
  },
});
