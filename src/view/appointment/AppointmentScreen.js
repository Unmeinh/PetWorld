import React, { useState, memo } from 'react';
import {
    FlatList, TouchableHighlight,
    Image, TouchableOpacity,
    Text, View
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import styles from '../../styles/appointment.style';
import { useNavigation } from '@react-navigation/native';
import MenuAppointment from '../../component/modals/MenuAppointment';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from "moment";
import "moment/locale/vi";

const AppointmentScreen = () => {
    const navigation = useNavigation();
    const arr_appointment = [{ appointmentDate: new Date("2023-09-21") }, { appointmentDate: new Date() }, { appointmentDate: new Date("2023-07-21") }, { appointmentDate: new Date("2023-05-21") }];
    const [isLoader, setisLoader] = useState(false);

    const ItemAppointment = (row) => {
        var item = row.item;
        var apmDate = item.appointmentDate;
        const [isShowMenu, setisShowMenu] = useState(false);
        const [srcAvatar, setsrcAvatar] = useState({ uri: 'https://img-1.1cham.com/images/2019/09/14/0488c630f467dec11724f8dfa3a85fae.jpg' });

        function OnViewDetail() {
            navigation.navigate('DetailAppointment', { idApm: item._id });
        }

        function getDate() {
            let date = Moment(new Date());
            if (Moment().diff(date, 'months') >= 2) {
                return date.fromNow();
            }
            // date.calendar().split(' ')[0] get in en
            console.log(date.calendar());
            return date.calendar().split(' ')[0] + " " + date.calendar().split(' ')[1];
        }

        function getItemMonth() {
            let date = new Date();
            if (date.getMonth() == apmDate.getMonth()) {
                return "Tháng này";
            }
            if (date.getMonth() < apmDate.getMonth()) {
                if (apmDate.getMonth() - date.getMonth() == 1) {
                    return "Tháng sau";
                } else {
                    return "Tháng " + (apmDate.getMonth() + 1);
                }
            }
            if (date.getMonth() > apmDate.getMonth()) {
                if (date.getMonth() - apmDate.getMonth() == 1) {
                    return "Tháng trước";
                } else {
                    return "Tháng " + (apmDate.getMonth() + 1);
                }
            }
        }

        return (
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ width: 50, height: 12, justifyContent: 'center' }}>
                        <View style={styles.circleLineItem} />
                        <View style={styles.lineItem} />
                    </View>
                    <Text style={styles.dateItem}>{getItemMonth()}</Text>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.imageItem} source={srcAvatar} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.textNamePetItem} numberOfLines={1}>
                                Mèo anh ngu
                            </Text>
                            <Text style={styles.textNameShopItem} numberOfLines={1}>
                                Shop mèo
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { setisShowMenu(true) }}>
                        <Entypo name='dots-three-vertical' size={20} color={'#001858'} />
                    </TouchableOpacity>
                    {
                        (isShowMenu)
                            ? ""
                            : ""
                    }
                </View>
                <View style={styles.viewDateItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock-outline' size={13} color={'rgba(0, 24, 88, 0.55)'} />
                        <Text style={styles.textDateItem}>8:00 - 10:00 AM</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock-outline' size={13} color={'rgba(0, 24, 88, 0.55)'} />
                        <Text style={styles.textDateItem}>8:00 - 10:00 AM</Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', paddingBottom: 5 }}>
                    <TouchableHighlight style={styles.buttonDetail}
                        activeOpacity={0.5} underlayColor="#F3A5C3"
                        onPress={OnViewDetail}>
                        <Text style={styles.textButtonDetail}>Xem chi tiết</Text>
                    </TouchableHighlight>
                </View>
                {
                    (row.index == arr_appointment.length - 1)
                        ? <View style={{ height: 20 }} />
                        : ""
                }
                <MenuAppointment isShow={isShowMenu} callBack={() => setisShowMenu(false)} />
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

    React.useEffect(() => {
        if (isLoader) {
            setTimeout(() => {
                setisLoader(false);
            }, 3000);
        }
    }, [isLoader]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            setisLoader(true);

            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <HeaderTitle nav={navigation} titleHeader={"Đặt chỗ của tôi"} colorHeader={'#FEF6E4'} />
            {
                (isLoader)
                    ? <View style={{paddingTop: 15}}>
                        <ItemLoader />
                        <ItemLoader />
                    </View>
                    : <FlatList data={arr_appointment} scrollEnabled={true}
                        renderItem={({ item, index }) =>
                            <ItemAppointment key={item._id} item={item} index={index} />}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()} 
                        style={{paddingTop: 15}}/>
            }
        </View>
    );
}


export default memo(AppointmentScreen);