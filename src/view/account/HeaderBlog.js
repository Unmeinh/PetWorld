import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-animatable';

export default function HeaderBlog({ scrollRef, onScrollView }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatarImage} source={require('../account/avatar.png')} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>Vergil.</Text>
      </View>
      <View style={styles.pngContainer}>
        <Text style={styles.pngImage}>...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Xếp hàng ngang
    alignItems: 'center', // Canh giữa theo chiều dọc
    backgroundColor: '#FEF6E4',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatarContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center', // Canh giữa theo chiều dọc
    alignItems: 'center', // Canh giữa theo chiều ngang
    marginRight: 10,
  },
  avatarImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  nameContainer: {
    flex: 1, // Chia đều không gian còn lại
    marginRight: 10,
  },
  nameText: {
    fontSize: 16,
    color: '#001858',
  },
  pngContainer: {
    width: 30,
    height: 30,
    
    justifyContent: 'center', // Canh giữa theo chiều dọc
    alignItems: 'center', // Canh giữa theo chiều ngang
  },
  pngImage: {
    color:'black',
    width: 50,
    height: 50,
    fontSize:30,
  },
});
