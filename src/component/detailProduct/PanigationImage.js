import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');

export default function PanigationImage({data, scrollx, index, onPress}) {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollx.interpolate({
          inputRange,
          outputRange: [60, 60, 60],
          extrapolate: 'clamp',
        });
        const borderColor = scrollx.interpolate({
          inputRange,
          outputRange: ['#F3D2C1', '#F582AE', '#F3D2C1'],
          extrapolate: 'clamp',
        });
        return (
          <TouchableOpacity
           key={idx.toString()}
            onPress={() => onPress(idx)}>
            <Animated.Image
              source={_}
             
              style={[styles.dot, {width: dotWidth, borderColor}]} // Thay đổi backgroundColor thành borderColor
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: '100%',
    height: 60,
    borderWidth: 2.5, // Thêm borderWidth để tạo viền
    marginHorizontal: 8,
    borderRadius: 8,
  },
});