import {
    Image, ScrollView,
    Text, TouchableOpacity,
    TouchableHighlight, View,
    Dimensions, SafeAreaView
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../styles/blog.style';
import AutoHeightImage from 'react-native-auto-height-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Moment from 'moment';
import BlogImageSlider from "../slider/BlogImageSlider";
import ListComment from '../modals/ListComment';
import MenuContext from "../menu/MenuContext";
import ViewAccountModal from "../modals/ViewAccountModal";

const ItemBlogPage = (row) => {
    const [blog, setblog] = useState(row.blog);
    var user = blog.idUser;
    const [isShowComment, setisShowComment] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const [isShowAccount, setisShowAccount] = useState(false);
    const [isShowMoreContent, setisShowMoreContent] = useState(false);
    const [isCollapsedContent, setisCollapsedContent] = useState(true);
    const [srcAvatar, setsrcAvatar] = useState({ uri: String(user.avatarUser) });
    const [isLove, setisLove] = useState(false);
    const [menuNames, setmenuNames] = useState([]);
    const [menuFunctions, setmenuFunctions] = useState([]);
    Moment.locale('en');

    const onTextLayout = useCallback(e => {
        setisShowMoreContent(e.nativeEvent.lines.length > 1);
    }, []);


    function onReacting() {
        if (isLove) {
            setisLove(false);
        } else {
            setisLove(true);
        }
    }

    function OpenAccount() {
    }

    function getMyID() {
        return "001";
    }

    function checkIsFollowed() {
        var myID = getMyID();
        if (user.followers.indexOf(myID) > -1) {
            return true;
        } else {
            return false;
        }
    }

    React.useEffect(() => {
        var myID = getMyID();
        if (isShowMenu) {
            if (user._id == myID) {
                setmenuNames(["Sửa bài viết", "Xóa bài viết"]);
            } else {
                var isFollowed = checkIsFollowed();
                if (isFollowed) {
                    setmenuNames(["Hủy theo dõi blogger", "Ẩn bài viết", "Báo cáo bài viết"]);
                } else {
                    setmenuNames(["Theo dõi blogger", "Ẩn bài viết", "Báo cáo bài viết"]);
                }
            }
        }
    }, [isShowMenu]);

    return (
        <View>
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
                                <Text style={styles.textInteract}>{blog.comments.length}</Text>
                            </View>
                        </View>
                        <View style={styles.viewRowInteract}>
                            <TouchableOpacity style={styles.iconInteract}>
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
                                                    <Text style={styles.textBelowContent} onPress={() => setisCollapsedContent(false)}>
                                                        Xem thêm
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View>
                                                <Text style={[styles.textContent, { fontFamily: String(blog.contentFont) }]}>
                                                    <Text style={styles.textBlogger}>{user.fullName}{" "}</Text>
                                                    {blog.contentBlog}
                                                </Text>
                                                <TouchableOpacity>
                                                    <Text style={styles.textBelowContent} onPress={() => setisCollapsedContent(true)}>
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
                            {blog.createdAt}
                        </Text>
                    </View>
                </View>

                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)', height: 1 }}></View>
            </View>
            {
                (isShowComment)
                    ? <ListComment isShow={isShowComment} blog={blog} callBack={() => setisShowComment(false)} />
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

export default React.memo(ItemBlogPage);