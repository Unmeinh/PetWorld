import {
    Text, View,
    TouchableHighlight,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/form.style';
import HeaderTitle from '../../component/header/HeaderTitle';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { startOtpListener } from 'react-native-otp-verify';
import { useNavigation } from '@react-navigation/native';
import { onSendOTPbyPhoneNumber, onSendOTPbyEmail, onVerifyOTPbyEmail } from '../../function/functionOTP';
import { LogBox } from 'react-native';
import ReadMessageModal from '../../component/modals/ReadMessageModal';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default function ConfirmOTP({ route }) {
    const navigation = useNavigation();
    const inputTypeVerify = route.params.typeVerify;
    const inputValueVerify = route.params.valueVerify;
    const [confirm, setconfirm] = useState(route.params.authConfirm);
    const [userAuth, setuserAuth] = useState(null);
    const [emailDisplay, setemailDisplay] = useState('');
    const [phoneNumberDisplay, setphoneNumberDisplay] = useState('');
    const [cdSendAgain, setcdSendAgain] = useState(30);
    const [isReadedMessage, setisReadedMessage] = useState(false);
    const [readedOTP, setreadedOTP] = useState('');
    const [isLoginAuth, setisLoginAuth] = useState(false);
    const [inputOTP, setinputOTP] = useState('');
    const [isShowModelReadMes, setisShowModelReadMes] = useState(false);
    const [messageOTP, setmessageOTP] = useState('');
    let otpRef = useRef(null);

    //Function layout
    function onChangeOTPInput(input) {
        if (otpRef != null) {
            if (input.length < inputOTP.length) {
                otpRef.setValue(input);
            }
        }
        setinputOTP(input);
    }

    function onHideModalReadMes() {
        setisShowModelReadMes(false);
        setmessageOTP("");
        setisReadedMessage(false);
        const otp = /(\d{6})/g.exec(messageOTP)[1];
        setreadedOTP(otp);
    }

    //Function api
    async function onSendAgain() {
        if (auth().currentUser) {
            await auth().signOut();
        }
        setconfirm(null);
        setuserAuth(null);
        setinputOTP('');
        setreadedOTP('');
        setisReadedMessage(false);
        setisLoginAuth(false);
        if (otpRef) {
            otpRef.setValue('');
        } else {
            return;
        }
        if (inputTypeVerify == "phoneNumber") {
            setcdSendAgain(30);
            const response = await onSendOTPbyPhoneNumber(String(inputValueVerify));
            if (response != undefined && response.success) {
                setconfirm(response.confirm);
            }
        } else {
            setcdSendAgain(30);
            await onSendOTPbyEmail(inputValueVerify);
        }
    }

    async function onContinue() {
        Keyboard.dismiss();
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
                onReadyContinue();
            } catch (error) {
                console.log(error);
                if (isReadedMessage && readedOTP != ''
                    && String(error).indexOf('[auth/session-expired]') >= 0) {
                    if (readedOTP == inputOTP) {
                        onReadyContinue();
                        return;
                    }
                }
                if (!isReadedMessage && readedOTP != '' && isLoginAuth
                    && String(error).indexOf('[auth/session-expired]') >= 0) {
                    if (readedOTP == inputOTP) {
                        onReadyContinue();
                        return;
                    }
                }
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

    //Function support
    function onAuthStateChanged(user) {
        if (user) {
            setuserAuth(user);
            setisLoginAuth(true);
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    function onAllowReadMes() {
        setisShowModelReadMes(false);
        setmessageOTP("");
        const otp = /(\d{6})/g.exec(messageOTP)[1];
        setinputOTP(otp);
        setisReadedMessage(true);
        setreadedOTP(otp);
        if (otpRef) {
            otpRef.setValue(otp);
        }
    }

    function onDenyReadMes() {
        setisShowModelReadMes(false);
        setmessageOTP("");
        setisReadedMessage(false);
        const otp = /(\d{6})/g.exec(messageOTP)[1];
        setreadedOTP(otp);
    }

    function onReadyContinue() {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Xác minh thành công.',
            bottomOffset: 20
        });
        setTimeout(() => {
            if (route.params.navigate == "RegisterPassword") {
                navigation.navigate(route.params.navigate, { objUser: route.params.objUser, typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
            } else {
                navigation.navigate(route.params.navigate, { typeVerify: inputTypeVerify, valueVerify: inputValueVerify });
            }
        }, 500)
    }

    //Hook
    useEffect(() => {
        (async () => {
            if (inputTypeVerify == "phoneNumber") {
                const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
                if (!isReadedMessage) {
                    await startOtpListener(message => {
                        if (message != null) {
                            try {
                                if (message.indexOf('Firebase App verification code is') >= 0
                                    || message.indexOf('Firebase App code is') >= 0) {
                                    setmessageOTP(message);
                                    setisShowModelReadMes(true);
                                }
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

    useEffect(() => {
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
                var cencorTextFirst = inputValueVerify.substring(0, 1);
                var cencorTextLast = inputValueVerify.substring((inputValueVerify.indexOf('@') - 1), (inputValueVerify.indexOf('@')));
                var cencorValue = cencorTextFirst + "*****" + cencorTextLast;
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
                    <OTPTextInput ref={e => (otpRef = e)} handleTextChange={onChangeOTPInput}
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
            {isShowModelReadMes &&
                <ReadMessageModal isShow={isShowModelReadMes}
                    callBackHide={onHideModalReadMes} massage={messageOTP}
                    onAllow={onAllowReadMes} onDeny={onDenyReadMes} />
            }
        </View>
    )
}