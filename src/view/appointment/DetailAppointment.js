import React, { useState, memo } from 'react';
import {
    TouchableHighlight,
    Image, TouchableOpacity,
    Text, View
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import styles from '../../styles/appointment.style';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchDetailProduct } from '../../redux/reducers/filters/filtersReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SetAppointment from '../../component/modals/SetAppointment';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import { getDateDefault } from '../../function/functionDate';
import { onAxiosGet, onAxiosDelete, onAxiosPut } from "../../api/axios.function";
import Toast from "react-native-toast-message";
import { goBack } from '../../navigation/rootNavigation';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const DetailAppointment = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [appointment, setappointment] = useState(undefined);
    const [statusApm, setstatusApm] = useState("Đang hẹn");
    const [srcPet, setsrcPet] = useState(require('../../assets/images/loading.png'));
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isShowSetApm, setisShowSetApm] = useState(false);
    const [isLoader, setisLoader] = useState(true);
    const [isFocusScreen, setisFocusScreen] = useState(false);
    const [canCancel, setcanCancel] = useState(false);

    async function fetchAppointment() {
        let res = await onAxiosGet('appointment/detail/' + route.params.idApm);
        if (res) {
            setappointment(res.data);
        } else {
            setappointment("null");
        }
    }

    function onOpenPet() {
        let type = 0;
        dispatch(fetchDetailProduct({ id: appointment.idPet._id, type }));
        navigation.push('DetailProduct', { type });
    }

    function onOpenShop() {
        navigation.navigate('ShopScreen', { data: appointment.idShop });
    }

    function onShowAlert() {
        if (canCancel) {
            Toast.show({
                type: 'alert',
                position: 'top',
                text1: "Xác nhận hủy lịch hẹn?",
                props: {
                    cancel: () => Toast.hide(),
                    confirm: onCancel
                },
                autoHide: false
            })
        } else {
            Toast.show({
                type: 'alert',
                position: 'top',
                text1: "Xác nhận xóa lịch hẹn?",
                props: {
                    cancel: () => Toast.hide(),
                    confirm: onDelete
                },
                autoHide: false
            })
        }
    }

    async function onCancel() {
        if (canCancel) {
            Toast.show({
                type: 'loading',
                position: 'top',
                text1: "Đang hủy lịch hẹn...",
                autoHide: false
            })
            let res = await onAxiosPut('appointment/update',
                {
                    idAppt: appointment._id,
                    status: "3"
                }, 'json', true)
            if (res) {
                setcanCancel(false);
                setstatusApm("Đã hủy hẹn")
            }
        }
    }

    async function onDelete() {
        if (!canCancel) {
            Toast.show({
                type: 'loading',
                position: 'top',
                text1: "Đang xóa lịch hẹn...",
                autoHide: false
            })
            let res = await onAxiosDelete('appointment/delete/' + appointment._id, true);
            if (res) {
                if (route.params.onCallbackDelete != undefined) {
                    route.params.onCallbackDelete();
                }
                goBack();
            }
        }
    }

    React.useEffect(() => {
        if (isFocusScreen && appointment != undefined) {
            setisLoader(false);
            if (appointment != "null") {
                setsrcPet({ uri: String(appointment.idPet.imagesPet[0]) })
                setsrcAvatar({ uri: String(appointment.idShop.avatarShop) })
                switch (appointment.status) {
                    case "-1":
                        setcanCancel(true);
                        setstatusApm("Chờ xác nhận")
                        break;
                    case "0":
                        setcanCancel(true);
                        setstatusApm("Đang hẹn")
                        break;
                    case "1":
                        setcanCancel(false);
                        setstatusApm("Đã hẹn")
                        break;
                    case "2":
                        setcanCancel(false);
                        setstatusApm("Đã lỡ hẹn")
                        break;
                    case "3":
                        setcanCancel(false);
                        setstatusApm("Đã hủy hẹn")
                        break;
                    default:
                        break;
                }
            }
        }
    }, [appointment]);

    React.useEffect(() => {
        if (isFocusScreen) {
            if (appointment == undefined) {
                setisLoader(true);
                fetchAppointment();
            }
        }
    }, [isFocusScreen]);

    React.useEffect(() => {
        const unsubFocus = navigation.addListener('focus', () => {
            setisFocusScreen(true);
            return () => {
                unsubFocus.remove();
            };
        });

        const unsubBlur = navigation.addListener('blur', () => {
            setisFocusScreen(false);
            return () => {
                unsubBlur.remove();
            };
        });

        const unsubRemove = navigation.addListener('beforeRemove', () => {
            setisFocusScreen(false);
            return () => {
                unsubRemove.remove();
            };
        });

    }, [navigation]);

    const DetailItem = () => {
        return (
            <>
                {
                    (appointment)
                        ? <View>
                            <View style={{ paddingHorizontal: 20, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={onOpenPet}>
                                    <Image style={styles.imageItem} source={srcPet}
                                        onError={() => setsrcPet(require('../../assets/images/error.png'))} />
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={styles.textNamePetItem} numberOfLines={1}>
                                            {appointment.idPet.namePet}
                                        </Text>
                                        <Text style={styles.textPricePet} numberOfLines={1}>
                                            {Number(appointment.idPet.pricePet).toLocaleString()} đồng
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={onOpenPet}>
                                        <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingHorizontal: 25, marginTop: 10, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                    <MaterialCommunityIcons name='calendar' color={'#001858'} size={17} />
                                    <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                                        Ngày hẹn: {(appointment.appointmentDate != undefined)
                                            ? getDateDefault(appointment.appointmentDate) : "Chưa có"}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                    <MaterialCommunityIcons name='paw' color={'#001858'} size={17} />
                                    <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                        Số lượng: {(appointment.amountPet != undefined)
                                            ? appointment.amountPet : "Chưa có"}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                    <View style={{ width: 17, height: 17, left: -1 }}>
                                        <MaterialCommunityIcons name='cash' color={'#001858'} size={20} />
                                    </View>
                                    <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                                        Tiền đặt cọc: {(appointment.deposits != undefined)
                                            ? Number(appointment.deposits).toLocaleString() + " đồng" : "Chưa có"}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                    <View style={{ width: 17, left: -1 }}>
                                        <MaterialCommunityIcons name='map-marker' color={'#001858'} size={20} />
                                    </View>
                                    <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                                        Địa điểm hẹn: {(appointment.location != undefined)
                                            ? appointment.location : "Chưa có"}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                    <MaterialCommunityIcons name='progress-question' color={'#001858'} size={17} />
                                    <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                                        Trạng thái: {statusApm}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                    <MaterialCommunityIcons name='calendar' color={'#001858'} size={17} />
                                    <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                                        Ngày đặt: {(appointment.createdAt != undefined)
                                            ? getDateDefault(appointment.createdAt) : "Chưa có"}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: 'rgba(204, 204, 204, 0.50)', height: 5, width: '100%', marginTop: 15 }} />
                            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.imageItem} source={srcAvatar}
                                            onError={() => setsrcAvatar(require('../../assets/images/error.png'))} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.textNameShop} numberOfLines={1}>
                                                {appointment.idShop.nameShop}
                                            </Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                                <View style={{ width: 12, marginLeft: 3 }}>
                                                    <MaterialCommunityIcons name='map-marker' size={12} />
                                                </View>
                                                <Text style={styles.textLocationShop} numberOfLines={1}>
                                                    {appointment.idShop.locationShop}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={styles.textInfoShop}>
                                            <Text style={{ color: '#F582AE' }}>{appointment.idShop.followers}</Text> người theo dõi
                                        </Text>
                                        <Text style={[styles.textInfoShop, { marginLeft: 9 }]}>
                                            <Text style={{ color: '#F582AE' }}>{(appointment.idShop.rating) ? appointment.idShop.rating : "?.0"}</Text> đánh giá
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.buttonItemShop}
                                        onPress={onOpenShop}>
                                        <Text style={styles.textButtonItemShop}>Xem shop</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonItemShop}
                                        onPress={() => setisShowSetApm(true)}>
                                        <Text style={styles.textButtonItemShop}>Nhắn tin</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ backgroundColor: 'rgba(204, 204, 204, 0.50)', height: 5, width: '100%' }} />
                            <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25, paddingRight: 20 }}>
                                <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#8E8E8E' }]}
                                    activeOpacity={0.5} underlayColor="#6D6D6D"
                                    onPress={goBack}>
                                    <Text style={styles.textButtonSave}>Quay lại</Text>
                                </TouchableHighlight>
                                {
                                    (canCancel)
                                        ? <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#F85555' }]}
                                            activeOpacity={0.5} underlayColor="#EE3F3F"
                                            onPress={onShowAlert}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.textButtonSave}>Hủy lịch hẹn</Text>
                                            </View>
                                        </TouchableHighlight>
                                        : <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#F85555' }]}
                                            activeOpacity={0.5} underlayColor="#EE3F3F"
                                            onPress={onShowAlert}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.textButtonSave}>Xóa lịch hẹn</Text>
                                            </View>
                                        </TouchableHighlight>
                                }
                            </View>
                        </View>
                        : ""
                }
            </>
        )
    }

    const DetailLoader = () => {
        return (
            <View>
                <View style={{ paddingHorizontal: 20, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.imageItem} />
                        <View style={{ marginLeft: 15 }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '50%', height: 18, borderRadius: 5 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '35%', height: 14, borderRadius: 5, marginTop: 10, marginLeft: 7 }} />
                        </View>
                    </View>
                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: 15, height: 25, borderRadius: 5 }} />
                </View>
                <View style={{ paddingHorizontal: 25, marginTop: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '40%', height: 16, borderRadius: 5, marginLeft: 7 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '40%', height: 16, borderRadius: 5, marginLeft: 7 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '40%', height: 16, borderRadius: 5, marginLeft: 7 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '40%', height: 16, borderRadius: 5, marginLeft: 7 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '40%', height: 16, borderRadius: 5, marginLeft: 7 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 17, height: 17, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '40%', height: 16, borderRadius: 5, marginLeft: 7 }} />
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(204, 204, 204, 0.50)', height: 5, width: '100%', marginTop: 15 }} />
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={styles.imageItem} />
                            <View style={{ marginLeft: 10 }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '50%', height: 18, borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '75%', height: 14, borderRadius: 5, marginTop: 10, marginLeft: 7 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 13 }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '30%', height: 15, borderRadius: 5 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '30%', height: 15, marginLeft: 9, borderRadius: 5 }} />
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(204, 204, 204, 0.50)', height: 5, width: '100%' }} />
                <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25, paddingRight: 20 }}>
                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: 75, height: 30, borderRadius: 10, marginLeft: 20 }} />
                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: 75, height: 30, borderRadius: 10, marginLeft: 20 }} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <HeaderTitle nav={navigation} titleHeader={"Chi tiết lịch hẹn"} colorHeader={'#FEF6E4'} />
            {
                (isLoader)
                    ? <DetailLoader />
                    : <>
                        {
                            (appointment == "null")
                                ? <View style={styles.viewOther}>
                                    <FontAwesome name='calendar-times-o' size={70} color={'rgba(0, 0, 0, 0.5)'} />
                                    <Text style={styles.textHint}>Không tìm thấy lịch hẹn..</Text>
                                </View>
                                : <>
                                    <DetailItem />
                                    {
                                        (isShowSetApm)
                                            ? <SetAppointment isShow={isShowSetApm} callBack={() => setisShowSetApm(false)} info={"pet"}
                                                pet={appointment.idPet} shop={appointment.idShop} />
                                            : ""
                                    }
                                </>
                        }
                    </>
            }
        </View>
    );
}


export default memo(DetailAppointment);