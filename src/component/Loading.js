import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <View style={styles.content}>
        <ActivityIndicator size={'large'} color={'#F582AE'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    backgroundColor: 'rgba(20, 20, 20,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFF',
    width: 60,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
