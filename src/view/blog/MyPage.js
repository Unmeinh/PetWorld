import React, { useState, useEffect, memo } from 'react';
import {
    Text, Image,
    SafeAreaView,
    ScrollView,
    View, Animated,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import styles from '../../styles/user.style';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { getInfoLogin } from '../../redux/actions/userAction';
import { RefreshControl } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const MyPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.infoLogin);
    const arr_blog = useSelector((state) => state.listBlog);
    const [blogCount, setblogCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);
    const [followerCount, setfollowerCount] = useState(0);
    const [isFollowing, setisFollowing] = useState(false);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isLoader, setisLoader] = useState(true);
    const [isRefreshing, setisRefreshing] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    //Header
    let AnimatedHeaderValue = new Animated.Value(0);
    const [headerCollapseHeight, setheaderCollapseHeight] = useState(0);
    const [headerExtendHeight, setheaderExtendHeight] = useState(0);
    const [isHeaderCollapse, setisHeaderCollapse] = useState(false);
    const dummyData = [
        'Text',
        'Input',
        'Button',
        'Card',
        'CheckBox',
        'Divider',
        'Header',
        'List Item',
        'Pricing',
        'Rating',
        'Search Bar',
        'Slider',
        'Tile',
        'Icon',
        'Avatar',
    ];

    const animateHeaderHeight =
        AnimatedHeaderValue.interpolate({
            inputRange: [0, headerExtendHeight],
            outputRange: [headerExtendHeight, headerCollapseHeight],
            extrapolate: 'clamp',
        });


    const onLayoutHeaderCollapse = (event) => {
        if (headerCollapseHeight <= 0) {
            const { x, y, height, width } = event.nativeEvent.layout;
            setheaderCollapseHeight(height);
        }
    }

    const onLayoutHeaderExtend = (event) => {
        if (headerExtendHeight <= 0) {
            const { x, y, height, width } = event.nativeEvent.layout;
            setheaderExtendHeight(height);
        }
    }

    const onLayoutHeader = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        if (height == headerCollapseHeight) {
            setisHeaderCollapse(true);
        } else {
            if (isHeaderCollapse) {
                setisHeaderCollapse(false);
            }
        }
    }

    //Use effect    
    useEffect(() => {
        if (isLoader) {
            setTimeout(() => {
                setisLoader(false);
            }, 5000);
        }
    }, [isLoader]);

    useEffect(() => {
        console.log(userLogin);
        if (userLogin != undefined && userLogin != {}) {
            setsrcAvatar({ uri: String(userLogin.avatarUser) });
        }
    }, [userLogin]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            dispatch(getInfoLogin('001'));
            // setisLoader(true);

            // return navigation.remove();
        });

        return unsub;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.containerPage}>
            <View style={styles.containerPage}>
                <Animated.View
                    style={[
                        styles.headerPage,
                        {
                            height: animateHeaderHeight,
                            overflow: 'hidden'
                        },
                    ]} onLayout={onLayoutHeader}>
                    <View onLayout={onLayoutHeaderExtend}>
                        <View style={styles.headerCollapse} onLayout={onLayoutHeaderCollapse}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                    <AntDesign name='arrowleft' size={30} color={'#001858'} />
                                </TouchableOpacity>
                                {
                                    (isHeaderCollapse)
                                        ? <Text style={[styles.pageTextName, { marginLeft: 20 }]}>
                                            {userLogin.fullName}
                                        </Text>
                                        : ""
                                }
                            </View>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Entypo name='dots-three-vertical' size={25} color={'#001858'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerExtend}>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <Image source={srcAvatar} style={styles.pageUserAvatar}
                                    onError={() => setsrcAvatar(require('../../assets/images/error.png'))} />
                                <Text style={[styles.pageTextName, { marginLeft: 20 }]}
                                    numberOfLines={2}>{userLogin.fullName}</Text>
                                <View style={styles.viewButtonHeader}>
                                    <TouchableHighlight style={styles.buttonHeader}>
                                        <Text style={styles.textButtonHeader}>Nhắn tin</Text>
                                    </TouchableHighlight>
                                    {
                                        (isFollowing)
                                            ? <TouchableHighlight style={styles.buttonHeader}>
                                                <Text style={styles.textButtonHeader}>Đang theo dõi</Text>
                                            </TouchableHighlight>
                                            : <TouchableHighlight style={styles.buttonHeader}>
                                                <Text style={styles.textButtonHeader}>Theo dõi</Text>
                                            </TouchableHighlight>
                                    }
                                </View>
                            </View>
                            <View style={styles.viewRowAroundPage}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textCountPage}>{blogCount}</Text>
                                    <Text style={styles.detailCountPage}>Bài viết</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textCountPage}>{followingCount}</Text>
                                    <Text style={styles.detailCountPage}>Đang theo dõi</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textCountPage}>{followerCount}</Text>
                                    <Text style={styles.detailCountPage}>Người theo dõi</Text>
                                </View>
                            </View>
                            <Text style={styles.textDescPage}>
                                {
                                    (userLogin.description != undefined)
                                        ? infoUser.description
                                        : "Chưa có giới thiệu"
                                }
                            </Text>
                        </View>
                    </View>
                </Animated.View>
                <ScrollView
                    scrollEventThrottle={15}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: { y: AnimatedHeaderValue }
                            }
                        }],
                        { useNativeDriver: false }
                    )}>
                    {dummyData.map((item, index) => (
                        <Text style={{
                            textAlign: 'center',
                            color: '#000',
                            fontSize: 18,
                            padding: 20,
                        }} key={index}>
                            {item}
                        </Text>
                    ))}
                    {dummyData.map((item, index) => (
                        <Text style={{
                            textAlign: 'center',
                            color: '#000',
                            fontSize: 18,
                            padding: 20,
                        }} key={index}>
                            {item}
                        </Text>
                    ))}
                    {dummyData.map((item, index) => (
                        <Text style={{
                            textAlign: 'center',
                            color: '#000',
                            fontSize: 18,
                            padding: 20,
                        }} key={index}>
                            {item}
                        </Text>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


export default memo(MyPage);