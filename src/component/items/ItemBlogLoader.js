import {
    View, Dimensions, 
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../styles/blog.style';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function ItemBlogLoader() {
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
    var imageW = Dimensions.get('window').width;
    var imageH = imageW * 2 / 3;

    return (
        <View>
            <View>
                <View style={styles.viewInfo}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <ShimerPlaceHolder
                            shimmerStyle={styles.imageAvatar}
                            shimmerColors={colorLoader}
                        />
                        <ShimerPlaceHolder
                            shimmerStyle={styles.textName}
                            shimmerColors={colorLoader}
                        />
                    </View>

                    <ShimerPlaceHolder
                        shimmerStyle={{ width: 25, height: 10 }}
                        shimmerColors={colorLoader}
                    />
                </View>

                <ShimerPlaceHolder
                    shimmerStyle={{ width: imageW, height: imageH }}
                    shimmerColors={colorLoader}
                />

                <View style={styles.viewBelowPost}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewRowInteract}>
                                <ShimerPlaceHolder
                                    shimmerStyle={{ width: 27, height: 27, borderRadius: 20 }}
                                    shimmerColors={colorLoader}
                                />
                                <ShimerPlaceHolder
                                    shimmerStyle={[styles.textInteract, { width: 20, }]}
                                    shimmerColors={colorLoader}
                                />
                            </View>

                            <View style={styles.viewRowInteract}>
                                <ShimerPlaceHolder
                                    shimmerStyle={{ width: 27, height: 27, borderRadius: 20 }}
                                    shimmerColors={colorLoader}
                                />
                                <ShimerPlaceHolder
                                    shimmerStyle={[styles.textInteract, { width: 20, }]}
                                    shimmerColors={colorLoader}
                                />
                            </View>
                        </View>
                        <View style={styles.viewRowInteract}>
                            <ShimerPlaceHolder
                                shimmerStyle={{ width: 27, height: 27, borderRadius: 20 }}
                                shimmerColors={colorLoader}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 7 }}>
                        <ShimerPlaceHolder
                            shimmerStyle={[styles.textContent, { width: '30%', }]}
                            shimmerColors={colorLoader}
                        />
                    </View>
                    <ShimerPlaceHolder
                        shimmerStyle={[styles.textTime, { width: '30%', }]}
                        shimmerColors={colorLoader}
                    />
                </View>

                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)', height: 1 }}></View>
            </View>
        </View>
    )
}