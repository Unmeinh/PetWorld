import {
    Text,
    View, TouchableOpacity,
    Image,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../styles/comment.style";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function ItemCommentLoader(row) {
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    return (
        <View style={styles.viewComment}>
            <ShimmerPlaceHolder
                shimmerStyle={styles.avatarComment}
                shimmerColors={colorLoader}
            />
            <View style={styles.viewContent}>
                <ShimmerPlaceHolder
                    shimmerStyle={styles.contentComment}
                    shimmerColors={colorLoader}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewRowInteract}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.iconInteractComment}
                            shimmerColors={colorLoader} />
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.textInteractComment}
                            shimmerColors={colorLoader} />
                    </View>
                </View>
            </View>
        </View>
    )
}