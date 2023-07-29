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

var censorCharacters = ['*', '**', '***', '****', '*****'];

export default function ConfirmOTP({ route, navigation }) {
    const [inputOTP, setinputOTP] = useState('');
    const [inputTypeVerify, setinputTypeVerify] = useState(route.params.typeVerify);
    const [inputValueVerify, setinputValueVerify] = useState(route.params.valueVerify);
    const [phoneNumberDisplay, setphoneNumberDisplay] = useState('');
    const [emailDisplay, setemailDisplay] = useState('');

    function onInputOTP(input) {
        var otp = input.replace(/\D/g, '');
        if (otp.length <= 6) {
            setinputOTP(otp);
        }
    }

    function onSendAgain() {
        ToastAndroid.show(inputValueVerify, ToastAndroid.SHORT);
    }

    function onContinue() {
        if (inputOTP == '') {
            ToastAndroid.show('Mã xác minh chưa được nhập!', ToastAndroid.SHORT);
            return;
        }

        if (inputOTP.length < 6) {
            ToastAndroid.show('Mã xác minh phải dài 6 số!', ToastAndroid.SHORT);
            return;
        } 

        ToastAndroid.show(inputOTP, ToastAndroid.SHORT);
        ToastAndroid.show('Tiếp tục', ToastAndroid.SHORT);
        navigation.navigate('ChangePassword');
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

                <View style={{ marginTop: 25 }}>
                    <TextInput style={styles.inputOTP} value={inputOTP}
                        onChangeText={(input) => (onInputOTP(input))} 
                        keyboardType='number-pad'/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={styles.underlineOTP}></View>
                        <View style={styles.underlineOTP}></View>
                        <View style={styles.underlineOTP}></View>
                        <View style={styles.underlineOTP}></View>
                        <View style={styles.underlineOTP}></View>
                        <View style={styles.underlineOTP}></View>
                    </View>
                </View>

                <TouchableHighlight style={[styles.buttonConfirm, { marginTop: 75 }]}
                    activeOpacity={0.5} underlayColor="#DC749C"
                    onPress={onContinue}>
                    <Text style={styles.textButtonConfirm}>Tiếp tục</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}