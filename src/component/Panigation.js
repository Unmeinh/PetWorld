import { StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";
const {width} = Dimensions.get('screen')
export default function Panigation({ data ,scrollx,index}) {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange =[(idx-1) *width,idx*width,(idx+1)*width]
        const dotWidth = scrollx.interpolate({
            inputRange,
            outputRange:[12,15,12],
            extrapolate:'clamp',
        })
        const backgroundColor = scrollx.interpolate({
            inputRange,
            outputRange:["#F3D2C1","#F582AE","#F3D2C1"],
            extrapolate:'clamp',
        })
        return <Animated.View key={idx.toString()} style={[styles.dot ,{width:dotWidth,backgroundColor},
       
        ]} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom:0,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    
  },
  dot: {
    width: 12,
    height: 3,
    borderRadius: 6,
    backgroundColor: "#D42323",
    marginHorizontal: 3,
  },
  dotActive:{
    backgroundColor:'#D42323'
  }
});
