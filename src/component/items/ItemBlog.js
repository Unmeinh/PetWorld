import {
    Image, View,
    Text, TouchableOpacity,
    TouchableHighlight,
    Dimensions, Pressable,
    Animated
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../styles/blog.style';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BlogImageSlider from "../slider/BlogImageSlider";
import CommentTab from '../modals/CommentTab';
import MenuContext from "../menu/MenuContext";
import ViewAccountModal from "../modals/ViewAccountModal";
import { useSelector, useDispatch } from "react-redux";
import { userLoginId } from '../../redux/selectors/userSelector';
import { useNavigation } from "@react-navigation/native";
import { getDateTimeVietnamese } from "../../function/functionDate";
import { onSharingBlog } from "../../function/functionShare";
import { changeBlogIsFollow, removeBlog } from "../../redux/reducers/blog/blogReducer";
import { onAxiosPost, onAxiosDelete } from "../../api/axios.function";
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from "react-native-toast-message";

const ItemBlog = (row) => {
    const [blog, setblog] = useState(row.blog);
    let user = blog.idUser;
    let loginId = useSelector(userLoginId);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isMe, setisMe] = useState(false);
    const [dateBlog, setdateBlog] = useState("");
    const [isShowComment, setisShowComment] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const [isShowAccount, setisShowAccount] = useState(false);
    const [isShowMoreBlog, setisShowMoreBlog] = useState(true);
    const [isShowMoreContent, setisShowMoreContent] = useState(false);
    const [isCollapsedContent, setisCollapsedContent] = useState(true);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isLove, setisLove] = useState(false);
    const [isLoadingLove, setisLoadingLove] = useState(false);
    const [isFollowed, setisFollowed] = useState(blog.isFollowed);
    const [isDeleting, setisDeleting] = useState(false);
    const [menuNames, setmenuNames] = useState([]);
    const [menuFunctions, setmenuFunctions] = useState([]);
    let fadeAnim = new Animated.Value(0.4);
    let springValue = new Animated.Value(0);

    const onTextLayout = useCallback(e => {
        setisShowMoreContent(e.nativeEvent.lines.length > 2);
    }, []);

    async function onSharing() {
        await onSharingBlog(blog._id);
    }

    async function onReacting() {
        if (isLoadingLove) {
            Toast.show({
                type: 'warning',
                position: 'top',
                text1: 'Thao tác của bạn quá nhanh!\nVui lòng thử lại sau giây lát.'
            })
        } else {
            setisLoadingLove(true);
            let react = isLove;
            setisLove(!isLove);
            let res = await onAxiosPost('blog/interact/' + blog._id, {}, 'json', false);
            if (res) {
                setblog(res.data);
                setisLoadingLove(false);
            } else {
                setisLove(react);
                setisLoadingLove(false);
            }
        }
    }

    function onDeveloping() {
        setisShowMenu(false);
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Tính năng này đang được phát triển!'
        })
    }

    function onCopyContent() {
        setisShowMenu(false);
        Clipboard.setString(blog.contentBlog);
        Toast.show({
            type: 'success',
            text1: 'Đã sao chép vào bộ nhớ tạm.',
            position: 'top'
        })
    }

    function onCallbackBlog(data) {
        setblog(data);
    }

    function onCollapsedContent() {
        setisCollapsedContent(!isCollapsedContent);
    }

    function onErrorImage() {
        setsrcAvatar(require('../../assets/images/error.png'));
    }

    function onShowMenu() {
        setisShowMenu(!isShowMenu);
    }

    function onShowComment() {
        setisShowComment(!isShowComment);
    }

    function onShowAccount() {
        setisShowAccount(!isShowAccount);
    }

    function onHideMoreBlog() {
        if (isShowMoreBlog) {
            setisShowMoreBlog(false);
        }
    }

    function onShowMoreBlog() {
        if (!isShowMoreBlog) {
            setisShowMoreBlog(true);
        }
    }

    function onCallbackFollow(isFl) {
        setisFollowed(isFl);
        dispatch(changeBlogIsFollow([user._id, isFl]));
        // if (row?.callBackFollow) {
        //     row.callBackFollow(isFl);
        // }
    }

    async function onFollowMenu() {
        let fl = isFollowed;
        setisFollowed(!fl);
        setisShowMenu(false);
        let res = await onAxiosPost('follow/insert', { idFollow: user._id }, 'json', false);
        if (res) {
            onCallbackFollow(!fl);
        } else {
            setisFollowed(fl);
        }
    }

    function onShowAlert() {
        setisShowMenu(false);
        Toast.show({
            type: 'alert',
            position: 'top',
            text1: "Xác nhận xóa blog?",
            props: {
                cancel: () => Toast.hide(),
                confirm: onDeleteBlog
            },
            autoHide: false
        })
    }

    async function onDeleteBlog() {
        Toast.hide();
        setisDeleting(true);
        let res = await onAxiosDelete('blog/delete/' + blog._id);
        if (res) {
            if (row?.callBackDelete) {
                await row?.callBackDelete(row.index);
            }
            dispatch(removeBlog(blog._id));
            setisDeleting(false);
        } else {
            setisDeleting(false);
        }
    }

    function OpenEditBlog() {
        setisShowMenu(false);
        navigation.navigate('EditBlog', { oldBlog: blog });
    }

    function OpenAccount() {
        if (row?.canOpenAccount != undefined && !row?.canOpenAccount) {
            return;
        }
        if (isMe) {
            setisShowAccount(true);
            // navigation.navigate('MyPage');
        } else {
            setisShowAccount(true);
        }
    }

    React.useEffect(() => {
        if (isShowMenu) {
            if (isMe) {
                setmenuNames(["Sao chép nội dung", "Sửa bài viết", "Xóa bài viết"]);
                setmenuFunctions([onCopyContent, OpenEditBlog, onShowAlert]);
            } else {
                setmenuNames(["Sao chép nội dung", "Ẩn bài viết", "Báo cáo bài viết"]);
                setmenuFunctions([onCopyContent, onDeveloping, onDeveloping]);
                // if (isFollowed) {
                //     setmenuNames(["Sao chép nội dung", "Ẩn bài viết", "Báo cáo bài viết"]);
                //     setmenuFunctions([onCopyContent, onDeveloping, onDeveloping]);
                // } else {
                //     setmenuNames(["Sao chép nội dung", "Ẩn bài viết", "Báo cáo bài viết"]);
                //     setmenuFunctions([onCopyContent, onDeveloping, onDeveloping]);
                // }
            }
        }
    }, [isShowMenu]);

    React.useEffect(() => {
        if (blog) {
            setdateBlog(getDateTimeVietnamese(blog.createdAt));
            if (blog.interacts.includes(loginId)) {
                setisLove(true);
            } else {
                setisLove(false);
            }
            if (blog.isFollowed != undefined) {
                setisFollowed(blog.isFollowed);
            }
        }
    }, [blog]);

    React.useEffect(() => {
        if (row.blog) {
            if (blog != row.blog) {
                // if (blog.isFollowed != row.blog.isFollowed) {
                //     setisFollowed(row.blog.isFollowed);
                //     return;
                // } 
                setblog(row.blog);
            }
            if (user && loginId) {
                if (user._id == loginId && !isMe) {
                    setisMe(true);
                }
            }
        }
    }, [row.blog]);

    React.useEffect(() => {
        if (user) {
            setsrcAvatar({ uri: String(user.avatarUser) });
        }
    }, [user]);

    React.useEffect(() => {
        if (user) {
            if (user._id == loginId && !isMe) {
                setisMe(true);
            }
        }
    }, [loginId]);

    React.useEffect(() => {
        if (isDeleting) {
            let fadeInAndOut = Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.4,
                    duration: 500,
                    useNativeDriver: true
                }),
            ]);

            Animated.loop(
                Animated.parallel([
                    fadeInAndOut,
                    Animated.timing(springValue, {
                        toValue: 1,
                        friction: 3,
                        tension: 40,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                ]),
            ).start();
        } else {
            Animated.timing(
                fadeAnim
            ).stop();
        }
    }, [isDeleting])

    return (
        <Pressable pointerEvents={(isDeleting) ? 'none' : 'auto'}>
            <Animated.View style={(isDeleting) ? { opacity: fadeAnim } : {}}>
                <View>
                    <View style={styles.viewInfo}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                <Image source={srcAvatar} onError={onErrorImage}
                                    style={styles.imageAvatar} />
                            </TouchableOpacity>
                            <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}
                                onPress={OpenAccount}>
                                <Text style={styles.textName}>{user.fullName}</Text>
                            </TouchableHighlight>
                        </View>

                        <TouchableOpacity underlayColor={'#8BD3DD'} activeOpacity={0.5}
                            onPress={onShowMenu}>
                            <Entypo name='dots-three-horizontal' size={25} color={'#001858'} />
                        </TouchableOpacity>
                    </View>

                    {
                        (blog.imageBlogs.length <= 0)
                            ? ""
                            : <Pressable>
                                {
                                    (blog.imageBlogs.length == 1)
                                        ?
                                        <Image source={{ uri: String(blog.imageBlogs[0]) }} style={{ width: Dimensions.get('window').width, aspectRatio: blog.aspectRatio }} />
                                        :
                                        <BlogImageSlider array={blog.imageBlogs} aspectRatio={blog.aspectRatio} />
                                }
                            </Pressable>
                    }

                    <View style={styles.viewBelowPost}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.viewRowInteract}>
                                    <View>
                                        {
                                            (isLove)
                                                ? <TouchableOpacity style={styles.iconInteract} onPress={onReacting}>
                                                    <Ionicons name="heart" size={27} color={'#f00'} />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={styles.iconInteract} onPress={onReacting}>
                                                    <Ionicons name="heart-outline" size={27} color={'#001858'} />
                                                </TouchableOpacity>
                                        }
                                    </View>
                                    <Text style={styles.textInteract}>{blog.interacts.length}</Text>
                                </View>

                                <View style={styles.viewRowInteract}>
                                    <TouchableOpacity style={styles.iconInteract} onPress={onShowComment}>
                                        <Ionicons name="chatbubble-outline" size={25} color={'#001858'} />
                                    </TouchableOpacity>
                                    <Text style={styles.textInteract}>{blog.comments}</Text>
                                </View>
                            </View>
                            <View style={[styles.viewRowInteract, { marginRight: 0 }]}>
                                <TouchableOpacity style={styles.iconInteract}
                                    onPress={onSharing}>
                                    <AntDesign name="sharealt" size={25} color={'#001858'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                            {
                                (!isShowMoreContent)
                                    ?
                                    <Text style={[styles.textContent,
                                    { fontFamily: (String(blog.contentFont) == 'Default') ? "" : String(blog.contentFont) }]}
                                        numberOfLines={2}
                                        onTextLayout={onTextLayout} ellipsizeMode='clip'>
                                        <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{user.fullName}{" "}</Text>
                                        {blog.contentBlog}
                                    </Text>
                                    :
                                    <View>
                                        {
                                            (isCollapsedContent)
                                                ?
                                                <View>
                                                    <Text style={[styles.textContent,
                                                    { fontFamily: (String(blog.contentFont) == 'Default') ? "" : String(blog.contentFont) }]}
                                                        numberOfLines={2}
                                                        onTextLayout={onTextLayout} ellipsizeMode='clip'>
                                                        <Text style={styles.textBlogger}>{user.fullName}{" "}</Text>
                                                        {blog.contentBlog}
                                                    </Text>
                                                    <Text style={[styles.textContent]}>
                                                        ...
                                                    </Text>
                                                    <TouchableOpacity>
                                                        <Text style={styles.textBelowContent} onPress={onCollapsedContent}>
                                                            Xem thêm
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View>
                                                    <Pressable onLongPress={onCollapsedContent}>
                                                        <Text style={[styles.textContent,
                                                        { fontFamily: (String(blog.contentFont) == 'Default') ? "" : String(blog.contentFont) }]}>
                                                            <Text style={styles.textBlogger}>{user.fullName}{" "}</Text>
                                                            {blog.contentBlog}
                                                        </Text>
                                                    </Pressable>
                                                    <TouchableOpacity>
                                                        <Text style={styles.textBelowContent} onPress={onCollapsedContent}>
                                                            Thu gọn
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                        }
                                    </View>
                            }
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Feather name="clock" size={14} color={'rgba(0, 0, 0, 0.65)'} />
                            </TouchableOpacity>
                            <Text style={styles.textTime}>
                                {dateBlog}
                            </Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)', height: 1 }}></View>
                </View>
                {
                    (isShowComment)
                        ? <CommentTab isShow={isShowComment} blog={blog} isMe={isMe} isFollow={isFollowed}
                            callBack={onShowComment} callbackFollow={onCallbackFollow}
                            isLove={isLove} onCallbackBlog={onCallbackBlog} isCanFollow={row?.isCanFollow}/>
                        : ""
                }
                {
                    (isShowAccount)
                        ? <ViewAccountModal isShow={isShowAccount} info={user} isMe={isMe} isFollow={isFollowed} callBack={onShowAccount} callbackFollow={onCallbackFollow} />
                        : ""
                }
                {
                    (isShowMenu)
                        ? <MenuContext isShow={isShowMenu} arr_OptionName={menuNames} arr_OptionFunction={menuFunctions} callBack={onShowMenu} />
                        : ""
                }
            </Animated.View>
        </Pressable>
    )
}

export default React.memo(ItemBlog);