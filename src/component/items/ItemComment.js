import {
    Text, Animated,
    View, TouchableOpacity,
    Image, TextInput,
    Pressable
} from "react-native";
import React, { useState, memo } from "react";
import Clipboard from '@react-native-clipboard/clipboard';
import styles from "../../styles/comment.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MenuContext from "../menu/MenuContext";
import ViewAccountModal from "../modals/ViewAccountModal";
import { userLoginId } from '../../redux/selectors/userSelector';
import { useSelector } from "react-redux";
import { getDateTimeVietnamese } from "../../function/functionDate";
import Toast from "react-native-toast-message";
import { onAxiosPut, onAxiosDelete } from "../../api/axios.function";
import { useNavigation } from "@react-navigation/native";

const ItemComment = (row) => {
    const navigation = useNavigation();
    const [comment, setcomment] = useState(row.item);
    let user = row.item.idUser;
    let loginId = useSelector(userLoginId);
    const [avatarUser, setavatarUser] = useState({ uri: String(user.avatarUser) })
    const [isLoveComment, setisLoveComment] = useState(false);
    const [enterEditing, setenterEditing] = useState(row.isEditing);
    const [commentEditing, setcommentEditing] = useState(comment.content);
    const [isUploading, setisUploading] = useState(false);
    const [isLongContent, setisLongContent] = useState(false);
    const [isCollapsedContent, setisCollapsedContent] = useState(true);
    const [isShowAccount, setisShowAccount] = useState(false);
    const [isShowMenu, setisShowMenu] = useState(false);
    const [menuNames, setmenuNames] = useState([]);
    const [menuFunctions, setmenuFunctions] = useState([]);
    let fadeAnim = new Animated.Value(0.4);
    let springValue = new Animated.Value(0);

    function OpenAccount() {
        navigation.push('ViewPage', { idUser: user._id });
    }

    function onCopyContent() {
        setisShowMenu(false);
        Clipboard.setString(comment.content);
        Toast.show({
            type: 'success',
            text1: 'Đã sao chép vào bộ nhớ tạm.',
            position: 'top'
        })
    }

    function onReactingComment() {
        setisShowMenu(false);
        if (isLoveComment) {
            setisLoveComment(false);
        } else {
            setisLoveComment(true);
        }
    }

    function onEnterEditing() {
        setisShowMenu(false);
        if (row.isEditing == false) {
            setenterEditing(true);
            setcommentEditing(comment.content);
            row.callBackEdit(true);
        }
    }

    function onCancelEditing() {
        if (isUploading) {
            Toast.show({
                type: 'error',
                text1: 'Vui lòng chờ bình luận được đăng!',
                position: 'top'
            })
            return;
        }
        setenterEditing(false);
        row.callBackEdit(false);
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
        if (commentEditing.trim('') == "") {
            Toast.show({
                type: 'error',
                text1: 'Hãy viết gì đó trước khi đăng nhé!',
                position: 'top'
            })
            return;
        }
        if (commentEditing.length > 200) {
            Toast.show({
                type: 'error',
                text1: 'Bình luận chỉ có thể dài tối đa 200 ký tự!',
                position: 'top'
            })
            return;
        }
        setisUploading(true);
        let res = await onAxiosPut('comment/update',
            {
                idBlog: comment.idBlog,
                idComment: comment._id,
                content: commentEditing
            }, 'json', false);
        if (res) {
            setisUploading(false);
            setenterEditing(false);
            row.callBackEdit(false);
            let clone = { ...comment };
            clone = res.data;
            setcomment(clone);
        } else {
            setisUploading(false);
        }
    }

    async function onDeleteComment() {
        setisShowMenu(false);
        setisUploading(true);
        let res = await onAxiosDelete("comment/delete/" + comment._id);
        if (res) {
            row.callBackDelete(row.index);
            setisUploading(false);
        } else {
            setisUploading(false);
        }
    }

    function onShowAlert() {
        setisShowMenu(false);
        Toast.show({
            type: 'alert',
            position: 'top',
            text1: "Xác nhận xóa bình luận?",
            props: {
                cancel: () => Toast.hide(),
                confirm: onDeleteComment
            },
            autoHide: false
        })
    }

    function onChangeCommentInput(input) {
        if (input.length > 200) {
            Toast.show({
                type: 'error',
                text1: 'Bạn chỉ có thể nhập tối đa 200 ký tự!',
                position: 'top'
            })
        } else {
            setcommentEditing(input);
        }
    }

    function onShowMenu() {
        setisShowMenu(!isShowMenu);
    }

    function onCollapsedContent() {
        setisCollapsedContent(!isCollapsedContent);
    }

    const onTextLayout = React.useCallback((e) => {
        if (e.nativeEvent.lines.length > 5) {
            setisLongContent(true);
        }
    }, []);

    React.useEffect(() => {
        if (user) {
            setavatarUser({ uri: String(user.avatarUser) })
        }
    }, [user])

    React.useEffect(() => {
        setcomment(row.item);
    }, [row.item])

    React.useEffect(() => {
        if (isShowMenu) {
            if (String(user._id) == String(loginId)) {
                setmenuNames(["Sao chép nội dung", "Sửa bình luận", "Xóa bình luận"]);
                setmenuFunctions([onCopyContent, onEnterEditing, onShowAlert]);
            } else {
                setmenuNames(["Sao chép nội dung", "Xem trang cá nhân"]);
                setmenuFunctions([onCopyContent, OpenAccount]);
            }
        }
    }, [isShowMenu]);

    React.useEffect(() => {
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

    return (
        <Animated.View style={[styles.viewComment, (isUploading) ? { opacity: fadeAnim } : {}]}>
            <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}
                disabled={isUploading}>
                <Image source={avatarUser} onError={() => setavatarUser(require('../../assets/images/error.png'))}
                    style={styles.avatarComment} />
            </TouchableOpacity>
            {
                (enterEditing)
                    ?
                    <View style={styles.viewContent}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.contentComment, { fontWeight: 'bold', marginBottom: 5 }]}>{user.fullName}{' '}</Text>
                            <AntDesign name="edit" size={19} color={'#DC143C'} />
                        </View>
                        <TextInput style={[styles.inputComment, { maxHeight: 103, marginBottom: 3 }]} multiline={true}
                            value={commentEditing} onChangeText={onChangeCommentInput} />
                        <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }} onPress={onUploadComment}>
                                    <Ionicons name="share-outline" size={17} color={'#2E8B57'} />
                                    <Text style={{ marginLeft: 3, color: '#2E8B57', fontFamily: 'ProductSans', fontSize: 14 }}>Lưu lại</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }} onPress={onCancelEditing}>
                                    <Ionicons name="close-outline" size={19} color={'#DC143C'} />
                                    <Text style={{ color: '#DC143C', fontFamily: 'ProductSans', fontSize: 14 }}>Hủy bỏ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.viewContent}>
                        {
                            (!isLongContent)
                                ? <Text style={styles.contentComment} onTextLayout={onTextLayout}>
                                    <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{user.fullName}{' '}</Text>
                                    {comment.content}
                                </Text>
                                : <>
                                    {
                                        (isCollapsedContent)
                                            ? <View>
                                                <Text style={styles.contentComment} onTextLayout={onTextLayout}
                                                    numberOfLines={5}>
                                                    <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{user.fullName}{' '}</Text>
                                                    {comment.content}
                                                </Text>
                                                <TouchableOpacity>
                                                    <Text style={styles.textBelowContentComment} onPress={onCollapsedContent}>
                                                        Xem thêm
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            : <View>
                                                <Pressable onLongPress={onCollapsedContent}>
                                                    <Text style={styles.contentComment} onTextLayout={onTextLayout}>
                                                        <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{user.fullName}{' '}</Text>
                                                        {comment.content}
                                                    </Text>
                                                </Pressable>
                                                <TouchableOpacity>
                                                    <Text style={styles.textBelowContentComment} onPress={onCollapsedContent}>
                                                        Thu gọn
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                    }
                                </>
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewRowInteract}>
                                <Text style={styles.textInteractComment}>{"• "}{getDateTimeVietnamese(comment.createdAt)}</Text>
                                <Text style={styles.textInteractComment}>{"• "}{comment.interacts.length} lượt thích</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    (isLoveComment)
                                        ? <TouchableOpacity style={styles.iconInteractComment} onPress={onReactingComment}
                                            disabled={isUploading}>
                                            <Ionicons name="heart" size={19} color={'#f00'} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.iconInteractComment} onPress={onReactingComment}
                                            disabled={isUploading}>
                                            <Ionicons name="heart-outline" size={19} color={'#001858'} />
                                        </TouchableOpacity>
                                }
                                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }} onPress={onReactingComment}
                                    disabled={isUploading}>
                                    <Ionicons name="return-down-back" size={19} color={'#001858'} />
                                    <Text style={{ marginLeft: 3, color: '#001858', fontFamily: 'ProductSans', fontSize: 14 }}>Trả lời</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 15 }} onPress={onShowMenu}
                                    disabled={isUploading}>
                                    <Ionicons name="ellipsis-vertical" size={19} color={'#001858'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
        </Animated.View>
    )
}

export default memo(ItemComment);