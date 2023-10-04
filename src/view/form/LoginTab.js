import {
    Image, Text, View,
    TouchableHighlight,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/form.style';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { storageMMKV } from '../../storage/storageMMKV';
import Toast from 'react-native-toast-message';
import { onAxiosPost } from '../../api/axios.function';

export default function LoginTab(route) {
    const navigation = useNavigation();
    const [passToggle, setpassToggle] = useState(true);
    const [rememberMe, setrememberMe] = useState(false);
    const [inputUsername, setinputUsername] = useState(route.user);
    const [inputPassword, setinputPassword] = useState("");
    const [isDisableRequest, setisDisableRequest] = useState(false);

    function onChangePassToggle() {
        if (passToggle == true) {
            setpassToggle(false);
        } else {
            setpassToggle(true);
        }
    }

    function onChangeRememberMe() {
        if (rememberMe == true) {
            setrememberMe(false);
        } else {
            setrememberMe(true);
        }
    }

    function onChangeTab() {
        route.callback(inputUsername);
    }

    function checkValidate() {
        if (inputUsername == "") {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Tên đăng nhập không được trống!',
                bottomOffset: 20,
            });
            return false;
        }

        if (inputPassword == "") {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Mật khẩu không được trống!',
                bottomOffset: 20,
            });
            return false;
        }
        return true;
    }

    async function onSignIn() {
        var newUser = {
            userName: inputUsername,
            passWord: inputPassword
        }

        if (checkValidate() == false) {
            return;
        }

        setisDisableRequest(true);

        Toast.show({
            type: 'loading',
            position: 'top',
            text1: 'Đang đăng nhập...',
            bottomOffset: 20,
            autoHide: false
        });

        const response = await onAxiosPost('user/login', newUser, "Json");
        if (response) {
            storageMMKV.setValue('login.token', String(response.token));
            if (rememberMe) {
                storageMMKV.setValue('login.isLogin', true);
            } else {
                storageMMKV.setValue('login.isLogin', false);
            }
            if (storageMMKV.getString('login.token') == String(response.token)) {
                Toast.hide();
                navigation.navigate('NaviTabScreen');
            }
        } else {
            setisDisableRequest(false);
        }
    }

    return (
        <View style={styles.container}>
            <Image style={{ position: 'absolute', right: 0 }}
                source={require('../../assets/images/form/topRightPaw.png')} />
            <Image style={styles.pawBottomLeft}
                source={require('../../assets/images/form/bottomLeftPaw.png')} />
            <View style={{ marginTop: 75 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.textEnable}>Đăng nhập</Text>
                    <Text style={styles.slash}>/</Text>
                    <TouchableHighlight
                        activeOpacity={0.5} underlayColor="#F3D2C1"
                        onPress={onChangeTab}>
                        <Text style={styles.textDisable}>Đăng ký</Text>
                    </TouchableHighlight>
                </View>

                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={styles.textLeftGreetingLI}>Chào mừng</Text>
                    <Text style={styles.textRightGreeting}> bạn trở lại!</Text>
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
                                        <Entypo name='eye' color={'#001858'} size={22} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.togglePassword}
                                        onPress={onChangePassToggle}>
                                        <Entypo name='eye-with-line' color={'#001858'} size={22} />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                (rememberMe)
                                    ?
                                    <TouchableOpacity style={styles.checkboxRM}
                                        onPress={onChangeRememberMe}>
                                        <Feather name='check-square' color={'#001858'} size={20} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.checkboxRM}
                                        onPress={onChangeRememberMe}>
                                        <Feather name='square' color={'#001858'} size={20} />
                                    </TouchableOpacity>
                            }
                            <Text style={[{
                                color: '#001858',
                            }, styles.titleInput]}>Ghi nhớ tôi?</Text>
                        </View>
                        <TouchableHighlight onPress={() => { navigation.navigate('ForgetPassword') }}
                            activeOpacity={0.5} underlayColor="#00185830" style={{ marginTop: 15 }}>
                            <Text style={{
                                color: '#001858', textDecorationLine: 'underline',
                                fontSize: 15, fontFamily: 'ProductSans',
                            }}>Quên mật khẩu?</Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight style={styles.buttonConfirm}
                        activeOpacity={0.5} underlayColor="#DC749C"
                        onPress={onSignIn} disabled={isDisableRequest}>
                        <Text style={styles.textButtonConfirm}>Đăng nhập</Text>
                    </TouchableHighlight>

                    <View style={styles.viewContinue}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(46, 93, 220, 0)', 'rgba(115, 117, 124, 0.7)', '#001858']} style={styles.barContinue}>
                            <Text>.</Text>
                        </LinearGradient>
                        <Text style={styles.textContinue}>Hoặc tiếp tục với</Text>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['rgba(46, 93, 220, 0)', 'rgba(115, 117, 124, 0.7)', '#001858']} style={styles.barContinue}>
                            <Text>.</Text>
                        </LinearGradient>
                    </View>

                    <View style={{ width: '100%', marginTop: 25, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.borderIcon}>
                                <Image source={require('../../assets/images/form/google.png')} style={{ height: 30, width: 30 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.borderIcon, { marginLeft: 15, marginRight: 15 }]}>
                                <Image source={require('../../assets/images/form/facebook.png')} style={{ height: 30, width: 30 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.borderIcon}>
                                <Image source={require('../../assets/images/form/twitter.png')} style={{ height: 30, width: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
