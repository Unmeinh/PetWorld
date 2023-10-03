import {
    Image, Share,
    Text, TouchableOpacity,
    TouchableHighlight, View,
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
import { userLoginId } from '../../redux/selectors/userSelector';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ViewAccountModal from "../modals/ViewAccountModal";
import { encodeToAscii } from "../../function/functionHash";
import { getDateTimeVietnamese } from "../../function/functionDate";

const ItemBlog = (row) => {
    let blog = row.blog;
    let user = blog.idUser;
    let loginId = useSelector(userLoginId);
    let navigation = useNavigation();
    const [isMe, setisMe] = useState(false);
    const [dateBlog, setdateBlog] = useState("");
    const [isShowComment, setisShowComment] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const [isShowAccount, setisShowAccount] = useState(false);
    const [isShowMoreBlog, setisShowMoreBlog] = useState(true);
    const [isShowMoreContent, setisShowMoreContent] = useState(false);
    const [isCollapsedContent, setisCollapsedContent] = useState(true);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isLove, setisLove] = useState(false);
    const [menuNames, setmenuNames] = useState([]);
    const [menuFunctions, setmenuFunctions] = useState([]);

    const onTextLayout = useCallback(e => {
        setisShowMoreContent(e.nativeEvent.lines.length > 1);
    }, []);

    async function onSharing() {
        try {
            const result = await Share.share({
                message: "https://9f03-2402-800-61c4-4085-20ae-2b4b-9dfb-e287.ngrok-free.app/blog/shareBlog/" + encodeToAscii(blog._id),
                title: "Chia sẻ Blog này với:",
                url: "https://9f03-2402-800-61c4-4085-20ae-2b4b-9dfb-e287.ngrok-free.app/blog/shareBlog/" + encodeToAscii(blog._id)
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function onReacting() {
        setisLove(!isLove);
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

    function OpenAccount() {
        if (isMe) {
            navigation.navigate('MyPage');
        } else {
            setisShowAccount(true);
        }
    }

    React.useEffect(() => {
        if (isShowMenu) {
            if (isMe) {
                setmenuNames(["Sửa bài viết", "Xóa bài viết"]);
            } else {
                var isFollowed = user.followers.find(follower => String(follower.idFollower) == String(loginId));
                if (isFollowed) {
                    setmenuNames(["Hủy theo dõi blogger", "Ẩn bài viết", "Báo cáo bài viết"]);
                } else {
                    setmenuNames(["Theo dõi blogger", "Ẩn bài viết", "Báo cáo bài viết"]);
                }
            }
        }
    }, [isShowMenu]);

    React.useEffect(() => {
        if (blog) {
            setdateBlog(getDateTimeVietnamese(blog.createdAt));
        }
    }, [blog]);

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
                                        (isShowMoreContent == false)
                                            ?
                                            <Text style={styles.textContent} numberOfLines={1}
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
                                                            <Text style={[styles.textContent, { fontFamily: String(blog.contentFont) }]} numberOfLines={1}
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
                    ? <CommentTab isShow={isShowComment} blog={blog} isMe={isMe} callBack={() => setisShowComment(false)} />
                    : ""
            }
            {
                (isShowMenu)
                    ? <MenuContext isShow={isShowMenu} arr_OptionName={menuNames} arr_OptionFunction={menuFunctions} callBack={() => setisShowMenu(false)} />
                    : ""
            }
            {
                (isShowAccount)
                    ? <ViewAccountModal isShow={isShowAccount} info={user} callBack={() => setisShowAccount(false)} />
                    : ""
            }
        </View>
    )
}

export default React.memo(ItemBlog);