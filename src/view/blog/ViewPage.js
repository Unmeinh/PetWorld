import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Text, Image,
    FlatList, View,
    SafeAreaView,
    ScrollView, 
    TouchableOpacity,
    TouchableHighlight,
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
import { onAxiosGet, onAxiosPost } from '../../api/axios.function';
import { changeBlogIsFollow } from '../../redux/reducers/blog/blogReducer';
import { useDispatch } from 'react-redux';
import { goBack } from '../../navigation/rootNavigation';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const ViewPage = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [infoUser, setinfoUser] = useState(undefined);
    const [blogs, setblogs] = useState([]);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isLoadingUser, setisLoadingUser] = useState(true);
    const [isLoadingBlog, setisLoadingBlog] = useState(true);
    const [page, setpage] = useState(1);
    const [canLoadingMore, setcanLoadingMore] = useState(false);
    const [isLoadingMore, setisLoadingMore] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isFollowed, setisFollowed] = useState(false);
    const [isLoadingFollow, setisLoadingFollow] = useState(false);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const [headerHeight, setheaderHeight] = useState(0);
    const [isShowMenu, setisShowMenu] = useState(false);
    const menuNames = ["Chia sẻ người dùng", "Gửi email", "Báo cáo"];
    const menuFunctions = [onDeveloping, onDeveloping, onDeveloping];

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

    function onCallBackFollow(isFl) {
        setisFollowed(isFl);
        fetchUser();
    }

    //Function api
    async function fetchBlogsUser(page) {
        const res = await onAxiosGet('/blog/list/user/' + route.params?.idUser + "?page=" + page);
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
        const res = await onAxiosGet('/user/userDetail/' + route.params?.idUser);
        if (res) {
            setinfoUser(res.data);
        } else {
            setinfoUser({});
        }
    }

    //Use effect    
    useEffect(() => {
        if (infoUser != undefined) {
            setsrcAvatar({ uri: String(infoUser?.avatarUser) });
            setisFollowed(infoUser?.isFollowed);
            setisLoadingUser(false);
            if (blogs == undefined) {
                setisLoadingBlog(false);
            }
        }
    }, [infoUser]);

    useEffect(() => {
        if (blogs != undefined) {
            setisLoadingBlog(false);
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
                        <View style={styles.viewButtonHeader}>
                            {/* <ShimmerPlaceHolder
                                shimmerStyle={{ width: 75, height: 30, borderRadius: 12 }} /> */}
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
            if (!isLoadingFollow) {
                let fl = isFollowed;
                setisLoadingFollow(true);
                setisFollowed(!fl);
                let res = await onAxiosPost('follow/insert', { idFollow: infoUser._id, isFlw: !fl }, 'json', false);
                if (res) {
                    setinfoUser(res.data);
                    dispatch(changeBlogIsFollow([infoUser._id, !fl]));
                    setisLoadingFollow(false);
                } else {
                    isFollowed(fl);
                    setisLoadingFollow(false);
                }
            } else {
                Toast.show({
                    type: 'warning',
                    position: 'top',
                    text1: 'Thao tác của bạn quá nhanh!\nVui lòng thử lại sau giây lát.',
                    // visibilityTime: 500,
                })
            }
        }

        function OpenListFollowing() {
            navigation.push('ListFollow', { idUser: infoUser._id, typeFollow: 'following', typeUser: "user" });
        }

        function OpenListFollower() {
            navigation.push('ListFollow', { idUser: infoUser._id, typeFollow: 'follower', typeUser: "user" });
        }

        return (
            <View style={styles.headerExtend} onLayout={onLayoutHeader}>
                {
                    (infoUser)
                        ? <View>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <Image source={srcAvatar} style={styles.pageUserAvatar}
                                    onError={onErrorImage} />
                                <Text style={[styles.pageTextName, { marginLeft: 20 }]}
                                    numberOfLines={2}>{(infoUser.fullName) ? infoUser.fullName : "Không có dữ liệu"}
                                    {
                                        (infoUser.nickName && String(infoUser.nickName).trim() != "")
                                            ? <Text style={styles.pageTextNickName}
                                                numberOfLines={2}> ({infoUser.nickName})</Text>
                                            : ""
                                    }
                                </Text>
                                <View style={styles.viewButtonHeader}>
                                    {/* <TouchableHighlight style={styles.buttonHeader}>
                                        <Text style={styles.textButtonHeader}>Nhắn tin</Text>
                                    </TouchableHighlight> */}
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
                                    <Text style={styles.textCountPage}>{(infoUser.blogs) ? infoUser.blogs : '0'}</Text>
                                    <Text style={styles.detailCountPage}>Bài viết</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={OpenListFollowing}>
                                    <Text style={styles.textCountPage}>{(infoUser.followings) ? infoUser.followings.length : '0'}</Text>
                                    <Text style={styles.detailCountPage}>Đang theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={OpenListFollower}>
                                    <Text style={styles.textCountPage}>{(infoUser.followers) ? infoUser.followers.length : '0'}</Text>
                                    <Text style={styles.detailCountPage}>Người theo dõi</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.textDescPage}>
                                {
                                    (infoUser.description != undefined && String(infoUser.description).trim() != "")
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
                        <TouchableOpacity onPress={goBack}>
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
                                                <ItemBlog key={index} blog={item}
                                                    index={index} canOpenAccount={false} isCanFollow={false}/>}
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
                        ? <MenuContext isShow={isShowMenu} arr_OptionName={menuNames} arr_OptionFunction={menuFunctions} callBack={onShowMenu} />
                        : ""
                }
            </View>
        </SafeAreaView >
    );
}

export default memo(ViewPage);