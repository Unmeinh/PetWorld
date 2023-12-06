import {
    View, Dimensions,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../styles/blog.style';
import ShimmerPlaceHolder from "../layout/ShimmerPlaceHolder";

export default function ItemBlogLoader() {
    var imageW = Dimensions.get('window').width;
    var imageH = imageW * 2 / 3;

    return (
        <View>
            <View>
                <View style={styles.viewInfo}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.imageAvatar}
                        />
                        <ShimmerPlaceHolder
                            shimmerStyle={[styles.textName, { borderRadius: 5 }]}
                        />
                    </View>

                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: 25, height: 10, borderRadius: 5 }} />
                </View>

                <ShimmerPlaceHolder
                    shimmerStyle={{ width: imageW, height: imageH }}
                />

                <View style={styles.viewBelowPost}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewRowInteract}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: 27, height: 27, borderRadius: 20 }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerStyle={[styles.textInteract, { width: 20, borderRadius: 5 }]}
                                />
                            </View>

                            <View style={styles.viewRowInteract}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: 27, height: 27, borderRadius: 20 }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerStyle={[styles.textInteract, { width: 20, borderRadius: 5, }]}
                                />
                            </View>
                        </View>
                        <View style={[styles.viewRowInteract, { marginRight: 0 }]}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 27, height: 27, borderRadius: 20 }}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 7 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={[styles.textContent, { width: '50%', borderRadius: 5 }]}
                        />
                    </View>
                    <ShimmerPlaceHolder
                        shimmerStyle={[{ width: '30%', height: 12, borderRadius: 5 }]}
                    />
                </View>

                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)', height: 1 }}></View>
            </View>
        </View>
    )
}