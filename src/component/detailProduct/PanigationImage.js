import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');

export default function PanigationImage({data, scrollx, index, onPress}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
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
              key={index.toString()}
              onPress={() => onPress(index)}>
              <Animated.Image
                source={{uri: item}}
                style={[styles.dot, {width: dotWidth, borderColor}]} // Thay đổi backgroundColor thành borderColor
              />
            </TouchableOpacity>
          );
        }}
      />
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
    marginHorizontal:20,
    paddingRight:20,
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
