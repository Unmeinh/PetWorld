import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function EmptyNotice() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/catNotify.json')}
        autoPlay
        loop
        style={styles.containerEmpty}
      />
      <Text style={styles.title}>Không có thông báo nào</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerEmpty: {
    width: '90%',
    aspectRatio: 1,
  },
  title: {
    fontFamily: 'ProductSans',
    fontSize: 17,
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
