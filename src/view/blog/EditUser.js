import React, { useState, memo } from 'react';
import {
    Pressable,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/user.style';
import { onAxiosPut, onDismissKeyboard } from '../../api/axios.function';
import RNMaterialDatetimePicker from "react-native-material-datetime-picker";
import { AndroidPickerMode } from 'react-native-material-datetime-picker';
import Moment from 'moment';
import Toast from 'react-native-toast-message';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const infoKeys = ["fullName", "nickName", "birthday", "locationUser", "description"];
const infoTypes = ["họ và tên", "biệt danh", "sinh nhật", "địa chỉ", "giới thiệu"];
const infoNames = ["Tên", "Biệt danh", "Sinh nhật", "Địa chỉ", "Giới thiệu"];

const EditInfo = ({ route }) => {
    var navigation = useNavigation();
    const infoLogin = route.params.user;
    const [inputValue, setinputValue] = useState("")
    const [oldValueDisplay, setoldValueDisplay] = useState("");
    const [isLoader, setisLoader] = useState(true);
    const [inputDatePicker, setinputDatePicker] = useState(new Date(String((new Date().getFullYear() - 16) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())));
    const [isShowDatePicker, setisShowDatePicker] = useState(false);

    function onChangeInputValue(input) {
        setinputValue(input);
    }

    function onShowPicker() {
        setisShowDatePicker(!isShowDatePicker);
    }

    function onChangeInputDate(date) {
        setinputDatePicker(date);
        setinputValue(Moment(date).format('DD/MM/YYYY'));
        setisShowDatePicker(false);
    }

    function onShowAlert() {
        if (inputValue.trim() == "") {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: infoNames[route.params.infoType] + ' không được để trống!',
            })
            return;
        }
        Toast.show({
            type: 'alert',
            position: 'top',
            text1: 'Xác nhận thay đổi ' + infoTypes[route.params.infoType] + '?',
            autoHide: false,
            props: {
                confirm: async () => onSave(),
                cancel: () => {
                    Toast.hide();
                }
            }
        })
    }

    async function onSave() {
        onDismissKeyboard();
        let res = null;
        Toast.show({
            type: 'loading',
            text1: "Đang cập nhật " + infoTypes[route.params.infoType] + "...",
            autoHide: false,
            position: 'top'
        });
        if (route.params.infoType == 2) {
            res = await onAxiosPut('user/updateUser', { typeInfo: infoKeys[route.params.infoType], valueUpdate: inputDatePicker }, 'json', true);
        } else {
            res = await onAxiosPut('user/updateUser', { typeInfo: infoKeys[route.params.infoType], valueUpdate: inputValue }, 'json', true);
        }
        if (res && res?.success) {
            navigation.goBack();
        }
    }

    React.useEffect(() => {
        if (infoLogin) {
            switch (route.params.infoType) {
                case 0:
                    setoldValueDisplay(infoLogin.fullName);
                    break;
                case 1:
                    setoldValueDisplay(infoLogin.nickName);
                    break;
                case 2:
                    setoldValueDisplay(Moment(infoLogin.birthday).format('DD/MM/YYYY'));
                    break;
                case 3:
                    setoldValueDisplay(infoLogin.locationUser);
                    break;
                case 4:
                    setoldValueDisplay(infoLogin.description);
                    break;

                default:
                    break;
            }
            setisLoader(false);
        }
    }, [infoLogin]);

    React.useEffect(() => {
        if (isShowDatePicker) {
            if (inputDatePicker == new Date()) {
                setinputDatePicker(new Date());
            } else {
                setinputDatePicker(inputDatePicker);
            }
        }
    }, [isShowDatePicker])

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
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
            <HeaderTitle nav={navigation} titleHeader={"Chỉnh sửa " + infoTypes[route.params.infoType]}
                colorHeader={"#FEF6E4"} />
            {
                (isLoader)
                    ?
                    <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
                        <View style={styles.itemEditInfo}>
                            <ShimmerPlaceHolder
                                shimmerStyle={[styles.titleItemEdit, { height: 22, width: '35%', borderRadius: 5 }]} />
                            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'> '}</Text>
                                <ShimmerPlaceHolder
                                    shimmerStyle={[styles.textItemEdit, { height: 17, width: '30%', borderRadius: 5, marginLeft: 8 }]} />
                            </View>
                        </View>
                        <View style={styles.itemEditInfo}>
                            <ShimmerPlaceHolder
                                shimmerStyle={[styles.titleItemEdit, { height: 22, width: '35%', borderRadius: 5 }]} />
                            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ height: 20, width: '93%', borderRadius: 15, marginTop: 3, marginLeft: 10 }} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                            <ShimmerPlaceHolder
                                shimmerStyle={{ height: 27, width: 80, borderRadius: 10, marginLeft: 10 }} />
                            <ShimmerPlaceHolder
                                shimmerStyle={{ height: 27, width: 80, borderRadius: 10, marginLeft: 10 }} />
                        </View>
                    </View>
                    : <View style={{ flex: 1, paddingTop: 15 }}>
                        {
                            (infoLogin != undefined)
                                ? <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                                    <View style={styles.itemEditInfo}>
                                        <Text style={styles.titleItemEdit}>
                                            {infoNames[route.params.infoType]} hiện tại:
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'> '}</Text>
                                            <Text style={[styles.textItemEdit, { marginLeft: 8 }]}>
                                                {oldValueDisplay}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemEditInfo}>
                                        <Text style={styles.titleItemEdit}>
                                            {infoNames[route.params.infoType]} mới:
                                        </Text>
                                        {
                                            (route.params.infoType == 2)
                                                ?
                                                <Pressable style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}
                                                    onPress={onShowPicker}>
                                                    <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                                    <TextInput style={styles.inputEdit} placeholder='Nhập dữ liệu...'
                                                        placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                                                        value={inputValue} editable={false} />
                                                </Pressable>
                                                :
                                                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                                    <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                                    <TextInput style={styles.inputEdit} placeholder='Nhập dữ liệu...'
                                                        placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                                                        value={inputValue} onChangeText={onChangeInputValue} />
                                                </View>
                                        }
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                                        <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#8E8E8E' }]}
                                            activeOpacity={0.5} underlayColor="#6D6D6D"
                                            onPress={() => navigation.goBack()}>
                                            <Text style={[styles.textButtonFLModal, { fontSize: 13 }]}>Quay lại</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#F582AE' }]}
                                            activeOpacity={0.5} underlayColor="#DC749C"
                                            onPress={onShowAlert}>
                                            <Text style={[styles.textButtonFLModal, { fontSize: 13 }]}>Xác nhận</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                : ""
                        }
                    </View>
            }
            {isShowDatePicker &&
                <RNMaterialDatetimePicker
                    mode={AndroidPickerMode.DATE}
                    value={inputDatePicker}
                    maximumDate={new Date(String((new Date().getFullYear() - 16) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()))}
                    minimumDate={new Date("1900-01-01")}
                    onConfirm={onChangeInputDate}
                />
            }
        </View>
    );
}


export default memo(EditInfo);