import {
    Text, Pressable, TextInput,
    View, TouchableOpacity,
    TouchableHighlight, Image,
    FlatList, ScrollView,
    KeyboardAvoidingView,
    Animated,
    Dimensions
} from "react-native";
import React, { useState, useRef, memo, useEffect } from "react";
import Modal from 'react-native-modal';
import styles from "../../styles/comment.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ItemComment from "../items/ItemComment";
import ItemCommentLoader from "../items/ItemCommentLoader";
import { useSelector, useDispatch } from "react-redux";
import { userLoginSelector } from "../../redux/selectors/userSelector";
import { getDateTimeVietnamese } from "../../function/functionDate";
import { onSharingBlog } from "../../function/functionShare";
import ShimmerPlaceHolder from "../layout/ShimmerPlaceHolder";
import { onAxiosPost, onAxiosGet } from "../../api/axios.function";
import { ToastLayout } from "../layout/ToastLayout";
import Toast from "react-native-toast-message";

const CommentTab = (route) => {
    const infoLogin = useSelector(userLoginSelector);
    let blog = route.blog;
    let infoUser = blog.idUser;
    const [comments, setcomments] = useState(undefined);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isLove, setisLove] = useState(route.isLove);
    const [isFollow, setisFollow] = useState(route.isFollow);
    const [inputComment, setinputComment] = useState('');
    const [isCollapsedContent, setisCollapsedContent] = useState(true);
    const [dateBlog, setdateBlog] = useState('');
    const [isUploading, setisUploading] = useState(false);
    const [isLoader, setisLoader] = useState(false);
    const [bottomHeight, setbottomHeight] = useState(0);
    const [isEditing, setisEditing] = useState(false);
    const inputCommentRef = useRef(null);
    let fadeAnim = new Animated.Value(0.4);
    let springValue = new Animated.Value(0);

    async function onReacting() {
        let react = isLove;
        setisLove(!isLove);
        let res = await onAxiosPost('blog/interact/' + blog._id, {}, 'json', false);
        if (res) {
            route.onCallbackBlog(res.data);
        } else {
            setisLove(react);
        }
    }

    async function onSharing() {
        await onSharingBlog(blog._id);
    }

    function onChangeCommentInput(input) {
        if (input.length > 200) {
            Toast.show({
                type: 'error',
                text1: 'Bạn chỉ có thể nhập tối đa 200 ký tự!',
                position: 'top'
            })
        } else {
            setinputComment(input);
        }
    }

    function onCollapsedContent() {
        setisCollapsedContent(!isCollapsedContent);
    }

    function OpenAccount() {

    }

    async function OnFollow() {
        let fl = isFollow;
        setisFollow(!fl);
        let res = await onAxiosPost('follow/insert', { idFollow: infoUser._id }, 'json', false);
        if (res) {
            route.callbackFollow(!fl);
        } else {
            setisFollow(fl);
        }
    }

    async function onUploadComment() {
        if (isUploading) {
            Toast.show({
                type: 'error',
                text1: 'Vui lòng chờ bình luận được đăng!',
                position: 'top'
            })
            return;
        }
        if (inputComment.trim('') == "") {
            Toast.show({
                type: 'error',
                text1: 'Hãy viết gì đó trước khi đăng nhé!',
                position: 'top'
            })
            return;
        }
        if (inputComment.length > 200) {
            Toast.show({
                type: 'error',
                text1: 'Bình luận chỉ có thể dài tối đa 200 ký tự!',
                position: 'top'
            })
            return;
        }
        setisUploading(true);
        let res = await onAxiosPost('comment/insert',
            {
                idBlog: blog._id,
                content: inputComment
            }, 'json', false);
        if (res) {
            setisUploading(false);
            setinputComment('');
            let cloneCMT = [...comments];
            cloneCMT.unshift(res.data);
            setcomments(cloneCMT);
            let clone = { ...blog };
            clone.comments++;
            route.onCallbackBlog(clone);
        } else {
            setisUploading(false);
        }
    }

    function callBackEdit(isE) {
        setisEditing(isE);
    }

    function callBackDelete(indexC) {
        let cloneCMT = [...comments];
        cloneCMT.splice(indexC, 1);
        setcomments(cloneCMT);
        let clone = { ...blog };
        clone.comments--;
        route.onCallbackBlog(clone);
    }

    const onLayoutBottom = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setbottomHeight(height);
    }

    React.useEffect(() => {
        if (route.isShow && !isLoader) {
            setisLoader(true);
        }
    }, [route.isShow]);

    React.useEffect(() => {
        if (comments != undefined) {
            setisLoader(false);
        }
    }, [comments]);

    React.useEffect(() => {
        async function getComments() {
            const res = await onAxiosGet('/comment/list/' + blog._id);
            if (res) {
                setcomments(res.data);
            } else {
                setcomments([]);
            }
        }
        if (blog) {
            if (infoUser) {
                setsrcAvatar({ uri: String(infoUser.avatarUser) });
            }
            setdateBlog(getDateTimeVietnamese(blog.createdAt));
            getComments();
        }
    }, [blog]);

    useEffect(() => {
        if (isUploading) {
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
    }, [isUploading])

    const ListCommentLoader = () => {
        return (
            <>
                <View style={styles.backgroundModal}>
                    <View style={styles.viewDialog}>
                        <KeyboardAvoidingView behavior="padding" style={styles.viewTop}>
                            <View style={styles.viewInfo}>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <ShimmerPlaceHolder
                                        shimmerStyle={styles.imageAvatar}
                                    />
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.textName, { width: "50%", }]}
                                    />
                                </View>

                                {
                                    (route.isMe)
                                        ? ""
                                        : <ShimmerPlaceHolder
                                            shimmerStyle={[styles.textFollow, { width: "25%", }]}
                                        />
                                }

                            </View>

                            <ScrollView>
                                <ItemCommentLoader />
                                <ItemCommentLoader />
                                <ItemCommentLoader />
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={[styles.viewWriteComment, { bottom: -20 }]}>
                    <View style={{ paddingHorizontal: 5, marginBottom: 10 }}>
                        <View style={[styles.viewTopWriteComment, { marginBottom: 5, }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.viewRowInteract}>
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.iconInteract, { borderRadius: 15 }]}
                                    />
                                </View>

                                <ShimmerPlaceHolder
                                    shimmerStyle={[styles.iconInteract, { borderRadius: 15 }]}
                                />
                            </View>
                            <ShimmerPlaceHolder
                                shimmerStyle={[styles.iconInteract, { borderRadius: 15 }]}
                            />
                        </View>
                        <ShimmerPlaceHolder
                            shimmerStyle={[styles.textInteract, { borderRadius: 15 }]}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={[styles.inputComment, { height: 40 }]}
                        />
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.buttonSend}
                        />
                    </View>
                </View>
            </>
        )
    }

    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            swipeDirection="down"
            propagateSwipe={true}
            onSwipeComplete={(e) => route.callBack()}
            onBackButtonPress={() => {
                route.callBack();
            }}>
            <View style={{ flex: 1 }}>
                {
                    (isLoader)
                        ? <ListCommentLoader />
                        : <>
                            <View style={styles.backgroundModal}>
                                <View style={styles.viewDialog}>
                                    <KeyboardAvoidingView behavior="padding" style={styles.viewTop}>
                                        <View style={styles.viewInfo}>
                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>

                                                <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                                                        style={styles.imageAvatar} />
                                                    <View style={styles.viewContentOnline}>
                                                        {
                                                            (infoUser.idAccount.online == 0)
                                                                ? <View style={styles.contentOnline} />
                                                                : <>
                                                                    <View style={styles.topOfline} />
                                                                    <View style={styles.contentOfline} />
                                                                </>
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}>
                                                    <Text style={styles.textName}>{infoUser.fullName}</Text>
                                                </TouchableHighlight>
                                            </View>

                                            {
                                                (route.isMe)
                                                    ? ""
                                                    :
                                                    <TouchableOpacity
                                                        onPress={OnFollow}>
                                                        {
                                                            (isFollow)
                                                                ? <Text style={styles.textUnFollow}>Hủy theo dõi</Text>
                                                                : <Text style={styles.textFollow}>Theo dõi</Text>
                                                        }
                                                    </TouchableOpacity>
                                            }

                                        </View>

                                        <ScrollView>
                                            <Pressable>
                                                <View style={styles.viewComment}>
                                                    <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                                        <Image source={srcAvatar} onError={() => setavatarUser(require('../../assets/images/error.png'))}
                                                            style={styles.avatarComment} />
                                                    </TouchableOpacity>
                                                    <View style={styles.viewContent}>
                                                        {
                                                            (isCollapsedContent)
                                                                ? <View>
                                                                    <Text style={styles.contentComment} numberOfLines={2}>
                                                                        <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{infoUser.fullName}{' '}</Text>
                                                                        {blog.contentBlog}
                                                                    </Text>
                                                                    <TouchableOpacity>
                                                                        <Text style={styles.textBelowContentComment} onPress={onCollapsedContent}>
                                                                            Xem thêm
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                : <View>
                                                                    <Pressable onLongPress={onCollapsedContent}>
                                                                        <Text style={styles.contentComment}>
                                                                            <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{infoUser.fullName}{' '}</Text>
                                                                            {blog.contentBlog}
                                                                        </Text>
                                                                    </Pressable>
                                                                    <TouchableOpacity>
                                                                        <Text style={styles.textBelowContentComment} onPress={onCollapsedContent}>
                                                                            Thu gọn
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                        }
                                                        <Text style={[styles.textInteractComment, { marginLeft: 3 }]}>{"• "}{dateBlog}</Text>
                                                    </View>
                                                </View>
                                                {
                                                    (isUploading)
                                                        ? <Animated.View style={[styles.viewComment, { opacity: fadeAnim }]}>
                                                            <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                                                <Image source={{ uri: String(infoLogin.avatarUser) }} onError={() => setavatarUser(require('../../assets/images/error.png'))}
                                                                    style={styles.avatarComment} />
                                                            </TouchableOpacity>
                                                            <View style={styles.viewContent}>
                                                                <Text style={styles.contentComment} >
                                                                    <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{infoLogin.fullName}{' '}</Text>
                                                                    {inputComment}
                                                                </Text>
                                                                <Text style={[styles.textInteractComment, { marginLeft: 3 }]}>{"• Đang đăng..."}</Text>
                                                            </View>
                                                        </Animated.View>
                                                        : ''
                                                }

                                                <FlatList
                                                    scrollEnabled={false}
                                                    data={comments}
                                                    removeClippedSubviews={true}
                                                    maxToRenderPerBatch={5}
                                                    windowSize={10}
                                                    initialNumToRender={5}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item, index }) => <ItemComment item={item} key={index} index={index}
                                                        callBackEdit={callBackEdit} callBackDelete={callBackDelete} isEditing={isEditing} />}
                                                />
                                            </Pressable>
                                        </ScrollView>
                                    </KeyboardAvoidingView>
                                </View>
                            </View>
                            <View style={[
                                styles.viewWriteComment, (isEditing) ?
                                    { top: Dimensions.get('window').height - bottomHeight - 20, } : { bottom: -20, }
                            ]} onLayout={onLayoutBottom}>
                                <View style={{ paddingHorizontal: 5, marginBottom: 10 }}>
                                    <View style={styles.viewTopWriteComment}>
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
                                            </View>

                                            <TouchableOpacity style={styles.iconInteract} disabled={isEditing}
                                                onPress={() => inputCommentRef.current.focus()}>
                                                <Ionicons name="chatbubble-outline" size={25} color={'#001858'} />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.iconInteract} onPress={onSharing}>
                                            <AntDesign name="sharealt" size={25} color={'#001858'} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 5 }}>
                                        <Text style={styles.textInteract}>{blog.interacts.length} lượt thích</Text>
                                        <Text style={styles.textInteractComment}>{"• "}{dateBlog}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <TextInput placeholder="Bạn thấy sao về bài viết này?"
                                        style={[styles.inputComment, { maxHeight: 103 }]} ref={inputCommentRef}
                                        multiline={true} onChangeText={onChangeCommentInput}
                                        value={inputComment} editable={!isEditing} />
                                    <TouchableOpacity style={styles.buttonSend} onPress={onUploadComment}
                                        disabled={isEditing}>
                                        <Feather name="send" size={19} color={'#001858'} style={{ transform: [{ rotate: '45deg' }], marginRight: 3 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                }
                <ToastLayout />
            </View>
        </Modal >
    );
};


export default memo(CommentTab);