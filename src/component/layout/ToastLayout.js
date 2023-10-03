import {
    View, Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import React from 'react';
import styles from '../../styles/toast.style';
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function ToastLayout() {

    const toastConfig = {
        success: ({ text1, props }) => (
            <View style={styles.toastContainer}>
                <Ionicons name='checkmark-circle' color={'#55B938'} size={35} />
                <Text style={styles.toastText}
                    numberOfLines={2}>
                    {text1}
                </Text>
                <View style={styles.viewToastType}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#55B93859', '#FFFFFF00']}
                        style={styles.circleToastType}>
                        <Text> </Text>
                    </LinearGradient>
                </View>
            </View>
        ),

        error: ({ text1, props }) => (
            <View style={styles.toastContainer}>
                <Ionicons name='close-circle' color={'#D65745'} size={35} />
                <Text style={styles.toastText}
                    numberOfLines={2}>
                    {text1}
                </Text>
                <View style={styles.viewToastType}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#D6574559', '#FFFFFF00']}
                        style={styles.circleToastType}>
                        <Text> </Text>
                    </LinearGradient>
                </View>
            </View>
        ),

        loading: ({ text1, props }) => (
            <>
                <View style={styles.toastContainer}>
                    <View>
                        <Progress.CircleSnail color={['#EAC645']} size={35} />
                    </View>
                    <Text style={styles.toastText}
                        numberOfLines={2}>
                        {text1}
                    </Text>
                    <View style={styles.viewToastType}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#EAC64559', '#FFFFFF00']}
                            style={styles.circleToastType}>
                            <Text> </Text>
                        </LinearGradient>
                    </View>
                </View>
                <View style={{
                    zIndex: 150,
                    backgroundColor: "#0000001A",
                    height: Dimensions.get('screen').height * 2,
                    width: Dimensions.get('window').width,
                    position: 'absolute',
                    top: -200
                }} />
            </>
        )
    };

    return (
        <>
            <Toast config={toastConfig} />
        </>
    );
}