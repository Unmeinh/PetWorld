import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../data/slideshow';
import SilderItem from './SilderItem';
import Panigation from './Panigation';
export default function Slider() {
  const [index, setindex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const handerOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollx,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewItemChange = useRef(({viewableItems}) => {
    setindex(viewableItems[0].index);
  }).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
    <View style={{height:220}}>
      <FlatList
        horizontal
        pagingEnabled
        onScroll={handerOnScroll}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        data={Slides}
        renderItem={({item}) => <SilderItem item={item} />}
        onViewableItemsChanged={handleOnViewItemChange}
        viewabilityConfig={viewabilityConfig}
      />
      <Panigation data={Slides} scrollx={scrollx} index={index}  />
    </View>
  );
}

const styles = StyleSheet.create({});
