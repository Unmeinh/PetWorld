import {
    Animated,
    Dimensions,
    FlatList, View,
    Image,
    Pressable
} from 'react-native';
import React, { useRef, useState } from 'react';
import PanigationBlog from './PanigationBlog';

export default function BlogImageSlider({ array, aspectRatio }) {
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

    const handleOnViewItemChange = useRef(({ viewableItems }) => {
        setindex(viewableItems[0]?.index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const SliderItem = ({ item }) => {
        return (
            <Pressable style={{ width: Dimensions.get('window').width }}>
                <Image source={{ uri: String(item) }} style={{ width: Dimensions.get('window').width, aspectRatio: aspectRatio }} />
            </Pressable>
        );
    }

    return (
        <View>
            <FlatList
                horizontal
                pagingEnabled
                onScroll={handerOnScroll}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                data={array}
                renderItem={({ item }) => <SliderItem item={item} />}
                onViewableItemsChanged={handleOnViewItemChange}
                viewabilityConfig={viewabilityConfig}
            />
            <PanigationBlog data={array} scrollx={scrollx} index={index} />
        </View>
    );
}
