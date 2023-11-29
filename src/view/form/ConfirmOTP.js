import {
    Text, View,
    ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
    TextInput
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/form.style';
import HeaderTitle from '../../component/header/HeaderTitle';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import { ToastLayout } from '../../component/layout/ToastLayout';
import auth from '@react-native-firebase/auth';
import { startOtpListener } from 'react-native-otp-verify';
import { useNavigation } from '@react-navigation/native';
import { onSendOTPbyPhoneNumber, onSendOTPbyEmail, onVerifyOTPbyEmail } from '../../function/functionOTP';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function ConfirmOTP({ route }) {
    const navigation = useNavigation();
    const [inputOTP, setinputOTP] = useState('');
    let otpRef = useRef(null);
    const inputTypeVerify = route.params.typeVerify;
    const inputValueVerify = route.params.valueVerify;
    const [userAuth, setuserAuth] = useState(null);
    const [phoneNumberDisplay, setphoneNumberDisplay] = useState('');
    const [emailDisplay, setemailDisplay] = useState('');
    const [confirm, setconfirm] = useState(route.params.authConfirm);
    const [cdSendAgain, setcdSendAgain] = useState(30);
    const [isReadedMessage, setisReadedMessage] = useState(false);

    async function onSendAgain() {
        if (auth().currentUser !== null) {
            await auth().signOut();
        }
        setuserAuth(null);
        setinputOTP('');
        if (otpRef != null) {
            otpRef.setValue('');
        }
        setcdSendAgain(30);
        if (inputTypeVerify == "phoneNumber") {
            const response = await onSendOTPbyPhoneNumber(inputValueVerify);
            if (response && response.success) {
                setconfirm(response.confirm);
                setisReadedMessage(false);
            }
        } else {
            await onSendOTPbyEmail(inputValueVerify);
        }
    }

    async function onContinue() {
        if (inputOTP == '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Mã xác minh chưa được nhập!',
                bottomOffset: 20
            });
            return;
        }

        if (inputOTP.length < 6) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Mã xác minh phải dài 6 số!',
                bottomOffset: 20
            });
            return;
        }

        Toast.show({
            type: 'loading',
            position: 'top',
            text1: "Đang kiểm tra mã xác minh...",
            autoHide: false
        });

        if (inputTypeVerify == 'phoneNumber') {
            try {
                await confirm.confirm(inputOTP);
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Thành công',
                    bottomOffset: 20
                });
                setTimeout(() => {
                    if (route.params.navigate == "RegisterPassword") {
                        navigation.navigate(route.params.navigate, { objUser: route.params.objUser, typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
                    } else {
                        navigation.navigate(route.params.navigate, { typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
                    }
                }, 500)
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Mã xác minh sai!',
                    bottomOffset: 20
                });
            }
        } else {
            var response = await onVerifyOTPbyEmail(inputValueVerify, inputOTP);
            if (response) {
                setTimeout(() => {
                    if (route.params.navigate == "RegisterPassword") {
                        navigation.navigate(route.params.navigate, { objUser: route.params.objUser, typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
                    } else {
                        navigation.navigate(route.params.navigate, { typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
                    }
                }, 500)
            } 
        }
    }

    function onAuthStateChanged(user) {
        if (user) {
            setuserAuth(user);
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    function onChangeOTPInput(input) {
        if (otpRef != null) {
            if (input.length < inputOTP.length) {
                otpRef.setValue(input);
            }
        }
        setinputOTP(input);
    }

    useEffect(() => {
        (async () => {
            if (inputTypeVerify == "phoneNumber") {
                const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
                if (!isReadedMessage) {
                    await startOtpListener(message => {
                        if (message != null) {
                            try {
                                const otp = /(\d{6})/g.exec(message)[1];
                                console.log(otp);
                                setinputOTP(otp);
                                setisReadedMessage(true);
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    }).catch((error) => console.log(error));
                }
                return subscriber; // unsubscribe on unmount
            }
        })();
    }, []);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            if (inputTypeVerify == 'phoneNumber') {
                var cencorLength = inputValueVerify.substring(1, (inputValueVerify.length - 3)).length;
                var cencorValue = '+';
                for (let i = 0; i < cencorLength; i++) {
                    cencorValue += "*";
                }
                var phoneNumberCensored = cencorValue + inputValueVerify.substring((inputValueVerify.length - 3));

                setphoneNumberDisplay(phoneNumberCensored);
            } else {
                var cencorLength = inputValueVerify.substring(0, (inputValueVerify.indexOf('@') - 1)).length;
                var cencorValue = '';
                for (let i = 0; i < cencorLength; i++) {
                    cencorValue += "*";
                }
                var emailCensored = cencorValue + inputValueVerify.substring(inputValueVerify.indexOf('@'));
                setemailDisplay(emailCensored);
            }
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    useEffect(() => {
        if (cdSendAgain > 0) {
            setTimeout(() => {
                var cd = cdSendAgain - 1;
                setcdSendAgain(cd);
            }, 1000)
        }
    }, [cdSendAgain]);

    useEffect(() => {
        if (otpRef != null) {
            if (userAuth != null && isReadedMessage) {
                otpRef.setValue(inputOTP);
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Thành công',
                    bottomOffset: 20
                });
                setTimeout(() => {
                    if (route.params.function) {
                        route.params.function();
                    }
                    if (route.params.navigate) {
                        if (route.params.navigate == "RegisterPassword") {
                            navigation.navigate(route.params.navigate, { objUser: route.params.objUser, typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
                        } else {
                            navigation.navigate(route.params.navigate, { typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
                        }
                    }
                }, 500)
            }
        }
    }, [userAuth, isReadedMessage]);

    return (
        <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
            <HeaderTitle nav={navigation} titleHeader={'Nhập mã xác minh'} colorHeader={'#FEF6E4'} />
            <View style={styles.container}>
                <Text style={styles.titleLarge}>
                    Nhập mã xác minh
                </Text>
                {
                    (inputTypeVerify != 'email')
                        ? <Text style={styles.textDetail}>
                            Hãy nhập mã xác minh 6 số đã được{'\n'}gửi về số {phoneNumberDisplay} của bạn.
                        </Text>
                        : <Text style={styles.textDetail}>
                            Hãy nhập mã xác minh 6 số đã được{'\n'}gửi về email {emailDisplay} của bạn.
                        </Text>
                }
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textDetail}>
                        Chưa nhận được mã?
                    </Text>
                    <TouchableOpacity onPress={onSendAgain} disabled={(cdSendAgain == 0) ? false : true}>
                        <Text style={[styles.textDetailRed]}>
                            Gửi lại! {(cdSendAgain == 0) ? "" : "(" + cdSendAgain + ")"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }}>
                    <OTPTextInput ref={e => (otpRef = e)} handleTextChange={(input) => onChangeOTPInput(input)}
                        inputCount={6} defaultValue=''
                        tintColor={'#8BD3DD'}
                        textInputStyle={styles.inputOTP}
                    />
                </View>

                <TouchableHighlight style={[styles.buttonConfirm, { marginTop: 75 }]}
                    activeOpacity={0.5} underlayColor="#DC749C"
                    onPress={onContinue}>
                    <Text style={styles.textButtonConfirm}>Tiếp tục</Text>
                </TouchableHighlight>
            </View>
            <ToastLayout />
        </View>
    )
}