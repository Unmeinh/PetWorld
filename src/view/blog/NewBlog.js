import {
    Text, Image,
    View, ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Dimensions, ToastAndroid
} from 'react-native';
import React, { useState, useCallback } from "react";
import styles from '../../styles/blog.style';

import HeaderTitle from '../../component/header/HeaderTitle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AutoHeightImage from 'react-native-auto-height-image';
import user from '../../data/user';

const NewPost = ({ route, navigation }) => {
    const [myInfo, setmyInfo] = useState(user[0]);
    const [dataImage, setdataImage] = useState('');
    const [ipImageUrl, setipImageUrl] = useState('');
    const [srcAvatar, setsrcAvatar] = useState({ uri: String(myInfo.avatarUser) });
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

    function PickingImage() {

    }

    const RemoveImage = () => {
        setipImageUrl("");
        setdataImage({});
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

    return (
        <View style={{ flex: 1, backgroundColor: '#FEF6E4' }}>
            <HeaderTitle nav={navigation} titleHeader={'Bài viết mới'} colorHeader={'#FEF6E4'}/>
            <View style={[styles.viewInfoHead, { paddingTop: 0 }]}>
                <View style={styles.viewRowCenter}>
                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/image/error.png'))}
                        style={styles.imageAvatar} />
                    <Text style={styles.textName}>{myInfo.fullName}</Text>
                </View>
                <TouchableHighlight style={styles.buttonUpload} 
                        activeOpacity={0.5} underlayColor="#DC749C"
                        onPress={UploadPost}>
                    <Text style={styles.textButtonUpload}>Đăng</Text>
                </TouchableHighlight>
            </View>
            <ScrollView style={styles.viewContent} showsVerticalScrollIndicator={false}>
                {
                    (inputContent == "" && ipImageUrl != "")
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
                                placeholder='Bạn muốn nói gì?' value={inputContent}
                                onChangeText={(input) => { setinputContent(input) }} />
                        </View>
                }
                {
                    (ipImageUrl != "")
                        ?
                        <View style={{ marginBottom: 250 }}>
                            <AutoHeightImage source={{ uri: String(ipImageUrl) }}
                                width={Dimensions.get("window").width}>
                            </AutoHeightImage>
                            <View style={styles.viewButtonIC}>
                                <TouchableOpacity style={styles.buttonImageContent}
                                    onPress={RemoveImage}>
                                    <Feather name='x' size={19} style={styles.iconImageContent} />
                                </TouchableOpacity>
                            </View>
                        </View>
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

            {/* <FontModal isShow={isShowModal} callBack={CallBackFontModal} font={inputFont} /> */}
        </View>
    );
}


export default NewPost;