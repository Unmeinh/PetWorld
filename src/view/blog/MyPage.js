import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Text, Image,
    SafeAreaView,
    ScrollView,
    View, Dimensions,
    TouchableOpacity,
} from 'react-native';
import styles from '../../styles/user.style';
import { CollapsibleTabs } from '../../component/layout/indexCollapsibleTab';
import { TabInfo, TabBlog } from './TabItemPage';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { selectUserLogin, userSelectStatus } from '../../redux/selectors/userSelector';
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer';
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import MenuContext from '../../component/menu/MenuContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import { onAxiosGet } from '../../api/axios.function';

const MyPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const infoLogin = useSelector(selectUserLogin);
    const uSelectStatus = useSelector(userSelectStatus);
    const [blogs, setblogs] = useState(undefined);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isLoadingUser, setisLoadingUser] = useState(true);
    const [isLoadingBlog, setisLoadingBlog] = useState(true);
    const [infoTabHeight, setinfoTabHeight] = useState(0);
    const [isFocusScreen, setisFocusScreen] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const menuNames = ["Chỉnh sửa thông tin", "Đăng blog mới", "Blog đã tương tác"];

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

    const onLayoutBlog = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        if (height <= Dimensions.get('window').height) {
            if (blogs.length > 0) {
                setinfoTabHeight(height);
            }
        } else {
            setinfoTabHeight(Dimensions.get('window').height);
        }
    }

    //Use effect    
    useEffect(() => {
        if (infoLogin && isLoadingUser) {
            if (uSelectStatus == "being idle") {
                fetchBlogsUser(infoLogin._id);
                setisLoadingBlog(true);
                setsrcAvatar({ uri: String(infoLogin.avatarUser) });
                setisLoadingUser(false);
            }
        }
    }, [uSelectStatus, infoLogin]);

    useEffect(() => {
        if (blogs != undefined) {
            setisLoadingBlog(false);
        }
    }, [blogs]);

    useEffect(() => {
        if (isFocusScreen) {
            if (infoLogin == undefined) {
                setisLoadingUser(true);
                dispatch(fetchInfoLogin());
                if (blogs != undefined) {
                    setisLoadingBlog(false);
                }
            } else {
                setisLoadingUser(false);
                dispatch(fetchInfoLogin());
                setsrcAvatar({ uri: String(infoLogin.avatarUser) });
                if (blogs == undefined) {
                    fetchBlogsUser(infoLogin._id);
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
        function OpenListFollow(type) {
            navigation.push('ListFollow', { idUser: infoLogin._id, typeFollow: type, typeUser: 'userLogin' })
        }

        return (
            <View style={styles.headerExtend}>
                {
                    (infoLogin)
                        ? <View>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <Image source={srcAvatar} style={styles.pageUserAvatar}
                                    onError={() => setsrcAvatar(require('../../assets/images/error.png'))} />
                                <Text style={[styles.pageTextName, { marginLeft: 20 }]}
                                    numberOfLines={2}>{infoLogin.fullName}
                                    {
                                        (infoLogin.nickName == "Chưa thiết lập")
                                            ? ""
                                            : <Text style={styles.pageTextNickName}
                                                numberOfLines={2}> ({infoLogin.nickName})</Text>
                                    }
                                </Text>
                            </View>
                            <View style={styles.viewRowAroundPage}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textCountPage}>{infoLogin.blogs}</Text>
                                    <Text style={styles.detailCountPage}>Bài viết</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={() => OpenListFollow('following')}>
                                    <Text style={styles.textCountPage}>{infoLogin.followings.length}</Text>
                                    <Text style={styles.detailCountPage}>Đang theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={() => OpenListFollow('follower')}>
                                    <Text style={styles.textCountPage}>{infoLogin.followers.length}</Text>
                                    <Text style={styles.detailCountPage}>Người theo dõi</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.textDescPage}>
                                {infoLogin.description}
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
                                    {infoLogin.fullName}
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
                                                        : <TabBlog user={infoLogin} arr_blog={blogs} />
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
                                                <TabInfo user={infoLogin} isLoader={isLoadingUser} />
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


export default memo(MyPage);