import React, { useState, memo } from 'react';
import {
    Text, Dimensions,
    TouchableOpacity,
    View, Image,
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/user.style';
import { useSelector, useDispatch } from "react-redux";
import { selectUserLogin, userSelectStatus } from '../../redux/selectors/userSelector';
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer';
import Moment from "moment";
import { onAxiosPut } from '../../api/axios.function';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import Toast from 'react-native-toast-message';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const InfoManager = () => {
    var navigation = useNavigation();
    const dispatch = useDispatch();
    const infoLogin = useSelector(selectUserLogin);
    const uSelectStatus = useSelector(userSelectStatus);
    const [pickedImage, setpickedImage] = useState(null);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'))
    const [isLoader, setisLoader] = useState(true);

    async function onAvatarPicked() {
        try {
            var response = await openPicker({
                mediaType: 'image',
                selectedAssets: 'Images',
                doneTitle: 'Xong',
                isCrop: true,
                isCropCircle: true,
                singleSelectedMode: true
            });
            if (response.crop) {
                let cropPath = "file://" + response.crop.path;
                response.crop.path = cropPath;
                response.crop.fileName = response.fileName;
                setpickedImage(response.crop);
                setsrcAvatar({ uri: cropPath });
            } else {
                if (response?.path.indexOf('file://') < 0 && response?.path.indexOf('content://') < 0) {
                    response.path = 'file://' + res.path;
                }
                setpickedImage(response);
                setsrcAvatar({ uri: response.path });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function OpenEditUser(type) {
        navigation.navigate('EditUser', { infoType: type, user: infoLogin });
    }

    function OpenEditAccount(type) {
        navigation.navigate('EditAccount', { infoType: type, user: infoLogin });
    }

    async function onUpdateAvatar() {
        Toast.show({
            type: 'loading',
            text1: "Đang cập nhật ảnh đại diện...",
            autoHide: false,
            position: 'top'
        });
        var dataImage = {
            uri: Platform.OS === "android" ? pickedImage.path : pickedImage.path.replace("file://", ""),
            name: pickedImage.fileName,
            type: "multipart/form-data"
        };
        let formData = new FormData();
        formData.append('uploadImages', dataImage);
        let res = await onAxiosPut('user/updateAvatar', formData, 'formdata', true);
        if (res && res?.success) {
            setpickedImage(null);
            dispatch(fetchInfoLogin());
        } else {
            setpickedImage(null);
            setsrcAvatar({ uri: String(infoLogin?.avatarUser) });
        }
    }

    //Use effect    
    React.useEffect(() => {
        if (uSelectStatus == "being idle") {
            setsrcAvatar({ uri: String(infoLogin.avatarUser) });
            setisLoader(false);
        }
    }, [uSelectStatus]);

    React.useEffect(() => {
        if (pickedImage != null) {
            Toast.show({
                type: 'alert',
                position: 'top',
                text1: 'Xác nhận thay đổi ảnh đại diện?',
                autoHide: false,
                props: {
                    confirm: async () => await onUpdateAvatar(),
                    cancel: () => {
                        Toast.hide();
                        setpickedImage(null);
                        setsrcAvatar({ uri: String(infoLogin?.avatarUser) });
                    }
                }
            })
        }
    }, [pickedImage]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            dispatch(fetchInfoLogin());
            // setisLoader(true);

            // return navigation.remove();
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={styles.viewContainer}>
            <HeaderTitle nav={navigation} titleHeader={"Chỉnh sửa thông tin"}
                colorHeader={"#FEF6E4"} />
            {
                (isLoader)
                    ?
                    <View style={{ paddingTop: 15 }}>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                    </View>
                    : <View style={{ flex: 1, paddingTop: 15 }}>
                        {
                            (infoLogin != undefined)
                                ? <View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Image source={srcAvatar}
                                            style={{ width: '35%', aspectRatio: 1 / 1, borderRadius: Dimensions.get('window').width }} />
                                        <TouchableOpacity style={styles.buttonChangeImage}
                                            onPress={onAvatarPicked}>
                                            <MaterialCommunityIcons name='pencil-outline'
                                                size={16} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={[styles.viewItemManager, { borderTopColor: '#D9D9D9', borderTopWidth: 1, marginTop: 15 }]}
                                        onPress={() => OpenEditUser(0)}>
                                        <View style={styles.itemManager}>
                                            <MaterialCommunityIcons name='card-account-details-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Họ và tên</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.fullName != undefined && String(infoLogin?.fullName).trim() != "")
                                                        ? infoLogin.fullName : "Không có dữ liệu"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(0)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditUser(1)}>
                                        <View style={styles.itemManager}>
                                            <MaterialIcons name='drive-file-rename-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Biệt danh</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.nickName != undefined && String(infoLogin?.nickName).trim() != "")
                                                        ? infoLogin.nickName : "Không có dữ liệu"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(1)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditUser(2)}>
                                        <View style={styles.itemManager}>
                                            <MaterialCommunityIcons name='cake' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Sinh nhật</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.birthday != undefined && String(infoLogin?.birthday).trim() != "")
                                                        ? Moment(infoLogin.birthday).format('DD/MM/YYYY') : "Không có dữ liệu"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(2)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditUser(3)}>
                                        <View style={styles.itemManager}>
                                            <MaterialCommunityIcons name='map-marker' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Địa chỉ</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.locationUser != undefined && String(infoLogin?.locationUser).trim() != "")
                                                        ? infoLogin.locationUser : "Không có dữ liệu"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(3)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditUser(4)}>
                                        <View style={styles.itemManager}>
                                            <MaterialCommunityIcons name='account-details' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Giới thiệu</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.description != undefined && String(infoLogin?.description).trim() != "")
                                                        ? infoLogin.description : "Không có dữ liệu"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(4)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditAccount(0)}>
                                        <View style={styles.itemManager}>
                                            <MaterialCommunityIcons name='phone-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Số điện thoại</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin?.idAccount?.phoneNumber != undefined && String(infoLogin?.idAccount?.phoneNumber).trim() != "")
                                                        ? "+" + infoLogin.idAccount.phoneNumber : "Không có dữ liệu"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditAccount(5)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditAccount(1)}>
                                        <View style={styles.itemManager}>
                                            <MaterialCommunityIcons name='email-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Email</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin?.idAccount?.emailAddress != undefined && infoLogin?.idAccount?.emailAddress.trim() != "")
                                                        ? infoLogin.idAccount.emailAddress : "Không có dữ liệu"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditAccount(6)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                                : ""
                        }
                    </View>
            }
        </View>
    );
}


export default memo(InfoManager);