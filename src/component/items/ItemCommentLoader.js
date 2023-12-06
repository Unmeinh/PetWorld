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
                    shimmerStyle={[styles.contentComment, { borderRadius: 5 }]}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewRowInteract}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.iconInteractComment}
                        />
                        <ShimmerPlaceHolder
                            shimmerStyle={[styles.textInteractComment, { borderRadius: 5 }]}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}