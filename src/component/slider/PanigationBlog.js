import { StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";
const { width } = Dimensions.get('screen')

export default function PanigationBlog({ data, scrollx, index }) {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]
        const dotWidth = scrollx.interpolate({
          inputRange,
          outputRange: [6, 6, 6],
          extrapolate: 'clamp',
        })
        const backgroundColor = scrollx.interpolate({
          inputRange,
          outputRange: ["#00185850", "#FEF6E4", "#00185850"],
          extrapolate: 'clamp',
        })
        return <Animated.View key={idx.toString()} style={[styles.dot, { width: dotWidth, backgroundColor },
        ]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 4.5,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    height: 6,
    borderRadius: 50,
    backgroundColor: "#D42323",
    marginHorizontal: 3,
  },

  dotActive: {
    backgroundColor: '#fff'
  }
});
