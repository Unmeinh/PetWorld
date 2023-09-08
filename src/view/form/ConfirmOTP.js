import {
    Text, View,
    ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
    TextInput
} from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../../styles/form.style';
import HeaderTitle from '../../component/header/HeaderTitle';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import { ToastLayout } from '../../component/layout/ToastLayout';
import auth from '@react-native-firebase/auth';

var censorCharacters = ['*', '**', '***', '****', '*****'];

export default function ConfirmOTP({ route, navigation }) {
    const [inputOTP, setinputOTP] = useState('');
    const [inputTypeVerify, setinputTypeVerify] = useState(route.params.typeVerify);
    const [inputValueVerify, setinputValueVerify] = useState(route.params.valueVerify);
    const [phoneNumberDisplay, setphoneNumberDisplay] = useState('');
    const [confirm, setconfirm] = useState(route.params.authConfirm);
    const [emailDisplay, setemailDisplay] = useState('');

    async function onSendAgain() {
        if (inputTypeVerify == 'phoneNumber') {
            if (auth().currentUser !== null) {
                await auth().signOut();
            }
            const confirmation = await auth().signInWithPhoneNumber('+' + inputValueVerify);
            setinputOTP('');
            setconfirm(confirmation);
        }
    }

    function onAuthStateChanged(user) {
        if (user) {
            console.log(user);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Tiếp tục',
                bottomOffset: 20
            });
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

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

        if (inputTypeVerify == 'phoneNumber') {
            try {
                await confirm.confirm(inputOTP);
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Tiếp tục',
                    bottomOffset: 20
                });
                // setisLogin(true);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Sai OTP',
                    bottomOffset: 20
                });
            }
        }
        // ToastAndroid.show('Tiếp tục', ToastAndroid.SHORT);
        // navigation.navigate('ChangePassword');
    }

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            if (inputTypeVerify == 'phoneNumber') {
                var phoneNumberCensored = '+' + route.params.valueVerify.substring(0, (route.params.valueVerify.length - 4)) + '****';
                setphoneNumberDisplay(phoneNumberCensored);
            } else {
                var email = route.params.valueVerify;
                var emailContent = email.substring(0, (email.indexOf('@') - 1));
                if (emailContent.length > 5) {
                    var emailCensored = emailContent.substring(0, emailContent.length - 5) + '*****' + email.substring(email.indexOf('@'));
                    setemailDisplay(emailCensored);
                } else {
                    var emailCensored = censorCharacters[emailContent.length] + email.substring(email.indexOf('@'));
                    setemailDisplay(emailCensored);
                }
            }
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
            <HeaderTitle nav={navigation} titleHeader={'Quên mật khẩu'} colorHeader={'#FEF6E4'} />
            <View style={styles.container}>
                <Text style={styles.titleLarge}>
                    Nhập mã xác minh
                </Text>
                <TextInput
                    textContentType="oneTimeCode"
                    autoComplete="one-time-code">
                </TextInput>
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
                    <TouchableOpacity onPress={onSendAgain}>
                        <Text style={[styles.textDetailRed]}>
                            Gửi lại!
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }}>
                    <OTPTextInput ref={e => (otp = e)} handleTextChange={(input) => setinputOTP(input)}
                        inputCount={6}
                        tintColor={'#8BD3DD'}
                        textInputStyle={styles.inputOTP} />
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