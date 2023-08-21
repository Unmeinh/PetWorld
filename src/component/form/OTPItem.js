import {
    Keyboard, View,
    TextInput
} from 'react-native'
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import styles from '../../styles/form.style';

const OTPItem = (props, ref) => {
    const [inputOTP1, setinputOTP1] = useState('');
    const [inputOTP2, setinputOTP2] = useState('');
    const [inputOTP3, setinputOTP3] = useState('');
    const [inputOTP4, setinputOTP4] = useState('');
    const [inputOTP5, setinputOTP5] = useState('');
    const [inputOTP6, setinputOTP6] = useState('');
    const otp1 = useRef();
    const otp2 = useRef();
    const otp3 = useRef();
    const otp4 = useRef();
    const otp5 = useRef();
    const otp6 = useRef();

    function onInputOTP1(input) {
        var otp = input.replace(/\D/g, '');
        otp.length >= 1 ? otp2.current.focus() : '';
        setinputOTP1(otp);
    }

    function onInputOTP2(input) {
        var otp = input.replace(/\D/g, '');
        otp.length >= 1 ? otp3.current.focus() : otp1.current.focus();
        setinputOTP2(otp);
    }

    function onInputOTP3(input) {
        var otp = input.replace(/\D/g, '');
        otp.length >= 1 ? otp4.current.focus() : otp2.current.focus();
        setinputOTP3(otp);
    }

    function onInputOTP4(input) {
        var otp = input.replace(/\D/g, '');
        otp.length >= 1 ? otp5.current.focus() : otp3.current.focus();
        setinputOTP4(otp);
    }

    function onInputOTP5(input) {
        var otp = input.replace(/\D/g, '');
        otp.length >= 1 ? otp6.current.focus() : otp4.current.focus();
        setinputOTP5(otp);
    }

    function onInputOTP6(input) {
        var otp = input.replace(/\D/g, '');
        otp.length >= 1 ? '' : otp5.current.focus();
        setinputOTP6(otp);
    }

    function getOTP() {
        var otp = inputOTP1 + inputOTP2 + inputOTP3 + inputOTP4 + inputOTP5 + inputOTP6;
        console.log('otp = ' + otp);
        
    }

    useImperativeHandle(ref, () => ({
        getOTP: () => { getOTP() }
    }))

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TextInput ref={otp1} value={inputOTP1}
                    style={styles.inputOTP} textAlign='center'
                    keyboardType='number-pad' maxLength={1}
                    onChangeText={(input) => onInputOTP1(input)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key == "Backspace" ? '' : otp2.current.focus()} />
                <TextInput ref={otp2} value={inputOTP2}
                    style={styles.inputOTP} textAlign='center'
                    keyboardType='number-pad' maxLength={1}
                    onChangeText={(input) => onInputOTP2(input)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key == "Backspace" ? otp1.current.focus() : otp3.current.focus()} />
                <TextInput ref={otp3} value={inputOTP3}
                    style={styles.inputOTP} textAlign='center'
                    keyboardType='number-pad' maxLength={1}
                    onChangeText={(input) => onInputOTP3(input)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key == "Backspace" ? otp2.current.focus() : otp4.current.focus()} />
                <TextInput ref={otp4} value={inputOTP4}
                    style={styles.inputOTP} textAlign='center'
                    keyboardType='number-pad' maxLength={1}
                    onChangeText={(input) => onInputOTP4(input)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key == "Backspace" ? otp3.current.focus() : otp5.current.focus()} />
                <TextInput ref={otp5} value={inputOTP5}
                    style={styles.inputOTP} textAlign='center'
                    keyboardType='number-pad' maxLength={1}
                    onChangeText={(input) => onInputOTP5(input)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key == "Backspace" ? otp4.current.focus() : otp6.current.focus()} />
                <TextInput ref={otp6} value={inputOTP6}
                    style={styles.inputOTP} textAlign='center'
                    keyboardType='number-pad' maxLength={1}
                    onChangeText={(input) => onInputOTP6(input)}
                    onKeyPress={({ nativeEvent }) => nativeEvent.key == "Backspace" ? otp5.current.focus() : Keyboard.dismiss()} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={styles.underlineOTP}></View>
                <View style={styles.underlineOTP}></View>
                <View style={styles.underlineOTP}></View>
                <View style={styles.underlineOTP}></View>
                <View style={styles.underlineOTP}></View>
                <View style={styles.underlineOTP}></View>
            </View>
        </View>

    )
}

export default forwardRef(OTPItem);