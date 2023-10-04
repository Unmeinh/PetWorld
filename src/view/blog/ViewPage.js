import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Text, Image,
    SafeAreaView,
    ScrollView, View,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import styles from '../../styles/user.style';
import { CollapsibleTabs } from '../../component/layout/indexCollapsibleTab';
import { TabInfo, TabBlog } from './TabItemPage';
import { useNavigation } from '@react-navigation/native';
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import MenuContext from '../../component/menu/MenuContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import { onAxiosGet, onAxiosPost } from '../../api/axios.function';
import { changeBlogIsFollow } from '../../redux/reducers/blog/blogReducer';
import { useDispatch } from 'react-redux';

const ViewPage = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [infoUser, setinfoUser] = useState(undefined);
    const [blogs, setblogs] = useState(undefined);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isLoadingUser, setisLoadingUser] = useState(true);
    const [isLoadingBlog, setisLoadingBlog] = useState(true);
    const [infoTabHeight, setinfoTabHeight] = useState(0);
    const [isFocusScreen, setisFocusScreen] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isFollowed, setisFollowed] = useState(false);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const menuNames = ["Chia sẻ người dùng", "Gửi email", "Báo cáo"];

    const menuFunctions = [OpenInfoManager, OpenChangeAvatar];

    function OpenInfoManager() {
        setisShowMenu(false);
        navigation.navigate('InfoManager');
    }

    function OpenChangeAvatar() {
        setisShowMenu(false);
        navigation.navigate('ChangeAvatar');
    }

    async function fetchBlogsUser(id) {
        const res = await onAxiosGet('/blog/list/user/' + id);
        if (res) {
            setblogs(res.data);
        } else {
            setblogs([]);
        }
    }

    async function fetchUser() {
        const res = await onAxiosGet('/user/userDetail/' + route.params.idUser);
        if (res) {
            setinfoUser(res.data);
        } else {
            setinfoUser({});
        }
    }

    const onLayoutBlog = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        if (height <= Dimensions.get('window').height) {
            if (blogs) {
                if (blogs.length > 0) {
                    setinfoTabHeight(height);
                }
            } 
        } else {
            setinfoTabHeight(Dimensions.get('window').height);
        }
    }

    //Use effect    
    useEffect(() => {
        if (infoUser != undefined && isLoadingUser) {
            fetchBlogsUser(infoUser._id);
            setisLoadingBlog(true);
            setsrcAvatar({ uri: String(infoUser.avatarUser) });
            setisFollowed(infoUser.isFollowed);
            setisLoadingUser(false);
        }
    }, [infoUser]);

    useEffect(() => {
        if (blogs != undefined) {
            setisLoadingBlog(false);
        }
    }, [blogs]);

    useEffect(() => {
        if (isFocusScreen) {
            if (infoUser == undefined) {
                setisLoadingUser(true);
                fetchUser();
                if (blogs != undefined) {
                    setisLoadingBlog(false);
                }
            } else {
                setisLoadingUser(false);
                fetchUser();
                setsrcAvatar({ uri: String(infoUser.avatarUser) });
                if (blogs == undefined) {
                    fetchBlogsUser(infoUser._id);
                    setisLoadingBlog(true);
                }
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
                                shimmerStyle={{ width: 75, height: 30, borderRadius: 12 }} />
                            <ShimmerPlaceHolder
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
        async function OnFollow() {
            let fl = isFollowed;
            setisFollowed(!fl);
            let res = await onAxiosPost('follow/insert', { idFollow: infoUser._id }, 'json', false);
            if (res) {
                dispatch(changeBlogIsFollow([infoUser._id, !fl]));
            } else {
                isFollowed(fl);
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
                                        (isFollowed)
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
                            ? <ScrollView>
                                <LoaderHeader key={1} />
                                <ItemBlogLoader key={2} />
                                <ItemBlogLoader key={3} />
                            </ScrollView>
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
                                        <View style={{ flex: 1 }} onLayout={onLayoutBlog}>
                                            <View style={{ height: 1, width: '100%', backgroundColor: '#FEF6E4', shadowColor: '#000', elevation: 3, zIndex: 100, marginBottom: 10 }} />
                                            <ScrollView>
                                                {
                                                    (isLoadingBlog)
                                                        ? <>
                                                            <ItemBlogLoader />
                                                            <ItemBlogLoader />
                                                        </>
                                                        : <TabBlog user={infoUser} arr_blog={blogs} />
                                                }
                                            </ScrollView>
                                        </View>
                                    )
                                }, {
                                    label: 'Info',
                                    component: (
                                        <View style={{ flex: 1, height: infoTabHeight }}>
                                            <View style={{ height: 1, width: '100%', backgroundColor: '#FEF6E4', shadowColor: '#000', elevation: 3, zIndex: 100, marginBottom: 15 }} />
                                            <ScrollView>
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