import {
    Image, Text, View,
    TouchableHighlight,
    TextInput, TouchableOpacity,
    ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/form.style';
import Entypo from 'react-native-vector-icons/Entypo';
import { axiosJSON } from '../../api/axios.config';
import Toast from 'react-native-toast-message';
import { ToastLayout } from '../../component/layout/ToastLayout';

export default function RegisterTab(route) {
    const [passToggle, setpassToggle] = useState(true);
    const [confirmPassToggle, setconfirmPassToggle] = useState(true);
    const [inputUsername, setinputUsername] = useState("");
    const [inputPhoneNumber, setinputPhoneNumber] = useState("");
    const [inputPassword, setinputPassword] = useState("");
    const [inputConfirmPassword, setinputConfirmPassword] = useState("");

    function onChangePassToggle() {
        if (passToggle == true) {
            setpassToggle(false);
        } else {
            setpassToggle(true);
        }
    }

    function onChangeConfirmPassToggle() {
        if (confirmPassToggle == true) {
            setconfirmPassToggle(false);
        } else {
            setconfirmPassToggle(true);
        }
    }

    function onChangeTab() {
        route.callback();
    }

    function checkValidate(inputObj) {
        var regEmail = /^(\w+@[a-zA-Z]+\.[a-zA-Z]{2,})$/;
        var regPhone = /^(\+\d{10,})$/;
        var regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=<>!]).{8,}/;
        if (inputObj.userName == "") {
            ToastAndroid.show('Tên đăng nhập không được trống!', ToastAndroid.SHORT);
            return false;
        }

        if (!inputObj.phoneNumber.match(regPhone)) {
            ToastAndroid.show('Số điện thoại chưa đúng định dạng!', ToastAndroid.SHORT);
            return false;
        }

        if (!inputObj.passWord.match(regPass)) {
            ToastAndroid.show('Mật khẩu chưa đúng định dạng!', ToastAndroid.SHORT);
            ToastAndroid.show('Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một số, chữ cái viết thường, chữ viết hoa và ký tự đặc biệt!', ToastAndroid.LONG);
            return false;
        }

        if (inputObj.passWord != inputConfirmPassword) {
            ToastAndroid.show('Mật khẩu nhập lại không trùng!', ToastAndroid.SHORT);
            return false;
        }

        return true;
    }

    async function onSignUp() {
        var phoneNUM = inputPhoneNumber.replace(/\D/g, '');
        setinputPhoneNumber(phoneNUM);
        var newUser = {
            userName: inputUsername,
            phoneNumber: '+' + phoneNUM,
            passWord: inputPassword
        }

        if (checkValidate(newUser) == false) {
            // ToastAndroid.show("Đăng nhập thất bại!", ToastAndroid.SHORT);
            return;
        }

        axiosJSON.post('user/register', newUser)
            .then((response) => {
                if (response.status == 201) {
                    var data = response.data;
                    if (data.success) {
                        Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: String(data.message),
                            bottomOffset: 20
                        });
                    }
                } else {
                    var data = response.data;
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: String(data.message),
                        bottomOffset: 20
                    });
                }
            })
            .catch((e) => {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e),
                    bottomOffset: 20
                });
            });

    }

    return (
        <View style={styles.container}>
            <Image style={{ position: 'absolute' }}
                source={require('../../assets/images/form/topLeftPaw.png')} />
            <Image style={styles.pawBottomRight}
                source={require('../../assets/images/form/bottomRightPaw.png')} />
            <View style={{ marginTop: 75 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableHighlight
                        activeOpacity={0.5} underlayColor="#F3D2C1"
                        onPress={onChangeTab}>
                        <Text style={styles.textDisable}>Đăng nhập</Text>
                    </TouchableHighlight>
                    <Text style={styles.slash}>/</Text>
                    <Text style={styles.textEnable}>Đăng ký</Text>
                </View>

                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={styles.textLeftGreetingSI}>Hãy tham gia</Text>
                    <Text style={styles.textRightGreeting}> cùng chúng tôi!</Text>
                </View>
            </View>

            <View style={{ marginTop: 30 }}>
                <View>
                    <Text style={[{
                        color: 'rgba(0, 24, 88, 0.80)',
                    }, styles.titleInput]}>Tên đăng nhập</Text>
                    <TextInput style={styles.textInput} value={inputUsername}
                        onChangeText={(input) => { setinputUsername(input) }} />
                </View>
                <View>
                    <Text style={[{
                        color: 'rgba(0, 24, 88, 0.80)',
                    }, styles.titleInput]}>Số điện thoại</Text>
                    <View>
                        <TextInput style={[styles.textInput, { paddingLeft: 25 }]}
                            keyboardType='number-pad' value={inputPhoneNumber}
                            onChangeText={(input) => { setinputPhoneNumber(input) }} />
                        <Text style={styles.plusTextInput}>+</Text>
                    </View>
                </View>
                <View>
                    <Text style={[{
                        color: 'rgba(0, 24, 88, 0.80)',
                    }, styles.titleInput]}>Mật khẩu</Text>
                    <View>
                        <TextInput style={styles.textInputPass}
                            secureTextEntry={passToggle} value={inputPassword}
                            onChangeText={(input) => { setinputPassword(input) }} />
                        {
                            (passToggle)
                                ?
                                <TouchableOpacity style={styles.togglePassword}
                                    onPress={onChangePassToggle}>
                                    <Entypo name='eye' color={'#001858'} size={25} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.togglePassword}
                                    onPress={onChangePassToggle}>
                                    <Entypo name='eye-with-line' color={'#001858'} size={25} />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <View>
                    <Text style={[{
                        color: 'rgba(0, 24, 88, 0.80)',
                    }, styles.titleInput]}>Nhập lại mật khẩu</Text>
                    <View>
                        <TextInput style={styles.textInputPass}
                            secureTextEntry={confirmPassToggle} value={inputConfirmPassword}
                            onChangeText={(input) => { setinputConfirmPassword(input) }} />
                        {
                            (confirmPassToggle)
                                ?
                                <TouchableOpacity style={styles.togglePassword}
                                    onPress={onChangeConfirmPassToggle}>
                                    <Entypo name='eye' color={'#001858'} size={25} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.togglePassword}
                                    onPress={onChangeConfirmPassToggle}>
                                    <Entypo name='eye-with-line' color={'#001858'} size={25} />
                                </TouchableOpacity>
                        }
                    </View>
                </View>

                <TouchableHighlight style={[styles.buttonConfirm, { marginTop: 45 }]}
                    activeOpacity={0.5} underlayColor="#DC749C"
                    onPress={onSignUp}>
                    <Text style={styles.textButtonConfirm}>Đăng ký</Text>
                </TouchableHighlight>

            </View>
            <ToastLayout />
        </View>
    );
}
