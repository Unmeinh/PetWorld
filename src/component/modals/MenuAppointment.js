import {
    Text, Pressable,
    View, TouchableOpacity,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { fetchDetailProduct } from '../../redux/reducers/filters/filtersReducer';
import Modal from 'react-native-modal';
import styles from "../../styles/appointment.style";
import { onAxiosPut } from "../../api/axios.function";
import Toast from "react-native-toast-message";

const MenuAppointment = (route) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [canCancel, setcanCancel] = useState(false);

    React.useEffect(() => {
        if (route.status) {
            switch (String(route.status)) {
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
    }

    function onOpenPet() {
        let type = 0;
        let pet = { ...route.pet };
        pet.idShop = route.shop;
        dispatch(fetchDetailProduct({ id: route.pet._id, type }));
        navigation.push('DetailProduct', { id: route.pet._id, type });
    }

    function onMessagingShop() {
        navigation.push('ShopScreen', { data: route.shop });
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
                    status: 3
                }, 'json', true)
            if (res) {
                setcanCancel(false);
                route.onCallbackCancel();
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
                        <TouchableOpacity style={{ width: '100%', alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 1 }}
                            onPress={onMessagingShop}>
                            <Text style={styles.textOptionMenu}>Xem cửa hàng</Text>
                        </TouchableOpacity>
                        {
                            (canCancel)
                                ?
                                <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}
                                    onPress={onShowAlert}>
                                    <Text style={[styles.textOptionMenu, { color: '#EE3333' }]}>Hủy lịch hẹn</Text>
                                </TouchableOpacity>
                                : ""
                        }
                    </Pressable>
                </View>
            </View>
        </Modal >
    );
};

export default memo(MenuAppointment);