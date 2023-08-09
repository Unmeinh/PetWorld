import {
    Text, Platform,
    View, TouchableOpacity,
    TouchableHighlight, Image,
    FlatList, ScrollView,
    KeyboardAvoidingView
} from "react-native";
import React, { useState, useRef } from "react";
import Modal from 'react-native-modal';
import styles from "../../styles/comment.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from "react-native-gesture-handler";
import ItemComment from "../items/ItemComment";

const ListComment = (route) => {
    const [blog, setblog] = useState(route.blog);
    const [infoUser, setinfoUser] = useState(route.blog.idUser)
    const [srcAvatar, setsrcAvatar] = useState({ uri: String(route.blog.idUser.avatarUser) });
    const [isLove, setisLove] = useState(false);
    const [isFollow, setisFollow] = useState(false);
    const [inputComment, setinputComment] = useState('');
    const [heightIC, setheightIC] = useState(0);
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

    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            onBackButtonPress={() => {
                route.callBack();
            }}>
            <View style={styles.backgroundModal}>
                <View style={styles.viewDialog}>
                    <KeyboardAvoidingView behavior="padding" style={styles.viewTop}>
                        <View style={styles.viewInfo}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/image/error.png'))}
                                        style={styles.imageAvatar} />
                                </TouchableOpacity>
                                <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} activeOpacity={0.5}>
                                    <Text style={styles.textName}>{infoUser.fullName}</Text>
                                </TouchableHighlight>
                            </View>

                            <TouchableOpacity
                                onPress={OnFollow}>
                                {
                                    (isFollow)
                                        ? <Text style={styles.textFollow}>Theo dõi</Text>
                                        : <Text style={styles.textUnFollow}>Hủy theo dõi</Text>
                                }
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            <View>
                                <View style={styles.viewComment}>
                                    <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                                        <Image source={srcAvatar} onError={() => setavatarUser(require('../../assets/image/error.png'))}
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
                                    data={blog.comments}
                                    renderItem={({ item }) => <ItemComment item={item} />}
                                />
                            </View>
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
                        <Text style={styles.textInteractComment}>{"• "}{blog.createdAt}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                </View>
            </View>
        </Modal>
    );
};


export default ListComment;