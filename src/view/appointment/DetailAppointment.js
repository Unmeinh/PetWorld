import React, { useState, memo } from 'react';
import {
    TouchableHighlight,
    Image, TouchableOpacity,
    Text, View
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import styles from '../../styles/appointment.style';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SetAppointment from '../../component/modals/SetAppointment';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const DetailAppointment = ({ route }) => {
    const navigation = useNavigation();
    var appointment = {};
    const [isLoader, setisLoader] = useState(false);
    const [srcAvatar, setsrcAvatar] = useState({ uri: 'https://img-1.1cham.com/images/2019/09/14/0488c630f467dec11724f8dfa3a85fae.jpg' });
    const [isShowSetApm, setisShowSetApm] = useState(false);

    function OnRemove() {
        setisShowSetApm(true);
    }

    const DetailItem = () => {
        return (
            <View>
                <View style={{ paddingHorizontal: 20, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.imageItem} source={srcAvatar} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.textNamePetItem} numberOfLines={1}>
                                Mèo anh ngu
                            </Text>
                            <Text style={styles.textPricePet} numberOfLines={1}>
                                400.000 đồng
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => { }}>
                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 25, marginTop: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                        <MaterialCommunityIcons name='calendar' color={'#001858'} size={17} />
                        <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                            Ngày hẹn: {(appointment.birthday != undefined) ? appointment.birthday : "Chưa có"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                        <MaterialCommunityIcons name='paw' color={'#001858'} size={17} />
                        <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                            Số lượng: {(appointment.birthday != undefined) ? appointment.birthday : "Chưa có"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                        <View style={{ width: 17, height: 17, left: -1 }}>
                            <MaterialCommunityIcons name='cash' color={'#001858'} size={20} />
                        </View>
                        <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                            Tiền đặt cọc: {(appointment.birthday != undefined) ? appointment.birthday : "Chưa có"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                        <View style={{ width: 17, left: -1 }}>
                            <MaterialCommunityIcons name='map-marker' color={'#001858'} size={20} />
                        </View>
                        <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                            Địa điểm hẹn: {(appointment.birthday != undefined) ? appointment.birthday : "Chưa có"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                        <MaterialCommunityIcons name='progress-question' color={'#001858'} size={17} />
                        <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                            Trạng thái: {(appointment.birthday != undefined) ? appointment.birthday : "Chưa có"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                        <MaterialCommunityIcons name='calendar' color={'#001858'} size={17} />
                        <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, fontFamily: 'ProductSans', fontSize: 15 }}>
                            Ngày đặt: {(appointment.birthday != undefined) ? appointment.birthday : "Chưa có"}
                        </Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(204, 204, 204, 0.50)', height: 5, width: '100%', marginTop: 15 }} />
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.imageItem} source={srcAvatar} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.textNameShop} numberOfLines={1}>
                                    Shop mèo anh
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                                    <View style={{ width: 12, marginLeft: 3 }}>
                                        <MaterialCommunityIcons name='map-marker' size={12} />
                                    </View>
                                    <Text style={styles.textLocationShop} numberOfLines={1}>
                                        Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.textInfoShop}>
                                <Text style={{ color: '#F582AE' }}>150</Text> người theo dõi
                            </Text>
                            <Text style={[styles.textInfoShop, { marginLeft: 9 }]}>
                                <Text style={{ color: '#F582AE' }}>5.0</Text> đánh giá
                            </Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonItemShop}>
                            <Text style={styles.textButtonItemShop}>Xem shop</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonItemShop}>
                            <Text style={styles.textButtonItemShop}>Nhắn tin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(204, 204, 204, 0.50)', height: 5, width: '100%' }} />
                <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25, paddingRight: 20 }}>
                    <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#8E8E8E' }]}
                        activeOpacity={0.5} underlayColor="#6D6D6D"
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.textButtonSave}>Quay lại</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#F85555' }]}
                        activeOpacity={0.5} underlayColor="#EE3F3F"
                        onPress={OnRemove}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textButtonSave}>Hủy hẹn</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
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
            <HeaderTitle nav={navigation} titleHeader={"Chi tiết đặt chỗ"} colorHeader={'#FEF6E4'} />
            {
                (isLoader)
                    ? <DetailLoader />
                    : <DetailItem />
            }
            <SetAppointment isShow={isShowSetApm} callBack={() => setisShowSetApm(false)} info={"pet"} />
        </View>
    );
}


export default memo(DetailAppointment);