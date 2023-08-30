import React, { useState, useEffect, useRef, memo } from 'react';
import {
    Text, Image,
    SafeAreaView,
    ScrollView,
    View, Animated,
    TouchableOpacity,
} from 'react-native';
import styles from '../../styles/user.style';
import { CollapsibleTabs } from '../../component/layout/indexCollapsibleTab';
import { TabInfo, TabBlog } from './TabItemPage';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID } from '../../redux/selectors/userSelector';
import { selectInfoLogin } from '../../redux/actions/userAction';
import { RefreshControl } from "react-native-gesture-handler";
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import MenuContext from '../../component/menu/MenuContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const MyPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const infoLogin = useSelector(selectUserByID);
    const [blogCount, setblogCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);
    const [followerCount, setfollowerCount] = useState(0);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isLoader, setisLoader] = useState(true);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
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

    //Use effect    
    useEffect(() => {
        if (isLoader) {
            setTimeout(() => {
                setisLoader(false);
                setsrcAvatar({ uri: String(infoLogin.avatarUser) });
            }, 5000);
        }
    }, [isLoader]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            dispatch(selectInfoLogin('001'));
            // setisLoader(true);

            // return navigation.remove();
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    const HeaderView = () => {
        function OpenListFollow(type) {
            navigation.navigate('ListFollow', { idUser: infoLogin._id, typeFollow: type })
        }

        return (
            <View style={styles.headerExtend}>
                {
                    (isLoader)
                        ? <View>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={styles.pageUserAvatar} />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ width: '35%', height: 20, marginLeft: 20, borderRadius: 5 }} />
                            </View>
                            <View style={styles.viewRowAroundPage}>
                                <View style={{ alignItems: 'center' }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={{ width: 15, height: 15, borderRadius: 5, marginBottom: 5 }} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={{ width: 50, height: 10, borderRadius: 5 }} />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={{ width: 15, height: 15, borderRadius: 5, marginBottom: 5 }} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={{ width: 70, height: 10, borderRadius: 5 }} />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={{ width: 15, height: 15, borderRadius: 5, marginBottom: 5 }} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={{ width: 70, height: 10, borderRadius: 5 }} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: '50%', borderRadius: 5, marginVertical: 15, marginHorizontal: 20 }} />
                        </View>
                        : <View>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <Image source={srcAvatar} style={styles.pageUserAvatar}
                                    onError={() => setsrcAvatar(require('../../assets/images/error.png'))} />
                                <Text style={[styles.pageTextName, { marginLeft: 20 }]}
                                    numberOfLines={2}>{infoLogin.fullName}</Text>
                            </View>
                            <View style={styles.viewRowAroundPage}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textCountPage}>{blogCount}</Text>
                                    <Text style={styles.detailCountPage}>Bài viết</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={() => OpenListFollow('following')}>
                                    <Text style={styles.textCountPage}>{followingCount}</Text>
                                    <Text style={styles.detailCountPage}>Đang theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center' }}
                                    onPress={() => OpenListFollow('follower')}>
                                    <Text style={styles.textCountPage}>{followerCount}</Text>
                                    <Text style={styles.detailCountPage}>Người theo dõi</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.textDescPage}>
                                {
                                    (infoLogin.description != undefined)
                                        ? infoLogin.description
                                        : "Chưa có giới thiệu"
                                }
                            </Text>
                        </View>
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
                    <CollapsibleTabs
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
                                            (isLoader)
                                                ? <View>
                                                    <ItemBlogLoader />
                                                    <ItemBlogLoader />
                                                </View>
                                                : <TabBlog user={infoLogin} isLoader={isLoader} />
                                        }
                                    </ScrollView>
                                </View>
                            )
                        }, {
                            label: 'Info',
                            component: (
                                <View style={{ flex: 1 }}>
                                    <View style={{ height: 1, width: '100%', backgroundColor: '#FEF6E4', shadowColor: '#000', elevation: 3, zIndex: 100, marginBottom: 15 }} />
                                    <ScrollView>
                                        <TabInfo user={infoLogin} isLoader={isLoader} />
                                    </ScrollView>
                                </View>
                            )
                        }]}
                    />
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