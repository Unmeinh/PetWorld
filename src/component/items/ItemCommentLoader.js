import {
    Text,
    View, TouchableOpacity,
    Image,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../styles/comment.style";
import ShimmerPlaceHolder from "../layout/ShimmerPlaceHolder";

export default function ItemCommentLoader(row) {

    return (
        <View style={styles.viewComment}>
            <ShimmerPlaceHolder
                shimmerStyle={styles.avatarComment}
            />
            <View style={styles.viewContent}>
                <ShimmerPlaceHolder
                    shimmerStyle={styles.contentComment}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewRowInteract}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.iconInteractComment}
                        />
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.textInteractComment}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}