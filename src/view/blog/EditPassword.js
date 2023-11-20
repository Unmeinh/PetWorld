import React, { useState, memo } from 'react';
import {
    View, Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/account.style';
import { onAxiosPut } from '../../api/axios.function';
import Toast from 'react-native-toast-message';
import { goBack } from '../../navigation/rootNavigation';
import Entypo from 'react-native-vector-icons/Entypo';

const EditPassword = ({ route }) => {
    var navigation = useNavigation();
    const infoLogin = route.params.shop;
    const [inputOldPassword, setinputOldPassword] = useState("");
    const [inputNewPassword, setinputNewPassword] = useState("");
    const [inputRepeatPassword, setinputRepeatPassword] = useState("");
    const [oldPassToggle, setoldPassToggle] = useState(true);
    const [newPassToggle, setnewPassToggle] = useState(true);
    const [repeatPassToggle, setrepeatPassToggle] = useState(true);

    function onChangeOldPassToggle() {
        setoldPassToggle(!oldPassToggle);
    }

    function onChangeNewPassToggle() {
        setnewPassToggle(!newPassToggle);
    }

    function onChangeRepeatPassToggle() {
        setrepeatPassToggle(!repeatPassToggle);
    }

    function checkValidate() {
        let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;

        if (inputOldPassword.trim() == "") {
            Toast.show({
                type: 'error',
                text1: 'Mật khẩu cũ không được để trống!',
                position: 'top'
            })
            return false;
        }

        if (!inputNewPassword.match(regPass)) {
            Toast.show({
                type: 'error',
                text1: 'Mật khẩu mới cần dài ít nhất 8 ký tự và chứa ít nhất một số, một chữ viết thường và một chữ viết hoa!',
                position: 'top',
                props: {
                    isTextLong: true
                }
            })
            return false;
        }

        if (inputNewPassword != inputRepeatPassword) {
            Toast.show({
                type: 'error',
                text1: 'Mật khẩu nhập lại không chính xác!',
                position: 'top'
            })
            return false;
        }

        return true;
    }

    function onShowAlert() {
        if (checkValidate() == false) {
            return;
        }
        Toast.show({
            type: 'alert',
            position: 'top',
            text1: 'Xác nhận thay đổi mật khẩu?',
            autoHide: false,
            props: {
                confirm: async () => onUpdatePassword(),
                cancel: () => {
                    Toast.hide();
                }
            }
        })
    }

    async function onUpdatePassword() {
        Toast.show({
            type: 'loading',
            text1: "Đang cập nhật mật khẩu...",
            autoHide: false,
            position: 'top',
        });
        let data = {
            oldPassword: inputOldPassword,
            newPassword: inputNewPassword
        }
        let res = await onAxiosPut('user/updatePassword', data, 'json', true);
        if (res && res.success) {
            goBack();
        }
    }

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
        <View style={styles.container}>
            <HeaderTitle nav={navigation} titleHeader={"Thay đổi mật khẩu"}
                colorHeader={"#FEF6E4"} />
            <View style={{ flex: 1, paddingTop: 15 }}>
                {
                    (infoLogin != undefined)
                        ? <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                            <View style={styles.itemEditInfo}>
                                <Text style={styles.titleItemEditInfo}>
                                    Mật khẩu hiện tại:
                                </Text>
                                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                    <Text style={[styles.textItemEditInfo, { fontSize: 18 }]}>{'>'}</Text>
                                    <TextInput style={[styles.inputEditInfo, { paddingRight: 40 }]} placeholder='Nhập dữ liệu...'
                                        placeholderTextColor={'#A0A0A0'} secureTextEntry={oldPassToggle}
                                        value={inputOldPassword} onChangeText={setinputOldPassword} />
                                    {
                                        (oldPassToggle)
                                            ?
                                            <TouchableOpacity style={[styles.togglePassword, { marginRight: 5 }]}
                                                onPress={onChangeOldPassToggle}>
                                                <Entypo name='eye' color={'#001858'} size={20} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={[styles.togglePassword, { marginRight: 5 }]}
                                                onPress={onChangeOldPassToggle}>
                                                <Entypo name='eye-with-line' color={'#001858'} size={20} />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={styles.itemEditInfo}>
                                <Text style={styles.titleItemEditInfo}>
                                    Mật khẩu mới:
                                </Text>
                                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                    <Text style={[styles.textItemEditInfo, { fontSize: 18 }]}>{'>'}</Text>
                                    <TextInput style={[styles.inputEditInfo, { paddingRight: 40 }]} placeholder='Nhập dữ liệu...'
                                        placeholderTextColor={'#A0A0A0'} secureTextEntry={newPassToggle}
                                        value={inputNewPassword} onChangeText={setinputNewPassword} />
                                    {
                                        (newPassToggle)
                                            ?
                                            <TouchableOpacity style={[styles.togglePassword, { marginRight: 5 }]}
                                                onPress={onChangeNewPassToggle}>
                                                <Entypo name='eye' color={'#001858'} size={20} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={[styles.togglePassword, { marginRight: 5 }]}
                                                onPress={onChangeNewPassToggle}>
                                                <Entypo name='eye-with-line' color={'#001858'} size={20} />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={styles.itemEditInfo}>
                                <Text style={styles.titleItemEditInfo}>
                                    Nhập lại mật khẩu mới:
                                </Text>
                                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                    <Text style={[styles.textItemEditInfo, { fontSize: 18 }]}>{'>'}</Text>
                                    <TextInput style={[styles.inputEditInfo, { paddingRight: 40 }]} placeholder='Nhập dữ liệu...'
                                        placeholderTextColor={'#A0A0A0'} secureTextEntry={repeatPassToggle}
                                        value={inputRepeatPassword} onChangeText={setinputRepeatPassword} />
                                    {
                                        (repeatPassToggle)
                                            ?
                                            <TouchableOpacity style={[styles.togglePassword, { marginRight: 5 }]}
                                                onPress={onChangeRepeatPassToggle}>
                                                <Entypo name='eye' color={'#001858'} size={20} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={[styles.togglePassword, { marginRight: 5 }]}
                                                onPress={onChangeRepeatPassToggle}>
                                                <Entypo name='eye-with-line' color={'#001858'} size={20} />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                                <TouchableHighlight style={[styles.buttonFormSmall, { backgroundColor: '#8E8E8E' }]}
                                    activeOpacity={0.5} underlayColor="#6D6D6D"
                                    onPress={goBack}>
                                    <Text style={[styles.textButtonFormSmall, { fontSize: 13 }]}>Quay lại</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.buttonFormSmall, { backgroundColor: '#F582AE' }]}
                                    activeOpacity={0.5} underlayColor="#DC749C"
                                    onPress={onShowAlert}>
                                    <Text style={[styles.textButtonFormSmall, { fontSize: 13 }]}>Xác nhận</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        : ""
                }
            </View>
        </View>
    );
}


export default memo(EditPassword);