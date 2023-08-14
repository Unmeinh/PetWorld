import {
    Text, Pressable,
    View, TouchableOpacity,
    TouchableHighlight, Image,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import Modal from 'react-native-modal';
import styles from "../../styles/user.style";
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ViewAccountModal = (route) => {
    const [infoUser, setinfoUser] = useState(route.info);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isFollow, setisFollow] = useState(false);
    const [blogCount, setblogCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);
    const [followerCount, setfollowerCount] = useState(0);
    const [isLoader, setisLoader] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
    console.log("Render");

    function OpenAccount() {

    }

    function OnFollow() {
        if (isFollow) {
            setisFollow(false);
        } else {
            setisFollow(true);
        }
    }

    React.useEffect(() => {
        if (route.isShow) {
            setisLoader(true);
        }
    }, [route.isShow]);

    React.useEffect(() => {
        if (isLoader) {
            setTimeout(() => {
                setisLoader(false);
            }, 5000);
        }
    }, [isLoader]);

    React.useEffect(() => {
        if (infoUser != undefined) {
            setsrcAvatar({ uri: String(infoUser.avatarUser) });
        }
    }, [infoUser]);

    return (
        <Modal
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            swipeDirection="right"
            propagateSwipe={true}
            onSwipeComplete={() => {
                route.callBack();
            }}
            onBackdropPress={() => {
                route.callBack();
            }}
            onBackButtonPress={() => {
                route.callBack();
            }}>
            <View style={styles.modalUserContainer} >
                <View style={styles.modalUser}>
                    <Image source={srcAvatar} style={styles.modalUserAvatar} />
                    <Text style={styles.modalUserName} numberOfLines={1}>{infoUser.fullName}</Text>
                    {
                        (isFollow)
                            ? <TouchableHighlight style={[styles.buttonFLModal, { backgroundColor: '#8BD3DD' }]}
                                activeOpacity={0.5} underlayColor="#63AAB4"
                                onPress={OnFollow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Entypo name="check" color={'#001858'} size={13} />
                                    <Text style={[styles.textButtonFLModal, { color: '#001858' }]}>Đang theo dõi</Text>
                                </View>
                            </TouchableHighlight>
                            : <TouchableHighlight style={[styles.buttonFLModal, { backgroundColor: '#F582AE' }]}
                                activeOpacity={0.5} underlayColor="#DC749C"
                                onPress={OnFollow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Entypo name="plus" color={'#FEF6E4'} size={13} />
                                    <Text style={styles.textButtonFLModal}>Theo dõi</Text>
                                </View>
                            </TouchableHighlight>
                    }
                    <View style={styles.viewRowAroundModal}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textCountModal}>{blogCount}</Text>
                            <Text style={styles.detailCountModal}>Bài viết</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textCountModal}>{followingCount}</Text>
                            <Text style={styles.detailCountModal}>Đang theo dõi</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textCountModal}>{followerCount}</Text>
                            <Text style={styles.detailCountModal}>Người theo dõi</Text>
                        </View>
                    </View>
                    <Text style={styles.textDescModal}>
                        {
                            (infoUser.description != undefined)
                                ? infoUser.description
                                : "Chưa có giới thiệu"
                        }
                    </Text>
                    <View style={styles.viewOptionModal}>
                        <Fontisto name="person" color={'#001858'} size={17} />
                        <Text style={styles.textOptionModal}>Xem trang cá nhân</Text>
                    </View>
                    <View style={styles.viewOptionModal}>
                        <MaterialCommunityIcons name="chat-plus" color={'#001858'} size={17} />
                        <Text style={styles.textOptionModal}>Gửi tin nhắn</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default memo(ViewAccountModal);