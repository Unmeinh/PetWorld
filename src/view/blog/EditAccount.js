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
import { onAxiosDelete, onAxiosPut, onAxiosPost, onDismissKeyboard } from '../../api/axios.function';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { onSendOTPbyPhoneNumber } from '../../function/functionOTP';
import Toast from 'react-native-toast-message';
import PhoneSelect from '../../component/modals/PhoneSelect';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const infoKeys = ["phoneNumber", "emailAddress"];
const infoTypes = ["số điện thoại", "email"];
const infoNames = ["Số điện thoại", "Email"];

const EditAccount = ({ route }) => {
    var navigation = useNavigation();
    const infoLogin = route.params.user;
    const [inputValue, setinputValue] = useState("")
    const [oldValueDisplay, setoldValueDisplay] = useState("");
    const [isLoader, setisLoader] = useState(true);
    const [isChangeAccount, setisChangeAccount] = useState(false);
    const [inputPhoneCountry, setinputPhoneCountry] = useState('+84');
    const [isShowPhoneSelect, setisShowPhoneSelect] = useState(false);
    const [widthPhoneSelect, setwidthPhoneSelect] = useState(0);

    const onLayoutPhoneSelect = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setwidthPhoneSelect(width);
    }

    function onInputPhoneCountry(input) {
        setinputPhoneCountry(input);
        setisShowPhoneSelect(false);
    }

    function onChangeInputValue(input) {
        setinputValue(input);
    }

    function onChangeAccount() {
        setisChangeAccount(!isChangeAccount);
    }
    
    //Function api
    function onShowAlertVerify() {
        Toast.show({
            type: 'alert',
            position: 'top',
            text1: 'Xác nhận gửi lại link xác minh email?',
            autoHide: false,
            props: {
                confirm: async () => onSendVerifyEmail(),
                cancel: () => {
                    Toast.hide();
                }
            }
        })
    }

    async function onSendVerifyEmail() {
        Toast.show({
            type: 'loading',
            text1: 'Đang gửi link xác minh email...',
            position: 'top',
            autoHide: false
        })
        let res = await onAxiosPost('user/sendVerifyEmail', { email: oldValueDisplay }, 'json', true);
        if (res && res?.success) {
            navigation.goBack();
        }
    }

    function onShowAlertRemove() {
        Toast.show({
            type: 'alert',
            position: 'top',
            text1: 'Xác nhận hủy liên kết email?',
            autoHide: false,
            props: {
                confirm: async () => onRemoveEmail(),
                cancel: () => {
                    Toast.hide();
                }
            }
        })
    }

    async function onRemoveEmail() {
        onDismissKeyboard();
        Toast.show({
            type: 'loading',
            text1: 'Đang hủy liên kết email...',
            position: 'top',
            autoHide: false
        })
        let res = await onAxiosDelete('user/deleteEmail', true);
        if (res && res?.success) {
            navigation.goBack();
        }
    }

    async function updatePhoneNumber() {
        let res = await onAxiosPut('user/updateAccount', { typeInfo: infoKeys[route.params.infoType], valueUpdate: inputPhoneCountry + inputValue }, 'json', true);
        if (res && res?.success) {
            navigation.navigate('InfoManager');
        }
    }

    function onShowAlertUpdate() {
        if (inputValue.trim() == "") {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: infoNames[route.params.infoType] + ' không được để trống!',
            })
            return;
        } 
        if (route.params.infoType == 0) {
            var regPhone = /^\+([0-9]{9,})$/;
            if (!(inputPhoneCountry + inputValue).match(regPhone)) {
                Toast.show({
                    type: 'error',
                    text1: 'Số điện thoại cần đúng định dạng!\nVí dụ: +123456789',
                    position: 'top',
                })
                return;
            }
        } else {
            var regEmail = /^(?=[A-Za-z]).*@[a-zA-Z]+.[a-zA-Z]{2,}$/;
            if (!inputValue.match(regEmail)) {
                Toast.show({
                    type: 'error',
                    text1: 'Email cần đúng định dạng!\nVí dụ: abc@def.xyz',
                    position: 'top',
                })
                return;
            }
        }
        Toast.show({
            type: 'alert',
            position: 'top',
            text1: 'Xác nhận thay đổi ' + infoTypes[route.params.infoType] + '?',
            autoHide: false,
            props: {
                confirm: async () => onUpdateAccount(),
                cancel: () => {
                    Toast.hide();
                }
            }
        })
    }

    async function onUpdateAccount() {
        onDismissKeyboard();
        Toast.show({
            type: 'loading',
            text1: 'Đang cập nhật ' + infoTypes[route.params.infoType] + "...",
            position: 'top',
            autoHide: false
        })
        if (route.params.infoType == 0) {
            //check firebase
            const response = await onSendOTPbyPhoneNumber(inputPhoneCountry + inputValue);
            if (response && response.success) {
                setTimeout(() => {
                    navigation.navigate('ConfirmOTP', { function: updatePhoneNumber, typeVerify: 'phoneNumber', valueVerify: inputPhoneCountry + inputValue, authConfirm: response.confirm })
                }, 500)
            }
        } else {
            let res = await onAxiosPut('user/updateAccount', { typeInfo: infoKeys[route.params.infoType], valueUpdate: inputValue }, 'json', true);
            if (res && res?.success) {
                navigation.goBack();
            }
        }
    }

    React.useEffect(() => {
        if (infoLogin) {
            switch (route.params.infoType) {
                case 0:
                    setoldValueDisplay("+" + infoLogin.idAccount.phoneNumber);
                    break;
                case 1:
                    setoldValueDisplay(infoLogin.idAccount.emailAddress);
                    if (infoLogin.idAccount.emailAddress == "Chưa thiết lập") {
                        setisChangeAccount(true);
                    }
                    break;

                default:
                    break;
            }
            setisLoader(false);
        }
    }, [infoLogin]);

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
                    : <Pressable style={{ flex: 1, paddingTop: 15 }}
                        onPress={() => {
                            setisShowPhoneSelect(false);
                        }}>
                        {
                            (infoLogin != undefined)
                                ? <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                                    <View style={styles.itemEditInfo}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.titleItemEdit}>
                                                {infoNames[route.params.infoType]} hiện tại:
                                            </Text>
                                            {
                                                (route?.params?.infoType == 0)
                                                    ? <View>
                                                        <View style={styles.titleItemVerify}>
                                                            <Ionicons name='checkmark-circle' color={'#55B938'} size={13} />
                                                            <Text style={[styles.textItemEdit, { marginLeft: 2, marginTop: 0, fontSize: 13, color: '#55B938' }]}>
                                                                Đã xác minh
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    : <>
                                                        {
                                                            (infoLogin?.idAccount?.emailAddress && infoLogin?.idAccount?.emailAddress.trim() != "")
                                                                ? <View>
                                                                    {
                                                                        (infoLogin.idAccount.isVerifyEmail == 0)
                                                                            ? <View style={styles.titleItemVerify}>
                                                                                <Ionicons name='checkmark-circle' color={'#55B938'} size={13} />
                                                                                <Text style={[styles.textItemEdit, { marginLeft: 2, marginTop: 0, fontSize: 13, color: '#55B938' }]}>
                                                                                    Đã xác minh
                                                                                </Text>
                                                                            </View>
                                                                            : <View style={styles.titleItemVerify}>
                                                                                <Ionicons name='close-circle' color={'#D65745'} size={13} />
                                                                                <Text style={[styles.textItemEdit, { marginLeft: 2, marginTop: 0, fontSize: 13, color: '#D65745' }]}>
                                                                                    Chưa xác minh
                                                                                </Text>
                                                                            </View>
                                                                    }
                                                                </View>
                                                                : <></>
                                                        }
                                                    </>
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'> '}</Text>
                                            <Text style={[styles.textItemEdit, { marginLeft: 8 }]}>
                                                {(oldValueDisplay && oldValueDisplay.trim() != "") ? oldValueDisplay : "Chưa thiết lập"}
                                            </Text>
                                        </View>
                                    </View>

                                    {
                                        (isChangeAccount)
                                            ?
                                            <>
                                                <View style={styles.itemEditInfo}>
                                                    <Text style={styles.titleItemEdit}>
                                                        {infoNames[route.params.infoType]} mới:
                                                    </Text>
                                                    {
                                                        (route.params.infoType == 0)
                                                            ? <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', top: -8, }}>
                                                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                                                <View>
                                                                    <View style={styles.inputPhoneEdit}
                                                                        onLayout={onLayoutPhoneSelect}>
                                                                        <Pressable onPress={() => {
                                                                            setisShowPhoneSelect(true);
                                                                        }}>
                                                                            <TextInput style={styles.inputPhoneCountry}
                                                                                value={inputPhoneCountry}
                                                                                editable={false} />
                                                                        </Pressable>
                                                                        <TextInput style={styles.inputPhoneValue} placeholder='Nhập dữ liệu...'
                                                                            keyboardType='number-pad' value={inputValue}
                                                                            placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                                                                            onChangeText={onChangeInputValue}
                                                                        />
                                                                        <FontAwesome name='sort-down' style={styles.dropdownSelect}
                                                                            color={'#00185880'} size={13} />
                                                                    </View>
                                                                    <PhoneSelect isShow={isShowPhoneSelect} callBack={onInputPhoneCountry}
                                                                        width={widthPhoneSelect} />
                                                                </View>
                                                            </View>
                                                            : <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                                                <TextInput style={styles.inputEdit} placeholder='Nhập dữ liệu...'
                                                                    value={inputValue} onChangeText={onChangeInputValue}
                                                                    placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                                                                    inputMode={(route.params.infoType == 0) ? 'numeric' : 'email'}
                                                                    onLayout={onLayoutPhoneSelect} />
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
                                                        onPress={onShowAlertUpdate}>
                                                        <Text style={[styles.textButtonFLModal, { fontSize: 13 }]}>Xác nhận</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            </>
                                            :
                                            <>
                                                {
                                                    (route.params.infoType == 0)
                                                        ? <TouchableHighlight style={[styles.buttonEditAccount, { borderColor: '#F582AE' }]}
                                                            activeOpacity={0.5} underlayColor="#DC749C"
                                                            onPress={onChangeAccount}>
                                                            <Text style={[styles.textButtonFLModal, { fontSize: 16, color: '#001858', fontWeight: 'normal' }]}>
                                                                Thay đổi số điện thoại mới
                                                            </Text>
                                                        </TouchableHighlight>
                                                        :
                                                        <>
                                                            {
                                                                (infoLogin?.idAccount?.emailAddress && String(infoLogin?.idAccount?.emailAddress).trim() != ""
                                                                    && infoLogin?.idAccount?.isVerifyEmail == 1 && route?.params?.infoType == 1)
                                                                    ? <TouchableHighlight style={[styles.buttonEditAccount, { borderColor: '#55B938', marginTop: 20 }]}
                                                                        activeOpacity={0.5} underlayColor="#67CA4A"
                                                                        onPress={onShowAlertVerify}>
                                                                        <Text style={[styles.textButtonFLModal, { fontSize: 16, color: '#001858', fontWeight: 'normal' }]}>
                                                                            Gửi lại link xác minh email
                                                                        </Text>
                                                                    </TouchableHighlight>
                                                                    : ""
                                                            }
                                                            <TouchableHighlight style={[styles.buttonEditAccount, { borderColor: '#F582AE' }]}
                                                                activeOpacity={0.5} underlayColor="#DC749C"
                                                                onPress={onChangeAccount}>
                                                                <Text style={[styles.textButtonFLModal, { fontSize: 16, color: '#001858', fontWeight: 'normal' }]}>
                                                                    {(infoLogin?.idAccount?.emailAddress && String(infoLogin?.idAccount?.emailAddress).trim() != "") ? "Thay đổi" : "Thiết lập"} địa chỉ email mới
                                                                </Text>
                                                            </TouchableHighlight>
                                                            {
                                                                (infoLogin?.idAccount?.emailAddress && String(infoLogin?.idAccount?.emailAddress).trim() != "")
                                                                    ? <TouchableHighlight style={[styles.buttonEditAccount, { borderColor: '#F85555' }]}
                                                                        activeOpacity={0.5} underlayColor="#EE3F3F"
                                                                        onPress={onShowAlertRemove}>
                                                                        <Text style={[styles.textButtonFLModal, { fontSize: 16, color: '#001858', fontWeight: 'normal' }]}>
                                                                            Hủy liên kết email hiện tại
                                                                        </Text>
                                                                    </TouchableHighlight>
                                                                    : ""
                                                            }
                                                        </>
                                                }
                                            </>
                                    }
                                </View>
                                : ""
                        }
                    </Pressable>
            }
        </View>
    );
}


export default memo(EditAccount);