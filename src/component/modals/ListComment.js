import {
    Modal, Text,
    View, TouchableOpacity,
    TouchableHighlight, Image
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../styles/comment.style";
import Entypo from "react-native-vector-icons/Entypo";

const ListComment = (route) => {
    const [srcAvatar, setsrcAvatar] = useState({ uri: '' });

    function OpenAccount() {

    }

    function OnFollow() {

    }

    const ItemComment = (route) => {

        return (
            <View>

            </View>
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
                        <View style={styles.viewInfo}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/image/error.png'))}
                                        style={styles.imageAvatar} />
                                </TouchableOpacity>
                                <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}>
                                    <Text style={styles.textName}>fullName</Text>
                                </TouchableHighlight>
                            </View>

                            <TouchableHighlight underlayColor={'#8BD3DD'} activeOpacity={0.5}>
                                <Entypo name='dots-three-horizontal' size={25} color={'#001858'} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


export default ListComment;