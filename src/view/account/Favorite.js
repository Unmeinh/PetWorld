import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Favorite = () => (
  <View>
    <Text style={styles.blackText}>
      Hello, World!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  blackText: {
    color: 'black', // Đặt màu chữ thành màu đen
  },
});

export default Favorite;
