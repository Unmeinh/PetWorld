import {
    Text, Image,
    View, ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Dimensions,
    FlatList
} from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import styles from '../../styles/blog.style';

import HeaderTitle from '../../component/header/HeaderTitle';
import FontModal from '../../component/modals/FontModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer';
import { selectUserLogin, userSelectStatus } from '../../redux/selectors/userSelector';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ToastLayout } from '../../component/layout/ToastLayout';
import { onAxiosPost } from '../../api/axios.function';

const NewPost = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    let listImageRef = useRef(null);
    const infoLogin = useSelector(selectUserLogin);
    const selectorStatus = useSelector(userSelectStatus);
    const [arr_Image, setarr_Image] = useState((route.params && route.params.arr_Picked) ? route.params.arr_Picked : []);
    const [aspectRatio, setaspectRatio] = useState(1 / 1);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [inputContent, setinputContent] = useState("");
    const [inputFont, setinputFont] = useState("Default");
    const [isShowModal, setisShowModal] = useState(false);
    const [isLoader, setisLoader] = useState(true);

    function checkValidate(newBlog) {
        if (newBlog.idUser == undefined) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Không tìm thấy id người dùng!",
                bottomOffset: 20
            });
            return false;
        }

        if (newBlog.contentBlog == "") {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Bạn hãy nhập gì đó trước khi đăng nhé!",
                bottomOffset: 20
            });
            return false;
        }
    }

    const UploadPost = async () => {
        var newBlog = {
            idUser: infoLogin._id,
            contentBlog: inputContent
        }

        if (checkValidate(newBlog) == false) {
            return;
        }

        var formData = new FormData();
        formData.append("idUser", infoLogin._id);
        formData.append("contentBlog", newBlog.contentBlog);
        formData.append("contentFont", inputFont);
        formData.append("aspectRatio", aspectRatio);

        if (arr_Image.length > 0) {
            for (let i = 0; i < arr_Image.length; i++) {
                console.log(arr_Image[i]);
                var dataImage = {
                    uri: Platform.OS === "android" ? arr_Image[i].path : arr_Image[i].path.replace("file://", ""),
                    name: arr_Image[i].fileName,
                    type: "multipart/form-data"
                };
                console.log(dataImage);
                formData.append('uploadImages', dataImage);
            }
        }

        let res = await onAxiosPost('blog/insert', formData, "formdata");
        if (res && res.success) {
            navigation.goBack();
        }

        // axiosFormData.post('blog/insert', formData)
        //     .then((response) => {
        //         console.log(response);
        //         if (response.status == 201) {
        //             var data = response.data;
        //             if (data.success) {
        //                 Toast.show({
        //                     type: 'success',
        //                     position: 'top',
        //                     text1: String(data.message),
        //                     bottomOffset: 20
        //                 });
        //             }
        //         } else {
        //             var data = response.data;
        //             Toast.show({
        //                 type: 'error',
        //                 position: 'top',
        //                 text1: String(data.message),
        //                 bottomOffset: 20
        //             });
        //         }
        //     })
        //     .catch((e) => {
        //         // var data = response.data;
        //         console.log(e.response.data.message);
        //         Toast.show({
        //             type: 'error',
        //             position: 'top',
        //             text1: String(e.response.data.message),
        //             bottomOffset: 20
        //         });
        //     });
    }

    async function PickingImage() {
        try {
            var response = await openPicker({
                mediaType: 'image',
                selectedAssets: 'Images',
                doneTitle: 'Xong',
            });
            setarr_Image(response);
        } catch (error) {
            console.log(error);
        }
    }

    const ShowFontModal = () => {
        if (isShowModal == false) {
            setisShowModal(true);
        } else {
            setisShowModal(false);
        }
    }

    const CallBackFontModal = (pickedFont) => {
        setisShowModal(false);
        if (pickedFont != undefined) {
            setinputFont(pickedFont);
        }
    }

    const ImageUpload = ({ item, callBack }) => {
        function RemoveImage() {
            let i = arr_Image.indexOf(item);
            let length = arr_Image.length;
            if (length <= 1) {
                let images = [...arr_Image];
                images = []
                setarr_Image(images);
            } else {
                let images = [...arr_Image];
                images.splice(i, 1)
                if (i == (length - 1)) {
                    console.log("last");
                    listImageRef.current.scrollToIndex({
                        animated: true,
                        index: (i - 1),
                    });
                }
                setarr_Image(images);
            }
        }

        function ChangeAspect() {
            if (aspectRatio == 1 / 1) {
                setaspectRatio(3 / 2);
            }
            if (aspectRatio == 3 / 2) {
                setaspectRatio(2 / 3);
            }
            if (aspectRatio == 2 / 3) {
                setaspectRatio(1 / 1);
            }
        }

        return (
            <View style={{ marginBottom: 100 }}>
                <Image source={{ uri: String(item.path) }}
                    style={{ width: Dimensions.get('window').width, aspectRatio: String(aspectRatio) }}>
                </Image>
                <View style={styles.viewButtonIC}>
                    <TouchableOpacity style={styles.buttonImageContent}
                        onPress={ChangeAspect}>
                        <Feather name='refresh-cw' size={15} color={'#001858'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImageContent}
                        onPress={RemoveImage}>
                        <Feather name='x' size={19} color={'#001858'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', async () => {
            dispatch(fetchInfoLogin());
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    useEffect(() => {
        if (selectorStatus == "being idle") {
            if (infoLogin != undefined && isLoader) {
                console.log(infoLogin);
                setsrcAvatar({ uri: String(infoLogin.avatarUser) });
                setisLoader(false);
            }
        }
    }, [selectorStatus]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FEF6E4' }}>
            <HeaderTitle nav={navigation} titleHeader={'Bài viết mới'} colorHeader={'#FEF6E4'} />
            {
                (isLoader)
                    ? ""
                    : <>
                        {
                            (infoLogin != undefined)
                                ? <View style={[styles.viewInfoHead, { paddingTop: 15 }]}>
                                    <View style={styles.viewRowCenter}>
                                        <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                                            style={styles.imageAvatar} />
                                        <Text style={styles.textName}>{infoLogin.fullName}</Text>
                                    </View>
                                    <TouchableHighlight style={styles.buttonUpload}
                                        activeOpacity={0.5} underlayColor="#DC749C"
                                        onPress={UploadPost}>
                                        <Text style={styles.textButtonUpload}>Đăng</Text>
                                    </TouchableHighlight>
                                </View>
                                : ""
                        }
                        <ScrollView style={styles.viewContent} showsVerticalScrollIndicator={false}>
                            {
                                (arr_Image.length > 0)
                                    ?
                                    <>
                                        <View>
                                            <TextInput style={[styles.textContentNewPost,
                                            { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont) }]}
                                                multiline={true}
                                                placeholder='Bức ảnh này có gì?' value={inputContent}
                                                onChangeText={(input) => { setinputContent(input) }} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <FlatList
                                                horizontal ref={listImageRef}
                                                pagingEnabled
                                                showsHorizontalScrollIndicator={false}
                                                data={arr_Image}
                                                renderItem={({ item }) => <ImageUpload item={item} />}
                                            />
                                        </View>
                                    </>
                                    :
                                    <View>
                                        <TextInput style={[styles.textContentNewPost,
                                        { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont), marginBottom: 50 }]}
                                            multiline={true}
                                            placeholder='Bạn muốn chia sẻ điều gì?' value={inputContent}
                                            onChangeText={(input) => { setinputContent(input) }} />
                                    </View>
                            }
                        </ScrollView>

                        {/* Nav below */}
                        <View style={styles.navBelow}>
                            <TouchableOpacity style={styles.viewRowCenter}
                                onPress={PickingImage}>
                                <MaterialCommunityIcons name='file-image-plus-outline' size={22} color={'#001858'} />
                                <Text style={styles.textInNavBelow}>Hình ảnh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.viewRowCenter} onPress={ShowFontModal}>
                                <MaterialCommunityIcons name='format-font' size={22} color={'#001858'} />
                                <Text style={styles.textInNavBelow}>Phông chữ</Text>
                            </TouchableOpacity>
                            <View style={styles.lineNavBelow}></View>
                        </View>

                        <FontModal isShow={isShowModal} callBack={CallBackFontModal} font={inputFont} />
                        <ToastLayout />
                    </>
            }
        </View>
    );
}


export default NewPost;