import {
    Image, View,
    Text, TouchableOpacity,
    TouchableHighlight,
    Dimensions, Pressable
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
import { changeBlogIsFollow } from "../../redux/reducers/blog/blogReducer";
import { onAxiosPost } from "../../api/axios.function";

const ItemBlogPage = (row) => {
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
    const [isFollowed, setisFollowed] = useState(blog.isFollowed);
    const [menuNames, setmenuNames] = useState([]);
    const [menuFunctions, setmenuFunctions] = useState([]);

    const onTextLayout = useCallback(e => {
        setisShowMoreContent(e.nativeEvent.lines.length > 2);
    }, []);

    async function onSharing() {
        await onSharingBlog(blog._id);
    }

    async function onReacting() {
        let react = isLove;
        setisLove(!isLove);
        let res = await onAxiosPost('blog/interact/' + blog._id, {}, 'json', false);
        if (res) {
            setblog(res.data);
        } else {
            setisLove(react);
        }
    }

    function onCallbackBlog(data) {
        setblog(data);
    }

    function onCollapsedContent() {
        setisCollapsedContent(!isCollapsedContent);
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

    function OpenAccount() {}

    React.useEffect(() => {
        if (isShowMenu) {
            if (isMe) {
                setmenuNames(["Sửa bài viết", "Xóa bài viết"]);
            } else {
                setmenuNames(["Sao chép liên kết", "Ẩn bài viết", "Báo cáo bài viết"]);
                setmenuFunctions([onFollowMenu]);
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
                if (blog.isFollowed != row.blog.isFollowed) {
                    setisFollowed(row.blog.isFollowed);
                } else {
                    setblog(row.blog);
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

    return (
        <View>
            {
                (isShowMoreBlog)
                    ? <Pressable onLongPress={onHideMoreBlog} >
                        <View>
                            <View style={styles.viewInfo}>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                                            style={styles.imageAvatar} />
                                    </TouchableOpacity>
                                    <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}
                                        onPress={OpenAccount}>
                                        <Text style={styles.textName}>{user.fullName}</Text>
                                    </TouchableHighlight>
                                </View>

                                <TouchableHighlight underlayColor={'#8BD3DD'} activeOpacity={0.5}
                                    onPress={() => setisShowMenu(true)}>
                                    <Entypo name='dots-three-horizontal' size={25} color={'#001858'} />
                                </TouchableHighlight>
                            </View>

                            {
                                (blog.imageBlogs.length <= 0)
                                    ? ""
                                    : <View>
                                        {
                                            (blog.imageBlogs.length == 1)
                                                ?
                                                <Image source={{ uri: String(blog.imageBlogs[0]) }} style={{ width: Dimensions.get('window').width, aspectRatio: blog.aspectRatio }} />
                                                :
                                                <BlogImageSlider array={blog.imageBlogs} aspectRatio={blog.aspectRatio} />
                                        }
                                    </View>
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
                                            <TouchableOpacity style={styles.iconInteract} onPress={() => setisShowComment(true)}>
                                                <Ionicons name="chatbubble-outline" size={25} color={'#001858'} />
                                            </TouchableOpacity>
                                            <Text style={styles.textInteract}>{blog.comments}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.viewRowInteract}>
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
                                            <Text style={styles.textContent} numberOfLines={2}
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
                                                            <Text style={[styles.textContent, { fontFamily: String(blog.contentFont) }]} numberOfLines={2}
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
                                                                <Text style={[styles.textContent, { fontFamily: String(blog.contentFont) }]}>
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
                    </Pressable>
                    :
                    <Pressable onPressIn={onShowMoreBlog} onLongPress={onShowMoreBlog}
                        delayLongPress={2000}>
                        <View style={styles.viewInfo}>
                            <View style={styles.viewBlogCollapse}>
                                <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                                        style={styles.imageAvatar} />
                                </TouchableOpacity>
                                <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}
                                    onPress={OpenAccount}>
                                    <Text style={styles.textName}>{user.fullName}</Text>
                                </TouchableHighlight>
                                <Text style={[styles.textName, { fontSize: 20 }]}> · </Text>
                                <Text style={styles.textContentCollapse}>
                                    1n
                                </Text>
                                <Text style={[styles.textName, { fontSize: 20 }]}> · </Text>
                                <Text style={[styles.textContentCollapse, { flexShrink: 1 }]} numberOfLines={1}>
                                    {blog.contentBlog}
                                </Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)', height: 1 }}></View>
                    </Pressable>
            }
            {
                (isShowComment)
                    ? <CommentTab isShow={isShowComment} blog={blog} isMe={isMe} isFollow={isFollowed}
                        callBack={() => setisShowComment(false)} callbackFollow={onCallbackFollow}
                        isLove={isLove} onCallbackBlog={onCallbackBlog} />
                    : ""
            }
            {
                (isShowAccount)
                    ? <ViewAccountModal isShow={isShowAccount} info={user} isFollow={isFollowed} callBack={() => setisShowAccount(false)} callbackFollow={onCallbackFollow} />
                    : ""
            }
            {
                (isShowMenu)
                    ? <MenuContext isShow={isShowMenu} arr_OptionName={menuNames} arr_OptionFunction={menuFunctions} callBack={() => setisShowMenu(false)} />
                    : ""
            }
        </View>
    )
}

export default React.memo(ItemBlogPage);