import {
    Text, Image,
    View, ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Dimensions, ToastAndroid,
    FlatList
} from 'react-native';
import React, { useState, useCallback } from "react";
import styles from '../../styles/blog.style';

import AutoHeightImage from 'react-native-auto-height-image';
import HeaderTitle from '../../component/header/HeaderTitle';
import FontModal from '../../component/modals/FontModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { getInfoLogin } from '../../redux/actions/userAction';

const NewPost = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [userLogin, setuserLogin] = useState(useSelector((state) => state.infoLogin));
    const [arr_Image, setarr_Image] = useState([]);
    const [aspectRatio, setaspectRatio] = useState(1 / 1);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
    const [inputContent, setinputContent] = useState("");
    const [inputFont, setinputFont] = useState("Default");
    const [isShowModal, setisShowModal] = useState(false);

    function CheckValidate(newPost) {
        if (newPost.idNguoiDung == undefined) {
            return false;
        }

        if (newPost.noiDung == "") {
            alert('Bạn hãy nhập gì đó trước khi đăng nhé!')
            return false;
        }
    }

    const UploadNotification = () => {

    }

    const AfterPost = async () => {

    }

    const UploadPost = async () => {

    }

    async function PickingImage() {
        // ImagePicker.launchImageLibrary({
        //     mediaType: 'photo',
        //     includeBase64: false,
        //     // maxHeight: 200,
        //     // maxWidth: 200,
        //     quality: 1,
        //     selectionLimit: 100,
        // },
        //     (response) => {
        //         console.log(response);
        //         setipImageUrl(response.assets[0].uri)
        //     },
        // )

        var response = await openPicker({
            mediaType: 'image',
            selectedAssets: 'Images',
            doneTitle: 'Xong',
        });
        setarr_Image(response);
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

    const ImageUpload = ({ item }) => {
        function RemoveImage() {
            var i = arr_Image.indexOf(item);
            arr_Image.splice(i, 1);
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
            <View style={{ marginBottom: 250 }}>
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
        const unsub = navigation.addListener('focus', () => {
            dispatch(getInfoLogin('001'));
        });

        return unsub;
    }, [navigation]);

    React.useEffect(() => {
        console.log(userLogin);
        if (userLogin != undefined && userLogin != {}) {
            setsrcAvatar({ uri: String(userLogin.avatarUser) });
        }
    }, [userLogin]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FEF6E4' }}>
            <HeaderTitle nav={navigation} titleHeader={'Bài viết mới'} colorHeader={'#FEF6E4'} />
            <View style={[styles.viewInfoHead, { paddingTop: 0 }]}>
                <View style={styles.viewRowCenter}>
                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                        style={styles.imageAvatar} />
                    <Text style={styles.textName}>{userLogin.fullName}</Text>
                </View>
                <TouchableHighlight style={styles.buttonUpload}
                    activeOpacity={0.5} underlayColor="#DC749C"
                    onPress={UploadPost}>
                    <Text style={styles.textButtonUpload}>Đăng</Text>
                </TouchableHighlight>
            </View>
            <ScrollView style={styles.viewContent} showsVerticalScrollIndicator={false}>
                {
                    (inputContent == "" && arr_Image.length > 0)
                        ?
                        <View>
                            <TextInput style={[styles.textContentNewPost,
                            { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont) }]}
                                multiline={true}
                                placeholder='Bức ảnh này có gì?' value={inputContent}
                                onChangeText={(input) => { setinputContent(input) }} />
                        </View>
                        :
                        <View>
                            <TextInput style={[styles.textContentNewPost,
                            { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont) }]}
                                multiline={true}
                                placeholder='Bạn muốn chia sẻ điều gì?' value={inputContent}
                                onChangeText={(input) => { setinputContent(input) }} />
                        </View>
                }
                {
                    (arr_Image.length > 0)
                        ?
                        <FlatList
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            data={arr_Image}
                            renderItem={({ item }) => <ImageUpload item={item} />}
                        />
                        : ""
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
        </View>
    );
}


export default NewPost;