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
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from "react-redux";
import { selectCommentByID } from "../../redux/actions/commentAction";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ListComment = (route) => {
    const dispatch = useDispatch();
    const listCmt = useSelector((state) => state.listComment);
    const [blog, setblog] = useState({});
    const [comments, setcomments] = useState(listCmt);
    const [infoUser, setinfoUser] = useState({});
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [isLove, setisLove] = useState(false);
    const [isFollow, setisFollow] = useState(false);
    const [inputComment, setinputComment] = useState('');
    const [interactCount, setinteractCount] = useState(0);
    const [heightIC, setheightIC] = useState(0);
    const inputCommentRef = useRef();
    const [isLoader, setisLoader] = useState(false);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

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
                setblog(route.blog);
                setinfoUser(route.blog.idUser);
                setinteractCount(route.blog.interacts.length);
                setsrcAvatar({ uri: String(route.blog.idUser.avatarUser) });
                setisLoader(false);
            }, 5000);
        }
    }, [isLoader]);

    React.useEffect(() => {
        dispatch(selectCommentByID(blog._id));
        console.log("blog._id: "+ blog._id);
    }, [blog]);

    React.useEffect(() => {
        console.log(listCmt);
        setcomments(listCmt);
    }, [listCmt]);

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
            <View style={styles.backgroundModal}>
                <View style={styles.viewDialog}>
                    <KeyboardAvoidingView behavior="padding" style={styles.viewTop}>
                        <View style={styles.viewInfo}>
                            {
                                (isLoader)
                                    ? [<View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <ShimerPlaceHolder
                                            shimmerStyle={styles.imageAvatar}
                                            shimmerColors={colorLoader}
                                        />
                                        <ShimerPlaceHolder
                                            shimmerStyle={[styles.textName, { width: "50%", }]}
                                            shimmerColors={colorLoader}
                                        />
                                    </View>,

                                    <ShimerPlaceHolder
                                        shimmerStyle={[styles.textFollow, { width: "25%", }]}
                                        shimmerColors={colorLoader}
                                    />]
                                    : [<View style={{ flexDirection: 'row', alignItems: "center" }}>

                                        <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                            <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                                                style={styles.imageAvatar} />
                                        </TouchableOpacity>
                                        <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}>
                                            <Text style={styles.textName}>{infoUser.fullName}</Text>
                                        </TouchableHighlight>
                                    </View>,

                                    <TouchableOpacity
                                        onPress={OnFollow}>
                                        {
                                            (isFollow)
                                                ? <Text style={styles.textFollow}>Theo dõi</Text>
                                                : <Text style={styles.textUnFollow}>Hủy theo dõi</Text>
                                        }
                                    </TouchableOpacity>]
                            }
                        </View>

                        {
                            (isLoader)
                                ? <ScrollView>
                                    <ItemCommentLoader />
                                    <ItemCommentLoader />
                                    <ItemCommentLoader />
                                </ScrollView>
                                :
                                <ScrollView>
                                    <Pressable >
                                        <View style={styles.viewComment}>
                                            <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                                <Image source={srcAvatar} onError={() => setavatarUser(require('../../assets/images/error.png'))}
                                                    style={styles.avatarComment} />
                                            </TouchableOpacity>
                                            <View style={styles.viewContent}>
                                                <Text style={styles.contentComment}>
                                                    <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{infoUser.fullName}{' '}</Text>
                                                    {blog.contentBlog}
                                                </Text>
                                                <Text style={[styles.textInteractComment, { marginLeft: 3 }]}>{"• "}{blog.createdAt}</Text>
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
                        }
                    </KeyboardAvoidingView>
                </View>
            </View>
            <View style={styles.viewWriteComment}>
                {
                    (isLoader)
                        ? <View style={{ paddingHorizontal: 5, marginBottom: 10 }}>
                            <View style={[styles.viewTopWriteComment, { marginBottom: 5, }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.viewRowInteract}>
                                        <ShimerPlaceHolder
                                            shimmerStyle={[styles.iconInteract, { borderRadius: 15 }]}
                                            shimmerColors={colorLoader}
                                        />
                                    </View>

                                    <ShimerPlaceHolder
                                        shimmerStyle={[styles.iconInteract, { borderRadius: 15 }]}
                                        shimmerColors={colorLoader}
                                    />
                                </View>
                                <ShimerPlaceHolder
                                    shimmerStyle={[styles.iconInteract, { borderRadius: 15 }]}
                                    shimmerColors={colorLoader}
                                />
                            </View>
                            <ShimerPlaceHolder
                                shimmerStyle={[styles.textInteract, { borderRadius: 15 }]}
                                shimmerColors={colorLoader}
                            />
                        </View>
                        : <View style={{ paddingHorizontal: 5, marginBottom: 10 }}>
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
                                <Text style={styles.textInteract}>{interactCount} lượt thích</Text>
                                <Text style={styles.textInteractComment}>{"• "}{blog.createdAt}</Text>
                            </View>
                        </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {
                        (isLoader)
                            ?
                            [
                                <ShimerPlaceHolder
                                    shimmerStyle={[styles.inputComment, { height: 40 }]}
                                    shimmerColors={colorLoader}
                                />,
                                <ShimerPlaceHolder
                                    shimmerStyle={styles.buttonSend}
                                    shimmerColors={colorLoader}
                                />
                            ]
                            :
                            [
                                <TextInput placeholder="Bạn thấy sao về bài viết này?"
                                    style={styles.inputComment} ref={inputCommentRef}
                                    multiline={true} onChangeText={(input) => setinputComment(input)}
                                    onContentSizeChange={(event) =>
                                        setheightIC(event.nativeEvent.contentSize.height)
                                    }
                                    value={inputComment} />,
                                <TouchableOpacity style={styles.buttonSend}>
                                    <Feather name="send" size={19} color={'#001858'} style={{ transform: [{ rotate: '45deg' }], marginRight: 3 }} />
                                </TouchableOpacity>
                            ]
                    }
                </View>
            </View>
        </Modal>
    );
};


export default memo(ListComment);