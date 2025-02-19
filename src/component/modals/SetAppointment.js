import {
    Text, TextInput,
    View, TouchableOpacity,
    TouchableHighlight, Image,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import styles from "../../styles/appointment.style";
import ShimmerPlaceHolder from "../layout/ShimmerPlaceHolder";
import { Pressable } from "react-native";
import DatePickerModal from '../../component/modals/DatePickerModal';
import Toast from "react-native-toast-message";
import { ToastLayout } from "../layout/ToastLayout";
import { onAxiosPost } from "../../api/axios.function";
import Moment from "moment";

const SetAppointment = (route) => {
    const navigation = useNavigation();
    const editable = false;
    const infoPet = route.pet;
    const infoShop = route.shop;
    const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
    const [isLoader, setisLoader] = useState(false);
    const [isShowPicker, setisShowPicker] = useState(false);
    const [inputDatePicker, setinputDatePicker] = useState(new Date());
    const [inputAmount, setinputAmount] = useState("");
    const [inputLocation, setinputLocation] = useState("");

    function onCancel() {
        setinputAmount(0);
        setinputDatePicker(new Date());
        setinputLocation("");
        route.callBack();
    }

    async function OnSave() {
        if (inputAmount <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Số lượng thú cưng đặt cần lớn hơn 0!',
                position: 'top'
            })
            return;
        }

        if (inputAmount > infoPet.amountPet) {
            Toast.show({
                type: 'error',
                text1: 'Số lượng thú cưng đặt tối đa là ' + infoPet.amountPet + '!',
                position: 'top'
            })
            return;
        }

        if (inputLocation.trim().length <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Địa điểm hẹn không để trống!',
                position: 'top'
            })
            return;
        }

        Toast.show({
            type: 'loading',
            position: 'top',
            text1: "Đang đặt lịch hẹn...",
            autoHide: false
        })
        let res = await onAxiosPost('appointment/insert',
            {
                amountPet: inputAmount,
                location: inputLocation,
                deposits: 0,
                appointmentDate: inputDatePicker,
                idPet: infoPet._id,
                idShop: infoShop._id
            }, 'json', true);
        if (res) {
            setTimeout(() => onCancel(), 300);
        }
    }

    function onChangeAmount(input) {
        let amount = input.replace(/\D/g, '');
        setinputAmount(amount);
    }

    function onChangeLocation(input) {
        setinputLocation(input);
    }

    React.useEffect(() => {
        if (route.isShow) {
            setisLoader(true);
        }
    }, [route.isShow]);

    React.useEffect(() => {
        if (infoPet != undefined) {
            setisLoader(false);
            setsrcAvatar({ uri: infoPet.imagesPet[0] })
        }
    }, [infoPet]);

    const ModalLoader = () => {
        return (
            <View style={styles.dialogAppointment}>
                <Text style={styles.titleDialogApm}>Đặt lịch hẹn</Text>
                <View style={{ padding: 15, paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                        <ShimmerPlaceHolder
                            shimmerStyle={styles.imageItemDialog} />

                        <View style={{ marginLeft: 15 }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '50%', height: 15, borderRadius: 5, marginBottom: 5 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '40%', height: 13, borderRadius: 5, marginBottom: 5, marginTop: 3 }} />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: '65%', height: 14, borderRadius: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <View style={{ justifyContent: 'space-around', width: '27%' }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '100%', height: 14, borderRadius: 5, marginTop: 9 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '100%', height: 14, borderRadius: 5, marginTop: 9 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '100%', height: 14, borderRadius: 5, marginTop: 9 }} />
                            </View>
                            <View style={{ width: '70%' }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '100%', height: 25, borderRadius: 13, marginTop: 9, marginLeft: 7 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '100%', height: 25, borderRadius: 13, marginTop: 9, marginLeft: 7 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ width: '100%', height: 25, borderRadius: 13, marginTop: 9, marginLeft: 7 }} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 72, height: 29, borderRadius: 10, marginLeft: 20 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ width: 72, height: 29, borderRadius: 10, marginLeft: 20 }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <Modal
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            onBackdropPress={onCancel}
            onBackButtonPress={onCancel}>
            <View style={styles.modalDialogContainer} >
                {
                    (isLoader)
                        ? <ModalLoader />
                        :
                        <View style={styles.dialogAppointment}>
                            <Text style={styles.titleDialogApm}>Đặt lịch hẹn</Text>
                            <View style={{ padding: 15, paddingTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                                    <Image style={styles.imageItemDialog} source={srcAvatar} />
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={styles.textNamePetDialog} numberOfLines={1}>
                                            {infoPet.namePet}
                                        </Text>
                                        <Text style={styles.textNameShopDialog} numberOfLines={1}>
                                            {infoShop.nameShop}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.textPriceDialog} numberOfLines={1}>
                                            Giá thú cưng: <Text style={{ color: 'rgba(0, 24, 88, 0.65)' }}> {Number(infoPet.pricePet).toLocaleString()} đồng </Text>
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <View style={{ justifyContent: 'space-around' }}>
                                            <Text style={styles.titleInputDialog}>
                                                Số lượng đặt:
                                            </Text>
                                            <Text style={styles.titleInputDialog}>
                                                Ngày hẹn:
                                            </Text>
                                            <Text style={styles.titleInputDialog}>
                                                Địa điểm hẹn:
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TextInput style={styles.textInputDialog} keyboardType="number-pad"
                                                value={inputAmount} onChangeText={onChangeAmount} placeholder="0"/>
                                            <Pressable onPress={() => setisShowPicker(true)}>
                                                <TextInput style={[styles.textInputDialog, { color: editable ? '#001858' : '#001858' }]} editable={editable} value={Moment(inputDatePicker).format('DD/MM/YYYY HH:mm')} />
                                            </Pressable>
                                            <TextInput style={styles.textInputDialog}
                                                value={inputLocation} onChangeText={onChangeLocation} placeholder="Vị trí..."/>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                                        <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#8E8E8E' }]}
                                            activeOpacity={0.5} underlayColor="#6D6D6D"
                                            onPress={onCancel}>
                                            <Text style={styles.textButtonSave}>Hủy bỏ</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#F582AE' }]}
                                            activeOpacity={0.5} underlayColor="#DC749C"
                                            onPress={OnSave}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.textButtonSave}>Đặt hẹn</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                            <DatePickerModal isShow={isShowPicker} datePicked={inputDatePicker} callBackClose={() => setisShowPicker(false)} callBackSetDate={(date) => setinputDatePicker(date)} />
                        </View>
                }
                <ToastLayout />
            </View >
        </Modal >
    );
};

export default memo(SetAppointment);