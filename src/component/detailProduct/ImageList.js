import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

const IMAGE_WIDTH = 120;
const IMAGE_HEIGH = 120;

const ImageList = ({images, shift = 0, onPress}) => (
  <ScrollView
    horizontal
    style={styles.root}
    contentOffset={{x: shift * IMAGE_WIDTH, y: 0}}
    contentContainerStyle={styles.container}>
    {images.map((imageUrl, index) => (
      <TouchableOpacity
        style={styles.button}
        key={`${imageUrl}_${index}`}
        activeOpacity={0.8}
        onPress={() => onPress(index)}>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  root: {flexGrow: 0},
  container: {
    flex: 0,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    marginRight: 10,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGH,
    borderRadius: 10,
  },
});

export default ImageList;
