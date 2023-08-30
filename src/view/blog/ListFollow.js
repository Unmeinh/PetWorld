import {
    ScrollView, Text,
    View, Dimensions,
    SafeAreaView, TouchableOpacity,
    TouchableHighlight, Image, FlatList
} from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import styles from '../../styles/user.style';
import AutoHeightImage from 'react-native-auto-height-image';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../component/header/HeaderTitle';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from "react-redux";
import { selectFollowByID } from '../../redux/selectors/userSelector';
import { selectFollowUser } from '../../redux/actions/userAction';
import { RefreshControl } from "react-native-gesture-handler";
import ViewAccountModal from "../../component/modals/ViewAccountModal";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import temp from '../../data/user';
const ListFollow = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const arr_follow = useSelector(selectFollowByID);
    const [isRefreshing, setisRefreshing] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
    const [isLoader, setisLoader] = useState(true);

    useEffect(() => {
        if (isLoader) {
            setTimeout(() => {
                setisLoader(false);
            }, 5000);
        }
    }, [isLoader]);

    useEffect(() => {
        console.log(arr_follow);
        if (arr_follow != undefined && arr_follow != {}) {

        }
    }, [arr_follow]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            dispatch(selectFollowUser(route.params.idUser, route.params.typeFollow));
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    const ReloadData = React.useCallback(() => {
        setisRefreshing(true);
        setTimeout(() => {
            setisRefreshing(false);
        }, 2000);
    }, []);

    const ItemUser = (row) => {
        var idUser = row.user;
        var user = temp.find(e => e._id == idUser);
        const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
        const [isFollowing, setisFollowing] = useState(true);
        const [isShowAccount, setisShowAccount] = useState(false);

        function OnFollow() {
            if (isFollowing) {
                setisFollowing(false);
            } else {
                setisFollowing(true);
            }
        }

        React.useEffect(() => {
            if (user != undefined && srcAvatar == require('../../assets/images/error.png')) {
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
                                <Text style={{ color: 'rgba(0, 0, 0, 0.70)', fontFamily: 'ProductSans', fontSize: 13, width: "60%", marginLeft: 3 }}
                                    numberOfLines={2}>
                                    {(user.description != undefined) ? user.description : "Chưa có giới thiệu"}
                                </Text>
                                <View>
                                    {
                                        (isFollowing)
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
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    (isShowAccount)
                        ? <ViewAccountModal isShow={isShowAccount} info={user} callBack={() => setisShowAccount(false)} />
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
                        shimmerColors={colorLoader}
                        shimmerStyle={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ marginLeft: 7 }}>
                        <ShimmerPlaceHolder
                            shimmerColors={colorLoader}
                            shimmerStyle={{ fontSize: 17, width: '50%', borderRadius: 5 }} />
                        <View style={{ width: Dimensions.get('window').width - 80, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ marginLeft: 3, fontSize: 15, width: '40%', borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
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
            <View style={{flex: 1, paddingTop: 15}}>
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
                                (arr_follow.length > 0)
                                    ?
                                    <FlatList data={arr_follow} scrollEnabled={false}
                                        renderItem={({ item, index }) =>
                                            <ItemUser key={index} user={item} navigation={navigation} />}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        refreshControl={
                                            <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={0} />
                                        } />
                                    :
                                    <View style={styles.viewOther}>
                                        {/* <AutoHeightImage source={require('../../assets/images/no_post.png')}
                        width={(Dimensions.get("window").width * 75) / 100} /> */}
                                        <Text style={styles.textHint}>Không có người nào..</Text>
                                    </View>
                            }
                        </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default memo(ListFollow);