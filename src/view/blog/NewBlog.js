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
import Toast from "react-native-toast-message";
import { addBlog } from "../../redux/reducers/blog/blogReducer";
import { onAxiosPost, onDismissKeyboard } from '../../api/axios.function';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const NewBlog = ({ route }) => {
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

    function onErrorImage() {
        setsrcAvatar(require('../../assets/images/error.png'))
    }

    function checkValidate(newBlog) {
        if (newBlog.idUser == undefined) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Không tìm thấy id người dùng!"
            });
            return false;
        }

        if (newBlog.contentBlog == "") {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Bạn hãy nhập gì đó trước khi đăng nhé!"
            });
            return false;
        }
    }

    const UploadPost = async () => {
        onDismissKeyboard();
        var newBlog = {
            idUser: infoLogin._id,
            contentBlog: inputContent
        }

        if (checkValidate(newBlog) == false) {
            return;
        }

        Toast.show({
            type: 'loading',
            text1: 'Đang đăng bài...',
            position: 'top',
            autoHide: false
        })
        var formData = new FormData();
        formData.append("idUser", infoLogin._id);
        formData.append("contentBlog", inputContent);
        formData.append("contentFont", inputFont);
        formData.append("aspectRatio", aspectRatio);

        if (arr_Image.length > 0) {
            for (let i = 0; i < arr_Image.length; i++) {
                var dataImage = {
                    uri: Platform.OS === "android" ? arr_Image[i].path : arr_Image[i].path.replace("file://", ""),
                    name: arr_Image[i].fileName,
                    type: "multipart/form-data"
                };
                formData.append('uploadImages', dataImage);
            }
        }

        let res = await onAxiosPost('blog/insert', formData, "formdata", true);
        if (res) {
            if (route?.params?.fetchBlog != undefined) {
                route?.params?.fetchBlog()
            }
            dispatch(addBlog(res.data));
            navigation.goBack();
        }
    }

    async function PickingImage() {
        try {
            var response = await openPicker({
                mediaType: 'image',
                selectedAssets: 'Images',
                doneTitle: 'Xong',
            });
            for (let i = 0; i < response.length; i++) {
                const res = response[i];
                if (res?.path.indexOf('file://') < 0 && res?.path.indexOf('content://') < 0) {
                    res.path = 'file://' + res.path;
                    response.splice(i, 1, res);
                }
            } 
            setarr_Image([...arr_Image, ...response]);
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

    useEffect(() => {
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
                    ? <>
                        <View style={[styles.viewInfoHead, { paddingTop: 15 }]}>
                            <View style={styles.viewRowCenter}>
                                <ShimmerPlaceHolder shimmerStyle={styles.imageAvatar} />
                                <ShimmerPlaceHolder shimmerStyle={[styles.textName, { width: 100, borderRadius: 5 }]} />
                            </View>
                            <ShimmerPlaceHolder shimmerStyle={{ width: 70, height: 25, borderRadius: 5 }} />
                        </View>
                        <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
                            <ShimmerPlaceHolder shimmerStyle={{ width: '45%', height: 17, borderRadius: 5 }} />
                        </ScrollView>

                        <View style={styles.navBelow}>
                            <ShimmerPlaceHolder shimmerStyle={[styles.viewRowCenter, { height: 50 }]} />
                            <ShimmerPlaceHolder shimmerStyle={[styles.viewRowCenter, { height: 50 }]} />
                            <View style={styles.lineNavBelow}></View>
                        </View>

                        <FontModal isShow={isShowModal} callBack={CallBackFontModal} font={inputFont} />
                    </>
                    : <>
                        {
                            (infoLogin != undefined)
                                ? <View style={[styles.viewInfoHead, { paddingTop: 15 }]}>
                                    <View style={styles.viewRowCenter}>
                                        <Image source={srcAvatar} onError={onErrorImage}
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
                                            <TextInput style={[styles.textContentNewBlog,
                                            { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont) }]}
                                                multiline={true} maxLength={1000}
                                                placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                                                placeholder='Bức ảnh này có gì?' value={inputContent}
                                                onChangeText={setinputContent} />
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
                                        <TextInput style={[styles.textContentNewBlog,
                                        { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont), marginBottom: 50 }]}
                                            multiline={true} maxLength={1000}
                                            placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                                            placeholder='Bạn muốn chia sẻ điều gì?' value={inputContent}
                                            onChangeText={setinputContent} />
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
                    </>
            }
        </View>
    );
}


export default NewBlog;