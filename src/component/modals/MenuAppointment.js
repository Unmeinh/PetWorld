import {
    Text, Pressable,
    View, TouchableOpacity,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import {useDispatch} from 'react-redux';
import {fetchDetailProduct} from '../../redux/reducers/filters/filtersReducer';
import Modal from 'react-native-modal';
import styles from "../../styles/appointment.style";
import { onAxiosDelete, onAxiosPut } from "../../api/axios.function";
import Toast from "react-native-toast-message";

const MenuAppointment = (route) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [canCancel, setcanCancel] = useState(false);

    React.useEffect(() => {
        if (route.status) {
            switch (route.status) {
                case "-1":
                    setcanCancel(true)
                    break;
                case "0":
                    setcanCancel(true)
                    break;
                case "1":
                    setcanCancel(false)
                    break;
                case "2":
                    setcanCancel(false)
                    break;
                case "3":
                    setcanCancel(false)
                    break;
                default:
                    break;
            }
        }
    }, [route.status]);

    function onShowAlert() {
        route.callBackHide();
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

    function onOpenPet() {
        let type = 0;
        dispatch(fetchDetailProduct({ id: route.idPet, type }));
        navigation.push('DetailProduct', { type });
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
                    idAppt: route.idAppt,
                    status: "3"
                }, 'json', true)
            if (res) {
                setcanCancel(false);
                route.onCallbackCancel();
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
            let res = await onAxiosDelete('appointment/delete/' + route.idAppt, true);
            if (res) {
                route.onCallbackDelete();
            }
        }
    }

    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            swipeDirection="down"
            propagateSwipe={true}
            backdropColor="rgba(0, 0, 0, 0.5)"
            onSwipeComplete={route.callBackHide}
            onBackdropPress={route.callBackHide}
            onBackButtonPress={route.callBackHide}>
            <View style={styles.modalMenuContainer} >
                <View style={styles.menuAppointment}>
                    {/* View control */}
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={styles.swipeControlModal} />
                    </View>
                    <Pressable>
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 1 }}
                            onPress={onOpenPet}>
                            <Text style={styles.textOptionMenu}>Xem thú cưng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 1 }}>
                            <Text style={styles.textOptionMenu}>Nhắn tin cho shop</Text>
                        </TouchableOpacity>
                        {
                            (canCancel)
                                ?
                                <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}
                                    onPress={onShowAlert}>
                                    <Text style={[styles.textOptionMenu, { color: '#EE3333' }]}>Hủy lịch hẹn</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}
                                    onPress={onShowAlert}>
                                    <Text style={[styles.textOptionMenu, { color: '#EE3333' }]}>Xóa lịch hẹn</Text>
                                </TouchableOpacity>
                        }
                    </Pressable>
                </View>
            </View>
        </Modal >
    );
};

export default memo(MenuAppointment);