import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';

import SilderItem from './SilderItem';
import Panigation from './Panigation';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import slideshow from '../../data/slideshow';
const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);
 function Slider({isLoader}) {
  const [index, setindex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
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
    <View style={{height: 220}}>
      {(isLoader) ? <View style={{marginHorizontal:20}}>
        <ShimerPlaceHolder
          style={{width: '100%', height: '95%',borderRadius:10}}
          shimmerColors={colorLoader}></ShimerPlaceHolder>
      </View>: (<FlatList
        horizontal
        pagingEnabled
        onScroll={handerOnScroll}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        data={slideshow}
        renderItem={({item}) => <SilderItem item={item} />}
        onViewableItemsChanged={handleOnViewItemChange}
        viewabilityConfig={viewabilityConfig}
      />
      )}
     
      <Panigation data={slideshow} scrollx={scrollx} index={index} />
    </View>
  );
}

export default React.memo(Slider)
