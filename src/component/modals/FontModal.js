import {
    Modal, Text,
    View, TouchableOpacity,
    ScrollView
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../styles/blog.style";
import Entypo from "react-native-vector-icons/Entypo";

var arrFont = ['Aclonica', 'Arialn', 'Garii', 'GothamMedium', 'LazyFox', 'MBFSpaceHabitat', 'MightyWings', 'OPPOSans', 'ProductSans', 'RobotoRegular', 'Sinistre', 'TikTokSans', 'WorkSans'];

const FontModal = (route) => {

    const ItemFont = (route) => {
        const PickFont = () => {
            if (route.inputFont == "") {
                route.callBack("Default");
            } else {
                route.callBack(route.inputFont);
            }
        }

        return (
            <TouchableOpacity style={styles.viewItemFont}
                onPress={PickFont}>
                <Text style={[styles.textItemFont, { fontFamily: String(route.inputFont) }]}>
                    {route.nameFont}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <Modal
                visible={route.isShow}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    route.callBack(route.font);
                }}>
                <View style={styles.backgroundModal}>
                    <View style={styles.viewDialog}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.buttonBackDialog}
                                onPress={() => {
                                    route.callBack(route.font);
                                }}>
                                <Entypo name="arrow-left" size={25} color={"#001858"} />
                            </TouchableOpacity>
                            <Text style={styles.titleDialog}>Chọn phông chữ</Text>
                        </View>
                        <ScrollView style={styles.scrollViewDialog}>
                            <View>
                                <ItemFont inputFont={""} nameFont={"Hệ thống"} callBack={route.callBack}/>
                                {
                                    arrFont.map((font, index, arr) => {
                                        return <ItemFont inputFont={font} nameFont={font} callBack={route.callBack} key={index}/>
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


export default FontModal;