import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Text, Image,
    FlatList, View,
    SafeAreaView,
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styles, { WindowHeight } from '../../styles/user.style';
import { CollapsibleTabs } from '../../component/layout/indexCollapsibleTab';
import { TabInfo } from './TabItemPage';
import { useNavigation } from '@react-navigation/native';
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import ItemBlog from '../../component/items/ItemBlog';
import MenuContext from '../../component/menu/MenuContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import { onAxiosGet } from '../../api/axios.function';
import { goBack } from '../../navigation/rootNavigation';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const MyPage = () => {
    const navigation = useNavigation();
    const [infoLogin, setinfoLogin] = useState(undefined);
    const [blogs, setblogs] = useState(undefined);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isLoadingUser, setisLoadingUser] = useState(true);
    const [isLoadingBlog, setisLoadingBlog] = useState(true);
    const [page, setpage] = useState(1);
    const [canLoadingMore, setcanLoadingMore] = useState(false);
    const [isLoadingMore, setisLoadingMore] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const [headerHeight, setheaderHeight] = useState(0);
    const menuNames = ["Chỉnh sửa thông tin", "Đăng blog mới", "Blog đã tương tác"];
    const menuFunctions = [OpenInfoManager, OpenNewBlog, onDeveloping];

    //Function layout
    const onLayoutHeader = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setheaderHeight(height);
    }

    function onErrorImage() {
        setsrcAvatar(require('../../assets/images/error.png'));
    }

    function onShowMenu() {
        setisShowMenu(!isShowMenu);
    }

    //Function support
    function OpenInfoManager() {
        setisShowMenu(false);
        navigation.navigate('InfoManager');
    }

    function OpenNewBlog() {
        setisShowMenu(false);
        navigation.navigate('NewBlog');
    }

    function onDeveloping() {
        setisShowMenu(false);
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Tính năng này đang được phát triển!'
        })
    }

    function onLoadMore() {
        if (canLoadingMore) {
            if (!isLoadingMore) {
                let pageMore = page + 1;
                setpage(pageMore);
                fetchBlogsUser(pageMore);
                setisLoadingMore(true);
            }
        } else {
            // Toast.show({
            //     type: 'warning',
            //     position: 'top',
            //     text1: 'Đã xem hết blog hiện có!'
            // })
        }
    }

    function onCallBackDelete(index) {
        let cloneU = {...infoLogin};
        cloneU.blogs = cloneU.blogs - 1;
        setinfoLogin(cloneU);
        let cloneB = [...blogs];
        cloneB.splice(index, 1);
        setblogs(cloneB);
    }

    //Function api
    async function fetchBlogsUser(page) {
        const res = await onAxiosGet('/blog/list/profile' + "?page=" + page);
        if (res) {
            if (page > 1) {
                let clone = [...blogs, ...res?.data?.list]
                setblogs(clone);
            } else {
                setblogs(res?.data?.list);
            }
            setcanLoadingMore(res?.data?.canLoadMore);
            setisLoadingMore(false);
        } else {
            setblogs([]);
            setisLoadingMore(false);
        }
    }

    async function fetchUser() {
        const res = await onAxiosGet('/user/myDetail');
        if (res) {
            setinfoLogin(res.data);
        } else {
            setinfoLogin({});
        }
    }

    //Hook
    useEffect(() => {
        if (infoLogin != undefined) {
            setsrcAvatar({ uri: String(infoLogin?.avatarUser) });
            setisLoadingUser(false);
            if (blogs) {
                setisLoadingBlog(false);
            }
        }
    }, [infoLogin]);

    useEffect(() => {
        if (blogs != undefined) {
            if (!isLoadingUser) {
                setisLoadingBlog(false);
            }
            setisRefreshing(false);
            setisLoadingMore(false);
        }
    }, [blogs]);

    useEffect(() => {
        const unsubFocus = navigation.addListener('focus', () => {
            fetchUser();
            if (!blogs || blogs.length <= 0) {
                fetchBlogsUser(0);
                setpage(1);
                setisLoadingBlog(true);
            }
            return () => {
                unsubFocus.remove();
            };
        });

    }, [navigation]);

    const ReloadData = React.useCallback(() => {
        setisRefreshing(true);
        setisLoadingMore(false);
        setpage(1);
        fetchUser();
        fetchBlogsUser(0);
    }, []);

    //Component
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
        function OpenListFollowing() {
            navigation.push('ListFollow', { idUser: infoLogin._id, typeFollow: 'following', typeUser: "userLogin" });
        }

        function OpenListFollower() {
            navigation.push('ListFollow', { idUser: infoLogin._id, typeFollow: 'follower', typeUser: "userLogin" });
        }

        return (
            <View style={styles.headerExtend} onLayout={onLayoutHeader}>
                {
                    (infoLogin)
                        ? <View>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <Image source={srcAvatar} style={styles.pageUserAvatar}
                                    onError={onErrorImage} />
                                <Text style={[styles.pageTextName, { marginLeft: 20 }]}
                                    numberOfLines={2}>{(infoLogin.fullName) ? infoLogin.fullName : "Không có dữ liệu"}
                                    {
                                        (infoLogin.nickName && String(infoLogin.nickName).trim() != "")
                                            ? <Text style={styles.pageTextNickName}
                                                numberOfLines={2}> ({infoLogin.nickName})</Text>
                                            : ""
                                    }
                                </Text>
                            </View>
                            <View style={styles.viewRowAroundPage}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textCountPage}>{(infoLogin.blogs) ? infoLogin.blogs : '0'}</Text>
                                    <Text style={styles.detailCountPage}>Bài viết</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={OpenListFollowing}>
                                    <Text style={styles.textCountPage}>{(infoLogin.followings) ? infoLogin.followings.length : '0'}</Text>
                                    <Text style={styles.detailCountPage}>Đang theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={OpenListFollower}>
                                    <Text style={styles.textCountPage}>{(infoLogin.followers) ? infoLogin.followers.length : '0'}</Text>
                                    <Text style={styles.detailCountPage}>Người theo dõi</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.textDescPage}>
                                {
                                    (infoLogin.description != undefined && String(infoLogin.description).trim() != "")
                                        ? infoLogin.description
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
                        <TouchableOpacity onPress={goBack}>
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
                    <TouchableOpacity onPress={onShowMenu}>
                        <Entypo name='dots-three-vertical' size={20} color={'#001858'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginTop: 55 }}>
                    {
                        (isLoadingUser)
                            ? <ScrollView showsVerticalScrollIndicator={false}>
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
                                tabs={[{
                                    label: 'Blog',
                                    showsVerticalScrollIndicator: true,
                                    isFlatList: (isLoadingBlog) ? false : true,
                                    component: ((isLoadingBlog)
                                        ? <>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <ItemBlogLoader key={1} />
                                                <ItemBlogLoader key={2} />
                                            </ScrollView>
                                        </>
                                        : <FlatList data={blogs} scrollEnabled={true}
                                            renderItem={({ item, index }) =>
                                                <ItemBlog key={index} blog={item} index={index}
                                                 canOpenAccount={false} isCanFollow={false} callBackDelete={onCallBackDelete}/>}
                                            ListFooterComponent={
                                                (canLoadingMore && blogs.length > 0) ? (
                                                    <ActivityIndicator
                                                        size="large"
                                                        color={'#F582AE'}
                                                        style={{ marginBottom: 15, marginTop: 10 }}
                                                    />
                                                ) : <View style={{ marginBottom: 5, alignItems: 'center' }} >
                                                    <Text style={{ fontSize: 17, color: 'rgba(0, 0, 0, 0.5)' }}>•</Text>
                                                </View>
                                            }
                                            ListEmptyComponent={<View style={styles.viewOther}>
                                                <LottieView
                                                    source={require('../../assets/viewBlog.json')}
                                                    autoPlay loop
                                                    style={{ width: '100%', aspectRatio: 1 }}
                                                />
                                                <Text style={[styles.textHint, { marginTop: 20 }]}>Không có blog nào..</Text>
                                            </View>}
                                            onEndReachedThreshold={0.1}
                                            onEndReached={onLoadMore}
                                            initialNumToRender={3}
                                            removeClippedSubviews={true}
                                            maxToRenderPerBatch={3}
                                            // windowSize={10}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item, index) => index.toString()}
                                            refreshControl={
                                                <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={headerHeight + 30} style={{ position: 'absolute', bottom: 50 }} />
                                            } />
                                    )
                                }, {
                                    label: 'Thông tin',
                                    component: (
                                        <View style={{ flex: 1 }}>
                                            <ScrollView showsVerticalScrollIndicator={false}>
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
                        ? <MenuContext isShow={isShowMenu} arr_OptionName={menuNames} arr_OptionFunction={menuFunctions} callBack={onShowMenu} />
                        : ""
                }
            </View>
        </SafeAreaView >
    );
}


export default memo(MyPage);