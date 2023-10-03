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
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { onAxiosDelete, onAxiosPut, onAxiosPost } from '../../api/axios.function';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { onSendOTPbyPhoneNumber } from '../../function/functionOTP';
import Toast from 'react-native-toast-message';
import PhoneSelect from '../../component/modals/PhoneSelect';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
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
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    const onLayoutPhoneSelect = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setwidthPhoneSelect(width);
    }

    function onInputPhoneCountry(input) {
        setinputPhoneCountry(input);
        setisShowPhoneSelect(false);
        // console.log(input);
    }

    function onChangeInputValue(input) {
        setinputValue(input);
    }

    async function onSendVerifyEmail() {
        let res = await onAxiosPost('user/sendVerifyEmail', { email: oldValueDisplay }, 'json');
        if (res && res.success) {
            navigation.goBack();
        }
    }

    function onChangeAccount() {
        setisChangeAccount(!isChangeAccount);
    }

    async function onRemoveEmail() {
        let res = await onAxiosDelete('user/deleteEmail');
        if (res && res.success) {
            navigation.goBack();
        }
    }

    async function updatePhoneNumber() {
        let res = await onAxiosPut('user/updateAccount', { typeInfo: infoKeys[route.params.infoType], valueUpdate: inputPhoneCountry + inputValue }, 'json');
        if (res && res.success) {
            navigation.navigate('InfoManager');
        }
    }

    async function onUpdateAccount() {
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

            const response = await onSendOTPbyPhoneNumber(inputPhoneCountry + inputValue);
            if (response != undefined && response.success) {
                setTimeout(() => {
                    navigation.navigate('ConfirmOTP', { function: updatePhoneNumber, typeVerify: 'phoneNumber', valueVerify: inputPhoneCountry + inputValue, authConfirm: response.confirm })
                }, 500)
            } else {
                // setisDisableRequest(false);
            }
        } else {
            var regEmail = /^(\w+@[a-zA-Z]+\.[a-zA-Z]{2,})$/;
            if (!inputValue.match(regEmail)) {
                Toast.show({
                    type: 'error',
                    text1: 'Email cần đúng định dạng!\nVí dụ: abc@def.xyz',
                    position: 'top',
                })
                return;
            }
            let res = await onAxiosPut('user/updateAccount', { typeInfo: infoKeys[route.params.infoType], valueUpdate: inputValue }, 'json');
            if (res != undefined && res && res.success) {
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
                                shimmerColors={colorLoader}
                                shimmerStyle={[styles.titleItemEdit, { height: 22, width: '35%', borderRadius: 5 }]} />
                            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'> '}</Text>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={[styles.textItemEdit, { height: 17, width: '30%', borderRadius: 5, marginLeft: 8 }]} />
                            </View>
                        </View>
                        <View style={styles.itemEditInfo}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={[styles.titleItemEdit, { height: 22, width: '35%', borderRadius: 5 }]} />
                            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ height: 20, width: '93%', borderRadius: 15, marginTop: 3, marginLeft: 10 }} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ height: 27, width: 80, borderRadius: 10, marginLeft: 10 }} />
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
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
                                                (infoLogin.idAccount.emailAddress == "Chưa thiết lập")
                                                    ? ""
                                                    : <View>
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
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'> '}</Text>
                                            <Text style={[styles.textItemEdit, { marginLeft: 8 }]}>
                                                {oldValueDisplay}
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
                                                        onPress={onUpdateAccount}>
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
                                                                (infoLogin.idAccount.isVerifyEmail == 1 && route.params.infoType == 1)
                                                                    ? <TouchableHighlight style={[styles.buttonEditAccount, { borderColor: '#55B938', marginTop: 20 }]}
                                                                        activeOpacity={0.5} underlayColor="#67CA4A"
                                                                        onPress={onSendVerifyEmail}>
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
                                                                    Thay đổi địa chỉ email mới
                                                                </Text>
                                                            </TouchableHighlight>
                                                            <TouchableHighlight style={[styles.buttonEditAccount, { borderColor: '#F85555' }]}
                                                                activeOpacity={0.5} underlayColor="#EE3F3F"
                                                                onPress={onRemoveEmail}>
                                                                <Text style={[styles.textButtonFLModal, { fontSize: 16, color: '#001858', fontWeight: 'normal' }]}>
                                                                    Hủy liên kết email hiện tại
                                                                </Text>
                                                            </TouchableHighlight>
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