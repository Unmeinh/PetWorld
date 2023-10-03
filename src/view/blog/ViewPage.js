import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Text, Image,
    SafeAreaView,
    ScrollView, View,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import styles from '../../styles/user.style';
import { CollapsibleTabs } from '../../component/layout/indexCollapsibleTab';
import { TabInfo, TabBlog } from './TabItemPage';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID, userSelectStatus } from '../../redux/selectors/userSelector';
import { selectBlogsByUser, blogSelectStatus } from '../../redux/selectors/blogSelector';
import { fetchInfoUser } from '../../redux/reducers/user/userReducer';
import { fetchBlogsUser } from '../../redux/reducers/blog/blogReducer';
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import { RefreshControl } from "react-native-gesture-handler";
import MenuContext from '../../component/menu/MenuContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const ViewPage = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const infoUser = useSelector(selectUserByID);
    const uSelectStatus = useSelector(userSelectStatus);
    const arr_blog = useSelector(selectBlogsByUser);
    const bSelectStatus = useSelector(blogSelectStatus);
    const [isFollowing, setisFollowing] = useState(false);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isLoadingUser, setisLoadingUser] = useState(true);
    const [isLoadingBlog, setisLoadingBlog] = useState(true);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
    const menuNames = ["Gửi email", "Báo cáo"];
    const menuFunctions = [];

    //Use effect    
    useEffect(() => {
        console.log(uSelectStatus);
        if (isLoadingUser) {
            if (uSelectStatus == "being idle") {
                console.log(infoUser);
                setsrcAvatar({ uri: String(infoUser.avatarUser) });
                dispatch(fetchBlogsUser(infoUser._id));
                setisLoadingUser(false);
            }
        }
    }, [uSelectStatus, infoUser, isLoadingUser]);

    useEffect(() => {
        if (isLoadingBlog) {
            if (bSelectStatus == "being idle") {
                setisLoadingBlog(false);
            }
            if (bSelectStatus == "loading") {
                setisLoadingBlog(true);
            }
        }
    }, [bSelectStatus]);

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            if (route.params.idUser) {
                dispatch(fetchInfoUser(route.params.idUser));
            }
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    function callBackSetLoader() {
        setisLoader(false);
    }

    const LoaderHeader = () => {
        return (
            <>
                <View style={styles.headerExtend}>
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.pageUserAvatar} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '35%', height: 20, marginLeft: 20, borderRadius: 5 }} />
                        <View style={styles.viewButtonHeader}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: 75, height: 30, borderRadius: 12 }} />
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: 75, height: 30, borderRadius: 12, marginLeft: 10 }} />
                        </View>
                    </View>
                    <View style={styles.viewRowAroundPage}>
                        <View style={{ alignItems: 'center' }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 15, height: 15, borderRadius: 5, marginBottom: 5 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 50, height: 10, borderRadius: 5 }} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 15, height: 15, borderRadius: 5, marginBottom: 5 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 70, height: 10, borderRadius: 5 }} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 15, height: 15, borderRadius: 5, marginBottom: 5 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 70, height: 10, borderRadius: 5 }} />
                        </View>
                    </View>
                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: '50%', borderRadius: 5, marginVertical: 15, marginHorizontal: 20 }} />
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 70, height: 15, borderRadius: 5, marginVertical: 15 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 70, height: 15, borderRadius: 5, marginVertical: 15 }} />
                    </View>
                    <View style={{ width: '50%', backgroundColor: "#F582AE", height: 2 }} />
                    <View style={{ height: 1, width: '100%', backgroundColor: '#FEF6E4', shadowColor: '#000', elevation: 3, zIndex: 100, marginBottom: 10 }} />
                </View>
            </>
        )
    }

    const HeaderView = () => {
        function OnFollow() {
            if (isFollowing) {
                setisFollowing(false);
            } else {
                setisFollowing(true);
            }
        }

        function OpenListFollow(type) {
            navigation.push('ListFollow', { idUser: infoUser._id, typeFollow: type, typeUser: "user" });
        }

        return (
            <View style={styles.headerExtend}>
                {
                    (infoUser)
                        ? <View>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <Image source={srcAvatar} style={styles.pageUserAvatar}
                                    onError={() => setsrcAvatar(require('../../assets/images/error.png'))} />
                                <Text style={[styles.pageTextName, { marginLeft: 20 }]}
                                    numberOfLines={2}>{infoUser.fullName}
                                    {
                                        (infoUser.nickName == "Chưa thiết lập")
                                            ? ""
                                            : <Text style={styles.pageTextNickName}
                                                numberOfLines={2}> ({infoUser.nickName})</Text>
                                    }
                                </Text>
                                <View style={styles.viewButtonHeader}>
                                    <TouchableHighlight style={styles.buttonHeader}>
                                        <Text style={styles.textButtonHeader}>Nhắn tin</Text>
                                    </TouchableHighlight>
                                    {
                                        (isFollowing)
                                            ? <TouchableHighlight style={[styles.buttonHeader, { backgroundColor: '#8BD3DD' }]}
                                                activeOpacity={0.5} underlayColor="#63AAB4"
                                                onPress={OnFollow}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Entypo name="check" color={'#001858'} size={13} />
                                                    <Text style={styles.textButtonHeader}>Đang theo dõi</Text>
                                                </View>
                                            </TouchableHighlight>
                                            : <TouchableHighlight style={[styles.buttonHeader, { backgroundColor: '#F582AE' }]}
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
                            <View style={styles.viewRowAroundPage}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textCountPage}>{infoUser.blogs}</Text>
                                    <Text style={styles.detailCountPage}>Bài viết</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={() => OpenListFollow('following')}>
                                    <Text style={styles.textCountPage}>{infoUser.followings.length}</Text>
                                    <Text style={styles.detailCountPage}>Đang theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={() => OpenListFollow('follower')}>
                                    <Text style={styles.textCountPage}>{infoUser.followers.length}</Text>
                                    <Text style={styles.detailCountPage}>Người theo dõi</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.textDescPage}>
                                {
                                    (infoUser.description != undefined)
                                        ? infoUser.description
                                        : "Chưa có giới thiệu"
                                }
                            </Text>
                        </View>
                        : ""
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.containerPage}>
            <View style={styles.containerPage}>
                <View style={styles.headerCollapse}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <AntDesign name='arrowleft' size={25} color={'#001858'} />
                        </TouchableOpacity>
                        {
                            (isHeaderCollapse)
                                ? <Text style={[styles.pageTextName, { marginLeft: 20 }]} numberOfLines={1}>
                                    {infoUser.fullName}
                                </Text>
                                : ""
                        }
                    </View>
                    <TouchableOpacity onPress={() => { setisShowMenu(true) }}>
                        <Entypo name='dots-three-vertical' size={20} color={'#001858'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginTop: 55 }}>
                    {
                        (isLoadingUser)
                            ? <>
                                <ScrollView>
                                    <LoaderHeader key={1} />
                                    <ItemBlogLoader key={2} />
                                    <ItemBlogLoader key={3} />
                                </ScrollView>
                            </>
                            : <CollapsibleTabs
                                collapsibleContent={(<HeaderView />)}
                                barColor="#FEF6E4"
                                activeTextColor="#001858"
                                inactiveTextColor="rgba(0, 24, 88, 0.50)"
                                indicatorColor="#F582AE"
                                textStyle={styles.textTabBar}
                                activeTextStyle={{ fontWeight: 'bold' }}
                                uppercase={false}
                                showsVerticalScrollIndicator={true}
                                tabs={[{
                                    label: 'Blog',
                                    showsVerticalScrollIndicator: true,
                                    component: (
                                        <View >
                                            <View style={{ height: 1, width: '100%', backgroundColor: '#FEF6E4', shadowColor: '#000', elevation: 3, zIndex: 100, marginBottom: 10 }} />
                                            <ScrollView>
                                                {
                                                    (isLoadingBlog)
                                                        ? <View>
                                                            <ItemBlogLoader />
                                                            <ItemBlogLoader />
                                                        </View>
                                                        : <TabBlog user={infoUser} arr_blog={arr_blog} />
                                                }
                                            </ScrollView>
                                        </View>
                                    )
                                }, {
                                    label: 'Info',
                                    component: (
                                        <View>
                                            <View style={{ height: 1, width: '100%', backgroundColor: '#FEF6E4', shadowColor: '#000', elevation: 3, zIndex: 100, marginBottom: 15 }} />
                                            <ScrollView >
                                                <TabInfo user={infoUser} isLoader={isLoadingUser} />
                                            </ScrollView>
                                        </View>
                                    )
                                }]}
                            />
                    }
                </View>
                {
                    (isShowMenu)
                        ? <MenuContext isShow={isShowMenu} arr_OptionName={menuNames} arr_OptionFunction={menuFunctions} callBack={() => setisShowMenu(false)} />
                        : ""
                }
            </View>
        </SafeAreaView>
    );
}

export default memo(ViewPage);