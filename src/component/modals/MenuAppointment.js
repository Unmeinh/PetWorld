import {
    Text, Pressable,
    View, TouchableOpacity,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import styles from "../../styles/appointment.style";

const MenuAppointment = (route) => {
    const navigation = useNavigation();

    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            swipeDirection="down"
            propagateSwipe={true}
            backdropColor="rgba(0, 0, 0, 0.5)"
            onSwipeComplete={() => {
                route.callBack();
            }}
            onBackdropPress={() => {
                route.callBack();
            }}
            onBackButtonPress={() => {
                route.callBack();
            }}>
            <View style={styles.modalMenuContainer} >
                <View style={styles.menuAppointment}>
                    {/* View control */}
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={styles.swipeControlModal} />
                    </View>
                    <Pressable>
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 1 }}>
                            <Text style={styles.textOptionMenu}>Xem thú cưng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 1 }}>
                            <Text style={styles.textOptionMenu}>Nhắn tin cho shop</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={[styles.textOptionMenu, { color: '#EE3333' }]}>Hủy đặt chỗ</Text>
                        </TouchableOpacity>
                    </Pressable>
                </View>
            </View>
        </Modal >
    );
};

export default memo(MenuAppointment);