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
import { selectBlogsByUser, blogSelectStatus } from '../../redux/selectors/blogSelector';
import { fetchInfoLogin, changeStatusPending } from '../../redux/reducers/user/userReducer';
import { fetchBlogsUser } from '../../redux/reducers/blog/blogReducer';
import { RefreshControl } from "react-native-gesture-handler";
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import MenuContext from '../../component/menu/MenuContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const MyPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const infoLogin = useSelector(selectUserLogin);
    const uSelectStatus = useSelector(userSelectStatus);
    const arr_blog = useSelector(selectBlogsByUser);
    const bSelectStatus = useSelector(blogSelectStatus);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isLoadingUser, setisLoadingUser] = useState(true);
    const [isLoadingBlog, setisLoadingBlog] = useState(true);
    const [infoTabHeight, setinfoTabHeight] = useState(0);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const menuNames = ["Chỉnh sửa thông tin", "Đổi ảnh đại diện"];

    function OpenInfoManager() {
        setisShowMenu(false);
        navigation.navigate('InfoManager');
    }

    function OpenChangeAvatar() {
        setisShowMenu(false);
        navigation.navigate('ChangeAvatar');
    }

    const menuFunctions = [OpenInfoManager, OpenChangeAvatar];

    const onLayoutBlog = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        if (height <= Dimensions.get('window').height) {
            setinfoTabHeight(height);
        } else {
            setinfoTabHeight(Dimensions.get('window').height);
        }
    }

    //Use effect    
    useEffect(() => {
        if (isLoadingUser) {
            if (uSelectStatus == "being idle") {
                dispatch(fetchBlogsUser(infoLogin._id));
                setsrcAvatar({ uri: String(infoLogin.avatarUser) });
                setisLoadingUser(false);
            }
        }
    }, [uSelectStatus, infoLogin]);

    useEffect(() => {
        if (isLoadingBlog) {
            if (bSelectStatus == "being idle") {
                setisLoadingBlog(false);
            }
        }
    }, [bSelectStatus]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            dispatch(fetchInfoLogin());

            return () => {
                unsub.remove();
            };
        });

        return unsub;
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
                            ? <>
                                <ScrollView>
                                    <LoaderHeader key={1}/>
                                    <ItemBlogLoader key={2}/>
                                    <ItemBlogLoader key={3}/>
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
                                        <View style={{ flex: 1 }} onLayout={onLayoutBlog}>
                                            <View style={{ height: 1, width: '100%', backgroundColor: '#FEF6E4', shadowColor: '#000', elevation: 3, zIndex: 100, marginBottom: 10 }} />
                                            <ScrollView>
                                                {
                                                    (isLoadingBlog)
                                                        ? <>
                                                            <ItemBlogLoader />
                                                            <ItemBlogLoader />
                                                        </>
                                                        : <TabBlog user={infoLogin} arr_blog={arr_blog} />
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