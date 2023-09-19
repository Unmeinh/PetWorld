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
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Moment from "moment";
import { onAxiosPut } from '../../api/axios.function';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import Toast from 'react-native-toast-message';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const InfoManager = () => {
    var navigation = useNavigation();
    const dispatch = useDispatch();
    const infoLogin = useSelector(selectUserLogin);
    const uSelectStatus = useSelector(userSelectStatus);
    const [pickedImage, setpickedImage] = useState(null);
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'))
    const [isLoader, setisLoader] = useState(true);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

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
            setpickedImage(response);
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

    //Use effect    
    React.useEffect(() => {
        if (uSelectStatus == "being idle") {
            setsrcAvatar({ uri: String(infoLogin.avatarUser) });
            setisLoader(false);
        }
    }, [uSelectStatus]);

    React.useEffect(() => {
        (async () => {
            if (pickedImage != null) {
                Toast.show({
                    type: 'loading',
                    text1: "Đang cập nhật ảnh đại diện...",
                    // autoHide: false,
                    position: 'top'
                });
                // var dataImage = {
                //     uri: Platform.OS === "android" ? pickedImage.path : pickedImage.path.replace("file://", ""),
                //     name: pickedImage.fileName,
                //     type: "multipart/form-data"
                // };
                // let formData = new FormData();
                // formData.append('uploadImages', dataImage);
                // let res = await onAxiosPut('user/updateAvatar', formData, 'formdata');
                // if (res.success) {
                //     setpickedImage(null);
                //     dispatch(fetchInfoLogin());
                // }
            }
        })();
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
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
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
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='card-account-details-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Họ và tên</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.fullName != undefined) ? infoLogin.fullName : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(0)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditUser(1)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialIcons name='drive-file-rename-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Biệt danh</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.nickName != undefined) ? infoLogin.nickName : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(1)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditUser(2)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='cake' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Sinh nhật</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.birthday != undefined) ? Moment(infoLogin.birthday).format('DD/MM/YYYY') : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(2)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditUser(3)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='map-marker' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Địa chỉ</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.locationUser != undefined) ? infoLogin.locationUser : "Chưa có"}
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
                                                    {(infoLogin.description != undefined) ? infoLogin.description : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditUser(4)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditAccount(0)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='phone-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Số điện thoại</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.idAccount.phoneNumber != undefined) ? "+" + infoLogin.idAccount.phoneNumber : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditAccount(5)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditAccount(1)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='email-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Email</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.idAccount.emailAddress != undefined) ? infoLogin.idAccount.emailAddress : "Chưa có"}
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