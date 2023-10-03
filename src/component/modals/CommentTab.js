import {
    Text, Pressable, TextInput,
    View, TouchableOpacity,
    TouchableHighlight, Image,
    FlatList, ScrollView,
    KeyboardAvoidingView
} from "react-native";
import React, { useState, useRef, memo } from "react";
import Modal from 'react-native-modal';
import styles from "../../styles/comment.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ItemComment from "../items/ItemComment";
import ItemCommentLoader from "../items/ItemCommentLoader";
import { useSelector, useDispatch } from "react-redux";
import { selectCommentByID } from "../../redux/actions/commentAction";
import { getDateTimeVietnamese } from "../../function/functionDate";
import ShimmerPlaceHolder from "../layout/ShimmerPlaceHolder";

const CommentTab = (route) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.listComment);
    let blog = route.blog;
    let infoUser = blog.idUser;
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isLove, setisLove] = useState(false);
    const [isFollow, setisFollow] = useState(false);
    const [inputComment, setinputComment] = useState('');
    const [heightIC, setheightIC] = useState(0);
    const [isLoader, setisLoader] = useState(false);
    const inputCommentRef = useRef();

    function onReacting() {
        if (isLove) {
            setisLove(false);
        } else {
            setisLove(true);
        }
    }

    function OpenAccount() {

    }

    function OnFollow() {
        if (isFollow) {
            setisFollow(false);
        } else {
            setisFollow(true);
        }
    }

    React.useEffect(() => {
        if (route.isShow) {
            setisLoader(true);
        }
    }, [route.isShow]);

    React.useEffect(() => {
        if (isLoader) {
            setTimeout(() => {
                setisLoader(false);
            }, 5000);
        }
    }, [isLoader]);

    React.useEffect(() => {
        if (blog) {
            if (infoUser) {
                setsrcAvatar({ uri: String(infoUser.avatarUser) });
            }
            dispatch(selectCommentByID(blog._id));
        }
    }, [blog]);

    const ListComment = () => {
        return (
            <>
                <View style={styles.backgroundModal}>
                    <View style={styles.viewDialog}>
                        <KeyboardAvoidingView behavior="padding" style={styles.viewTop}>
                            <View style={styles.viewInfo}>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>

                                    <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                                            style={styles.imageAvatar} />
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
                                                    ? <Text style={styles.textFollow}>Theo dõi</Text>
                                                    : <Text style={styles.textUnFollow}>Hủy theo dõi</Text>
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
                                            <Text style={styles.contentComment} numberOfLines={2}>
                                                <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{infoUser.fullName}{' '}</Text>
                                                {blog.contentBlog}
                                            </Text>
                                            <Text style={[styles.textInteractComment, { marginLeft: 3 }]}>{"• "}{getDateTimeVietnamese(blog.createdAt)}</Text>
                                        </View>
                                    </View>

                                    <FlatList
                                        scrollEnabled={false}
                                        data={comments}
                                        removeClippedSubviews={true}
                                        maxToRenderPerBatch={5}
                                        windowSize={10}
                                        initialNumToRender={5}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => <ItemComment item={item} key={index} />}
                                    />
                                </Pressable>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={styles.viewWriteComment}>
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

                                <TouchableOpacity style={styles.iconInteract} onPress={() => inputCommentRef.current.focus()}>
                                    <Ionicons name="chatbubble-outline" size={25} color={'#001858'} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.iconInteract}>
                                <AntDesign name="sharealt" size={25} color={'#001858'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 5 }}>
                            <Text style={styles.textInteract}>{blog.interacts.length} lượt thích</Text>
                            <Text style={styles.textInteractComment}>{"• "}{getDateTimeVietnamese(blog.createdAt)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <>
                            <TextInput placeholder="Bạn thấy sao về bài viết này?"
                                style={styles.inputComment} ref={inputCommentRef}
                                multiline={true} onChangeText={(input) => setinputComment(input)}
                                onContentSizeChange={(event) =>
                                    setheightIC(event.nativeEvent.contentSize.height)
                                }
                                value={inputComment} />
                            <TouchableOpacity style={styles.buttonSend}>
                                <Feather name="send" size={19} color={'#001858'} style={{ transform: [{ rotate: '45deg' }], marginRight: 3 }} />
                            </TouchableOpacity>
                        </>
                    </View>
                </View>
            </>
        )
    }

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
                <View style={styles.viewWriteComment}>
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
            {
                (isLoader)
                    ? <ListCommentLoader />
                    : <ListComment />
            }
        </Modal>
    );
};


export default memo(CommentTab);