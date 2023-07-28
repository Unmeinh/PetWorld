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

export default function ItemBlog(row) {
    const [blog, setblog] = useState(row.blog);
    const [isShowMoreContent, setisShowMoreContent] = useState(false);
    const [isCollapsedContent, setisCollapsedContent] = useState(true);
    const [isLove, setisLove] = useState(false);
    var user = blog.idUser;

    const onTextLayout = useCallback(e => {
        setisShowMoreContent(e.nativeEvent.lines.length > 1);
    }, []);

    const [srcAvatar, setsrcAvatar] = useState({ uri: String(user.avatarUser) });
    Moment.locale('en');

    function onReacting() {
        if (isLove) {
            setisLove(false);
        } else {
            setisLove(true);
        }
    }

    function OpenAccount() {

    }

    return (
        <View>
            <View style={styles.viewInfo}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/image/error.png'))}
                            style={styles.imageAvatar} />
                    </TouchableOpacity>
                    <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}>
                        <Text style={styles.textName}>{user.fullName}</Text>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight underlayColor={'#8BD3DD'} activeOpacity={0.5}>
                    <Entypo name='dots-three-horizontal' size={25} color={'#001858'} />
                </TouchableHighlight>
            </View>

            {
                (blog.imageBlog.length <= 0)
                    ? ""
                    : <View>
                        {
                            (blog.imageBlog.length == 1)
                                ?
                                <AutoHeightImage source={{ uri: String(blog.imageBlog[0]) }} width={Dimensions.get('window').width} />
                                :
                                <BlogImageSlider array={blog.imageBlog} />
                        }
                    </View>
            }

            <View style={styles.viewBelowPost}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewRowInteract}>
                            <View>
                                <TouchableOpacity style={styles.iconInteract} onPress={onReacting}>
                                    <Ionicons name="heart-outline" size={27} color={'#001858'} />
                                </TouchableOpacity>
                                {
                                    (isLove)
                                        ? <TouchableOpacity style={styles.iconHeart} onPress={onReacting}>
                                            <Ionicons name="heart" size={23} color={'#f00'} />
                                        </TouchableOpacity>
                                        : ""
                                }
                            </View>
                            <Text style={styles.textInteract}>{blog.interact.length}</Text>
                        </View>

                        <View style={styles.viewRowInteract}>
                            <TouchableOpacity style={styles.iconInteract}>
                                <Ionicons name="chatbubble-outline" size={25} color={'#001858'} />
                            </TouchableOpacity>
                            <Text style={styles.textInteract}>{blog.comment.length}</Text>
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
                                <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{user.fullName} {" "}</Text>
                                {blog.contentBlog}
                            </Text>
                            :
                            <View>
                                {
                                    (isCollapsedContent)
                                        ?
                                        <View>
                                            <Text style={styles.textContent} numberOfLines={1}
                                                onTextLayout={onTextLayout} ellipsizeMode='clip'>
                                                <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{user.fullName} {" "}</Text>
                                                {blog.contentBlog}
                                            </Text>
                                            <Text style={styles.textContent}>
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
                                            <Text style={styles.textContent}>
                                                <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{user.fullName} {" "}</Text>
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
    )
}