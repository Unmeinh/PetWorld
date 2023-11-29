import React, { useState, memo } from 'react';
import {
    FlatList, TouchableHighlight,
    Image, TouchableOpacity,
    Text, View, ScrollView
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import styles from '../../styles/appointment.style';
import { useNavigation } from '@react-navigation/native';
import MenuAppointment from '../../component/modals/MenuAppointment';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import { RefreshControl } from "react-native-gesture-handler";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { onAxiosGet } from '../../api/axios.function';
import { getMonthVietnamese, getTimeDefault, getDateDefault } from '../../function/functionDate';
import Toast from 'react-native-toast-message';

const AppointmentScreen = () => {
    const navigation = useNavigation();
    const [arr_appointment, setarr_appointment] = useState(undefined);
    const [isLoader, setisLoader] = useState(false);
    const [isFocusScreen, setisFocusScreen] = useState(true);
    const [isRefreshing, setisRefreshing] = useState(false);

    async function fetchAppointment() {
        let res = await onAxiosGet('appointment/list');
        if (res) {
            setarr_appointment(res.data);
        } else {
            setarr_appointment([]);
        }
    }

    React.useEffect(() => {
        if (isFocusScreen && arr_appointment != undefined) {
            if (isLoader) {
                setisLoader(false);
            }
            if (isRefreshing) {
                setisRefreshing(false);
            }
        }
    }, [arr_appointment]);

    React.useEffect(() => {
        if (isFocusScreen) {
            if (arr_appointment == undefined) {
                setisLoader(true);
                fetchAppointment();
            } else {
                setisLoader(false);
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

    const ReloadData = React.useCallback(() => {
        setisRefreshing(true);
        fetchAppointment();
    }, []);

    const ListAppointment = (row) => {
        let item = row.item;
        let apmMonth = getMonthVietnamese(new Date(item._id.year + "-" + item._id.month + "-15"));

        // function onDeleteItem(iItem) {
        //     let cloneArr = [...arr_appointment];
        //     let lApm = cloneArr[row.index];
        //     if (item.appointments.length > 1) {
        //         lApm.appointments.splice(iItem, 1);
        //         cloneArr.splice(row.index, 1, lApm);
        //         setarr_appointment(cloneArr);
        //     } else {
        //         cloneArr.splice(row.index, 1);
        //         setarr_appointment(cloneArr);
        //     }
        // }

        return (
            <View >
                {
                    (row.index == 0)
                        ? <View style={{ height: 5 }} />
                        : ""
                }
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ width: 50, height: 12, justifyContent: 'center' }}>
                        <View style={styles.circleLineItem} />
                        <View style={styles.lineItem} />
                    </View>
                    <Text style={styles.dateItem}>{apmMonth}</Text>
                </View>
                <FlatList data={item.appointments}
                    renderItem={({ item, index }) =>
                        <ItemAppointment key={item._id} item={item} index={index}/>}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ paddingTop: 15 }} />
                {
                    (row.index == (arr_appointment.length - 1))
                        ? <View style={{ height: 20 }} />
                        : ""
                }
            </View>
        )
    }

    const ItemAppointment = (row) => {
        let item = row.item;
        let pet = item.idPet[0];
        let shop = item.idShop[0];
        let apmDate = getDateDefault(item.appointmentDate);
        let apmTime = getTimeDefault(item.appointmentDate);
        const [isShowMenu, setisShowMenu] = useState(false);
        const [colorStatus, setcolorStatus] = useState("rgba(0, 24, 88, 0.55)");
        const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));

        function onViewDetail() {
            if (pet) {
                navigation.navigate('DetailAppointment', {
                    idApm: item._id,
                    onCallbackDelete: () => onCallbackDelete()
                });
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Lịch hẹn bị lỗi dữ liệu!\nKhông thể xem chi tiết!'
                })
            }
        }

        function onCallbackCancel() {
            item.status = 3;
            setcolorStatus("#rgba(0, 24, 88, 0.55)");
        }

        function onShowMenu() {
            if (!isShowMenu) {
                if (pet) {
                    setisShowMenu(true);
                } else {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Lịch hẹn bị lỗi dữ liệu!\nKhông thể tương tác!'
                    })
                }
            }
        }

        function onCallbackHide() {
            if (isShowMenu) {
                setisShowMenu(false);
            }
        }

        React.useEffect(() => {
            if (pet) {
                setsrcAvatar({ uri: String(pet.imagesPet[0]) });
            }
        }, [pet]);

        React.useEffect(() => {
            if (item.status) {
                switch (item.status) {
                    case "-1":
                        setcolorStatus("#B59800")
                        break;
                    case "0":
                        setcolorStatus("rgba(0, 24, 88, 0.55)")
                        break;
                    case "1":
                        setcolorStatus("#009A62")
                        break;
                    case "2":
                        setcolorStatus("#FD3F3F")
                        break;
                    case "3":
                        setcolorStatus("#rgba(0, 24, 88, 0.55)")
                        break;
                    default:
                        break;
                }
            }
        }, [item.status]);

        return (
            <View>
                <View style={{ paddingHorizontal: 20, marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.imageItem} source={srcAvatar}
                            onError={() => setsrcAvatar(require('../../assets/images/error.png'))} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.textNamePetItem} numberOfLines={1}>
                                {(pet?.namePet) ? pet.namePet : "Lỗi dữ liệu"}
                            </Text>
                            <Text style={styles.textNameShopItem} numberOfLines={1}>
                                {(shop?.nameShop) ? shop.nameShop : "Lỗi dữ liệu"}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={onShowMenu} >
                        <Entypo name='dots-three-vertical' size={20} color={'#001858'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewDateItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='calendar-clock' size={13} color={'rgba(0, 24, 88, 0.55)'} />
                        <Text style={[styles.textDateItem, { color: String(colorStatus) }]}> {apmDate}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock-outline' size={13} color={'rgba(0, 24, 88, 0.55)'} />
                        <Text style={[styles.textDateItem, { color: String(colorStatus) }]}> {apmTime}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', paddingBottom: 5, marginTop: 10 }}>
                    <TouchableHighlight style={styles.buttonDetail}
                        activeOpacity={0.5} underlayColor="#F3A5C3"
                        onPress={onViewDetail}>
                        <Text style={styles.textButtonDetail}>Xem chi tiết</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ height: 15 }} />
                <MenuAppointment isShow={isShowMenu} status={item.status}
                    idAppt={item._id} pet={pet} shop={shop} callBackHide={onCallbackHide}
                    onCallbackCancel={onCallbackCancel} />
            </View>
        )
    }

    const ItemLoader = () => {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ width: 50, height: 12, justifyContent: 'center' }}>
                        <View style={styles.circleLineItem} />
                        <View style={styles.lineItem} />
                    </View>
                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: '25%', height: 15, borderRadius: 5, marginBottom: 2 }} />
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.imageItem} />
                        <View style={{ marginLeft: 15 }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '50%', height: 18, borderRadius: 5 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '35%', height: 14, borderRadius: 5, marginTop: 10 }} />
                        </View>
                    </View>
                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: 10, height: 20, borderRadius: 5, left: -5 }} />
                </View>
                <View style={styles.viewDateItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '27%' }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 13, height: 13, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '100%', height: 13, borderRadius: 5, marginLeft: 5 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '27%' }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: 13, height: 13, borderRadius: 5 }} />
                        <ShimmerPlaceHolder
                            shimmerStyle={{ width: '100%', height: 13, borderRadius: 5, marginLeft: 5 }} />
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', paddingBottom: 5, paddingTop: 3 }}>
                    <ShimmerPlaceHolder
                        shimmerStyle={{ width: '60%', height: 27, borderRadius: 15 }} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <HeaderTitle nav={navigation} titleHeader={"Lịch hẹn của tôi"} colorHeader={'#FEF6E4'} />
            {
                (isLoader)
                    ? <View style={{ paddingTop: 15 }}>
                        <ItemLoader />
                        <ItemLoader />
                    </View>
                    :
                    <>
                        {
                            (arr_appointment && arr_appointment.length > 0)
                                ?
                                <FlatList data={arr_appointment} scrollEnabled={true}
                                    renderItem={({ item, index }) =>
                                        <ListAppointment key={item._id} item={item} index={index} />}
                                    showsVerticalScrollIndicator={true}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ paddingTop: 15 }}
                                    refreshControl={
                                        <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={0} />
                                    } />
                                : <ScrollView refreshControl={
                                    <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={0} />
                                } >
                                    <View style={styles.viewOther}>
                                        <FontAwesome name='calendar-times-o' size={70} color={'rgba(0, 0, 0, 0.5)'} />
                                        <Text style={styles.textHint}>Không có lịch hẹn nào..</Text>
                                    </View>
                                </ScrollView>
                        }
                    </>
            }
        </View>
    );
}


export default memo(AppointmentScreen);