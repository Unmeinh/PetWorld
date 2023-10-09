import {
    ScrollView, Text,
    View, Dimensions,
    SafeAreaView, TouchableOpacity,
    TouchableHighlight, Image, FlatList
} from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import styles from '../../styles/user.style';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../component/header/HeaderTitle';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from "react-redux";
import { userLoginId } from '../../redux/selectors/userSelector';
import { RefreshControl } from "react-native-gesture-handler";
import ViewAccountModal from "../../component/modals/ViewAccountModal";
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import { changeBlogIsFollow } from "../../redux/reducers/blog/blogReducer";
import { onAxiosGet, onAxiosPost } from '../../api/axios.function';

const ListFollow = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let loginId = useSelector(userLoginId);
    const [follows, setfollows] = useState(undefined);
    const [isFocusScreen, setisFocusScreen] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isLoader, setisLoader] = useState(true);

    async function fetchMyFollow(flType) {
        let res = null;
        if (flType == "following") {
            res = await onAxiosGet('/follow/list/myFollowing');
        } else {
            res = await onAxiosGet('/follow/list/myFollower');
        }
        if (res) {
            setfollows(res.data);
        } else {
            setfollows([]);
        }
    }

    async function fetchUserFollow(flType, idUser) {
        let res = null;
        if (flType == "following") {
            res = await onAxiosGet('/follow/list/following/' + idUser);
        } else {
            res = await onAxiosGet('/follow/list/follower/' + idUser);
        }
        if (res) {
            setfollows(res.data);
        } else {
            setfollows([]);
        }
    }

    function fetchFollows() {
        if (String(route.params.idUser) == String(loginId)) {
            fetchMyFollow(route.params.typeFollow);
        } else {
            fetchUserFollow(route.params.typeFollow, route.params.idUser);
        }
    }

    useEffect(() => {
        if (follows != undefined) {
            setisLoader(false);
        }
    }, [follows]);

    useEffect(() => {
        if (isFocusScreen) {
            if (follows == undefined) {
                setisLoader(true);
                fetchFollows();
            } else {
                fetchFollows();
            }
        }
    }, [isFocusScreen]);

    useEffect(() => {
        const unsubFocus = navigation.addListener('focus', () => {
            setisFocusScreen(true);
            return () => {
                unsubFocus.remove();
            };
        });

        const unsubBlur = navigation.addListener('blur', () => {
            setisFocusScreen(false);
            return () => {
                unsubBlur.remove();
            };
        });

        const unsubRemove = navigation.addListener('beforeRemove', () => {
            setisFocusScreen(false);
            return () => {
                unsubRemove.remove();
            };
        });

    }, [navigation]);

    const ReloadData = React.useCallback(() => {
        setisRefreshing(true);
        setTimeout(() => {
            setisRefreshing(false);
        }, 2000);
    }, []);

    const ItemUser = (row) => {
        let user = row.item.idFollow;
        const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
        const [typeFollow, settypeFollow] = useState((row.item.isFollowed) ? row.item.isFollowed : 0)
        const [isFollowed, setisFollowed] = useState((row.item.isFollowed == 0) ? true : false);
        const [isShowAccount, setisShowAccount] = useState(false);

        function onCallbackFollow(isFl) {
            settypeFollow((isFl) ? 0 : 1);
            setisFollowed(isFl);
            dispatch(changeBlogIsFollow([user._id, isFl]));
        }

        async function OnFollow() {
            let fl = isFollowed;
            setisFollowed(!fl);
            settypeFollow((!fl) ? 0 : 1);
            let res = await onAxiosPost('follow/insert', { idFollow: user._id }, 'json', false);
            if (res) {
                dispatch(changeBlogIsFollow([user._id, !fl]));
            } else {
                isFollowed(fl);
            }
        }

        React.useEffect(() => {
            if (user != undefined && srcAvatar == require('../../assets/images/loading.png')) {
                setsrcAvatar({ uri: String(user.avatarUser) });
            }
        }, [user]);

        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setisShowAccount(true)}>
                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                            style={{ height: 50, width: 50, borderRadius: 50 }} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 7 }}>
                        <TouchableOpacity onPress={() => setisShowAccount(true)}>
                            <Text style={styles.followerTextName} numberOfLines={1}>
                                {user.fullName}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: Dimensions.get('window').width - 80, }}>
                            <View style={{ marginTop: 7, justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ color: 'rgba(0, 0, 0, 0.70)', fontFamily: 'ProductSans', fontSize: 13, width: (typeFollow > -1) ? "60%" : "97%", marginLeft: 3 }}
                                    numberOfLines={2}>
                                    {user.description}
                                </Text>
                                <View>
                                    {
                                        (typeFollow > -1)
                                            ?
                                            <>
                                                {
                                                    (typeFollow == 0)
                                                        ? <TouchableHighlight style={[styles.buttonFollow, { backgroundColor: '#8BD3DD' }]}
                                                            activeOpacity={0.5} underlayColor="#63AAB4"
                                                            onPress={OnFollow}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Entypo name="check" color={'#001858'} size={13} />
                                                                <Text style={styles.textButtonHeader}>Đang theo dõi</Text>
                                                            </View>
                                                        </TouchableHighlight>
                                                        : <TouchableHighlight style={[styles.buttonFollow, { backgroundColor: '#F582AE' }]}
                                                            activeOpacity={0.5} underlayColor="#DC749C"
                                                            onPress={OnFollow}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Entypo name="plus" color={'#FEF6E4'} size={13} />
                                                                <Text style={[styles.textButtonHeader, { color: '#FEF6E4' }]}>Theo dõi</Text>
                                                            </View>
                                                        </TouchableHighlight>
                                                }
                                            </>
                                            : ""
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    (isShowAccount)
                        ? <ViewAccountModal isShow={isShowAccount} isFollow={isFollowed} info={user} callBack={() => setisShowAccount(false)} callbackFollow={onCallbackFollow} />
                        : ""
                }
            </View>
        )
    }

    const ItemUserLoader = () => {
        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <ShimmerPlaceHolder
                        shimmerStyle={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ marginLeft: 7 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ fontSize: 17, width: '50%', borderRadius: 5 }} />
                        <View style={{ width: Dimensions.get('window').width - 80, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ marginLeft: 3, fontSize: 15, width: '40%', borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: 90, height: 25, borderRadius: 12 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
            {
                (route.params.typeFollow == "follower")
                    ? <HeaderTitle nav={navigation} titleHeader={"Danh sách người theo dõi"} colorHeader={"#FEF6E4"} />
                    : <HeaderTitle nav={navigation} titleHeader={"Danh sách đang theo dõi"} colorHeader={"#FEF6E4"} />
            }
            <View style={{ flex: 1, paddingTop: 15 }}>
                {
                    (isLoader)
                        ?
                        <View>
                            <ItemUserLoader />
                            <ItemUserLoader />
                        </View>
                        :
                        <View>
                            {
                                (follows.length > 0)
                                    ?
                                    <FlatList data={follows} scrollEnabled={false}
                                        renderItem={({ item, index }) =>
                                            <ItemUser key={index} item={item} navigation={navigation} />}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        refreshControl={
                                            <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={0} />
                                        } />
                                    :
                                    <View style={styles.viewOther}>
                                        <Feather name='user-x' size={70} color={'rgba(0, 0, 0, 0.5)'} />
                                        <Text style={styles.textHint}>Danh sách theo dõi trống..</Text>
                                    </View>
                            }
                        </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default memo(ListFollow);