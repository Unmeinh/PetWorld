import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import PanigationImage from './PanigationImage';
import ImageSliderItem from './ItemSliderImage';

export default function SliderImage({data}) {
  const [index, setindex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
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
  const handlePanigationPress = selectedIndex => {
    setindex(selectedIndex);
    flatListRef.current.scrollToIndex({index: selectedIndex, animated: true});
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={{height: 320}}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        onScroll={handerOnScroll}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => <ImageSliderItem item={item} />}
        onViewableItemsChanged={handleOnViewItemChange}
        viewabilityConfig={viewabilityConfig}
      />
      <PanigationImage
        data={data}
        scrollx={scrollx}
        index={index}
        onPress={handlePanigationPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
