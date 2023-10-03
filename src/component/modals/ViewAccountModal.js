import {
    Text, Pressable,
    View, TouchableOpacity,
    TouchableHighlight, Image,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Modal from 'react-native-modal';
import styles from "../../styles/user.style";
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { userLoginId } from '../../redux/selectors/userSelector';
import { useSelector } from "react-redux";
import { onAxiosPost } from "../../api/axios.function";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShimmerPlaceHolder from "../layout/ShimmerPlaceHolder";

const ViewAccountModal = (route) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const infoUser = route.info;
    var loginId = useSelector(userLoginId);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isFollow, setisFollow] = useState(route.isFollow);
    const [isLoader, setisLoader] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    function OpenAccount() {
        route.callBack();
        if (loginId == infoUser._id)
            navigation.push('MyPage');
        else {
            navigation.push('ViewPage', { idUser: infoUser._id });
        }
    }

    async function OnFollow() {
        let fl = isFollow;
        setisFollow(!fl);
        let res = await onAxiosPost('follow/insert', { idFollow: infoUser._id }, 'json', false);
        if (res) {
            route.callbackFollow(!fl);
        } else {
            setisFollow(fl);
        }
    }

    function OpenListFollow(type) {
        route.callBack();
        navigation.push('ListFollow', { idUser: infoUser._id, typeFollow: type });
    }

    React.useEffect(() => {
        if (route.isShow) {
            setisLoader(true);
        }
    }, [route.isShow]);

    React.useEffect(() => {
        if (infoUser != undefined) {
            setisLoader(false);
            setsrcAvatar({ uri: String(infoUser.avatarUser) });
        }
    }, [infoUser]);

    const ModalAccount = () => {
        return (
            <View style={styles.modalUser}>
                <View>
                    <Image source={srcAvatar} style={styles.modalUserAvatar} />
                    <View style={styles.viewContentOnline}>
                        {
                            (infoUser.idAccount.online == 0)
                                ? <View style={styles.contentOnline} />
                                : <>
                                    <View style={styles.topOfline} />
                                    <View style={styles.contentOfline} />
                                </>
                        }
                    </View>
                </View>
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
                        <Text style={styles.textCountModal}>{infoUser.blogs}</Text>
                        <Text style={styles.detailCountModal}>Bài viết</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => OpenListFollow('following')}>
                        <Text style={styles.textCountModal}>{infoUser.followings.length}</Text>
                        <Text style={styles.detailCountModal}>Đang theo dõi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => OpenListFollow('follower')}>
                        < Text style={styles.textCountModal} > {infoUser.followers.length}</Text>
                        <Text style={styles.detailCountModal}>Người theo dõi</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textDescModal} numberOfLines={4}>
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