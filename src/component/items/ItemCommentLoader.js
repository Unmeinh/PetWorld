import {
    Text,
    View, TouchableOpacity,
    Image,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../styles/comment.style";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function ItemCommentLoader(row) {
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    return (
        <View style={styles.viewComment}>
            <ShimerPlaceHolder
                shimmerStyle={styles.avatarComment}
                shimmerColors={colorLoader}
            />
            <View style={styles.viewContent}>
                <ShimerPlaceHolder
                    shimmerStyle={styles.contentComment}
                    shimmerColors={colorLoader}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewRowInteract}>
                        <ShimerPlaceHolder
                            shimmerStyle={styles.iconInteractComment}
                            shimmerColors={colorLoader} />
                        <ShimerPlaceHolder
                            shimmerStyle={styles.textInteractComment}
                            shimmerColors={colorLoader} />
                    </View>
                </View>
            </View>
        </View>
    )
}