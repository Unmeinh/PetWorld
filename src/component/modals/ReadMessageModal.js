import {
    Text, Pressable,
    View, Dimensions,
    TouchableOpacity,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import Modal from 'react-native-modal';
import styles from "../../styles/appointment.style";
const WindowWidth = Dimensions.get("window").width;

const ReadMessageModal = (route) => {
    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            backdropColor="rgba(0, 0, 0, 0.5)"
            onBackdropPress={route.callBackHide}
            onBackButtonPress={route.callBackHide}>
            <View style={{
                flex: 1,
                width: WindowWidth
            }} >
                <View style={{
                    width: "100%",
                    backgroundColor: '#F2F2F2',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    position: 'absolute',
                    left: -20, bottom: -20,
                    paddingVertical: 7
                }}>
                    {/* View control */}
                    <Pressable>
                        <View style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 20 }}>
                            <Text style={[{ color: '#001858', fontSize: 17, fontWeight: 'bold', lineHeight: 25 }]}>
                                Cho phép OurPet Seller đọc tin nhắn bên dưới và tự động điền mã xác minh?
                            </Text>
                            <Text style={[{ color: '#001858', fontSize: 16, color: 'rgba(0, 0, 0, 0.60)', marginTop: 13 }]}>
                                {route?.massage}
                            </Text>
                            <View style={[{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginTop: 20 }]}>
                                <TouchableOpacity style={[{ backgroundColor: '#F2F2F2', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginRight: 20 }]}
                                    onPress={route?.onDeny}>
                                    <Text style={[{ color: '#F582AE', fontSize: 17, fontWeight: 'bold' }]}>Từ chối</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ backgroundColor: '#F582AE', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }]}
                                    onPress={route?.onAllow}>
                                    <Text style={[{ color: '#FEF6E4', fontSize: 17, fontWeight: 'bold' }]}>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal >
    );
};

export default memo(ReadMessageModal);