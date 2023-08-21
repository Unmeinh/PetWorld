import {
    Text, Pressable,
    View, TouchableOpacity,
    TouchableHighlight, Image,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import styles from "../../styles/user.style";
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ViewAccountModal = (route) => {
    const navigation = useNavigation();
    const infoUser = route.info;
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isFollow, setisFollow] = useState(false);
    const [blogCount, setblogCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);
    const [followerCount, setfollowerCount] = useState(0);
    const [isLoader, setisLoader] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    function getMyID() {
        return "001";
    }

    function OpenAccount() {
        route.callBack();
        if (getMyID() == infoUser._id)
            navigation.navigate('MyPage');
        else
            navigation.navigate('ViewPage', { idUser: infoUser._id });
    }

    function OnFollow() {
        if (isFollow) {
            setisFollow(false);
        } else {
            setisFollow(true);
        }
    }

    function OpenListFollow(type) {
        route.callBack();
        navigation.navigate('ListFollow', { idUser: infoUser._id, typeFollow: type });
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
                if (infoUser != undefined) {
                    setsrcAvatar({ uri: String(infoUser.avatarUser) });
                }
            }, 5000);
        }
    }, [isLoader]);

    const ModalAccount = () => {
        return (
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
                    <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => OpenListFollow('following')}>
                        <Text style={styles.textCountModal}>{followingCount}</Text>
                        <Text style={styles.detailCountModal}>Đang theo dõi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => OpenListFollow('follower')}>
                        < Text style={styles.textCountModal} > {followerCount}</Text>
                        <Text style={styles.detailCountModal}>Người theo dõi</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textDescModal}>
                    {
                        (infoUser.description != undefined)
                            ? infoUser.description
                            : "Chưa có giới thiệu"
                    }
                </Text>
                <TouchableOpacity style={styles.viewOptionModal}
                    onPress={OpenAccount}>
                    <Fontisto name="person" color={'#001858'} size={17} />
                    <Text style={styles.textOptionModal}>Xem trang cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewOptionModal}>
                    <MaterialCommunityIcons name="chat-plus" color={'#001858'} size={17} />
                    <Text style={styles.textOptionModal}>Gửi tin nhắn</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const ModalLoader = () => {
        return (
            <View style={styles.modalUser}>
                <ShimmerPlaceHolder
                    shimmerColors={colorLoader}
                    shimmerStyle={styles.modalUserAvatar} />
                <ShimmerPlaceHolder
                    shimmerColors={colorLoader}
                    shimmerStyle={[styles.modalUserName, { width: '30%', borderRadius: 5 }]} />
                <ShimmerPlaceHolder
                    shimmerColors={colorLoader}
                    shimmerStyle={{ width: '25%', height: 25, marginBottom: 13, borderRadius: 10 }} />
                <View style={styles.viewRowAroundModal}>
                    <View style={{ alignItems: 'center' }}>
                        <ShimmerPlaceHolder
                            shimmerColors={colorLoader}
                            shimmerStyle={{ width: 13, height: 13, borderRadius: 5, marginBottom: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerColors={colorLoader}
                            shimmerStyle={{ width: 40, height: 9, borderRadius: 5 }} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <ShimmerPlaceHolder
                            shimmerColors={colorLoader}
                            shimmerStyle={{ width: 13, height: 13, borderRadius: 5, marginBottom: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerColors={colorLoader}
                            shimmerStyle={{ width: 60, height: 9, borderRadius: 5 }} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <ShimmerPlaceHolder
                            shimmerColors={colorLoader}
                            shimmerStyle={{ width: 13, height: 13, borderRadius: 5, marginBottom: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerColors={colorLoader}
                            shimmerStyle={{ width: 60, height: 9, borderRadius: 5 }} />
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'flex-start' }}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorLoader}
                        shimmerStyle={{ width: '50%', borderRadius: 5, marginTop: 15, marginBottom: 7, marginHorizontal: 20 }} />
                </View>
                <View style={styles.viewOptionModal} >
                    <ShimmerPlaceHolder
                        shimmerColors={colorLoader}
                        shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                    <ShimmerPlaceHolder
                        shimmerColors={colorLoader}
                        shimmerStyle={{ width: '35%', borderRadius: 5, marginLeft: 15 }} />
                </View>
                <View style={styles.viewOptionModal}>
                    <ShimmerPlaceHolder
                        shimmerColors={colorLoader}
                        shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                    <ShimmerPlaceHolder
                        shimmerColors={colorLoader}
                        shimmerStyle={{ width: '35%', borderRadius: 5, marginLeft: 15 }} />
                </View>
            </View>
        )
    }

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
                {
                    (isLoader)
                        ? <ModalLoader />
                        : <ModalAccount />
                }
            </View >
        </Modal >
    );
};

export default memo(ViewAccountModal);