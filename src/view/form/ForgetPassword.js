import {
  TextInput,
  Text, View,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/form.style';
import HeaderTitle from '../../component/header/HeaderTitle';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

export default function ForgetPassword({ navigation }) {
  const [inputPhoneNumber, setinputPhoneNumber] = useState('');
  const [inputEmail, setinputEmail] = useState('');
  const [isSelectPhone, setisSelectPhone] = useState(false);
  const [isSelectEmail, setisSelectEmail] = useState(false);

  function onSelectPhone() {
    if (isSelectPhone == false && isSelectEmail == false) {
      setisSelectPhone(true);
    } else {
      if (isSelectEmail == true) {
        setisSelectPhone(true);
        setisSelectEmail(false);
      }
    }
  }

  function onSelectEmail() {
    if (isSelectPhone == false && isSelectEmail == false) {
      setisSelectEmail(true);
    } else {
      if (isSelectPhone == true) {
        setisSelectEmail(true);
        setisSelectPhone(false);
      }
    }
  }

  function onInputPhoneNumber(input) {
    var phoneNUM = input.replace(/\D/g, '');
    setinputPhoneNumber(phoneNUM);
  }

  async function onContinue() {
    var regEmail = /^(\w+@[a-zA-Z]+\.[a-zA-Z]{2,})$/;
    var regPhone = /^(\+\d{10,})$/;

    if (isSelectPhone == false && isSelectEmail == false) {
      ToastAndroid.show('Phương thức xác minh chưa được chọn!', ToastAndroid.SHORT);
      return;
    }

    if (!('+' + inputPhoneNumber).match(regPhone) && isSelectPhone == true) {
      ToastAndroid.show('Số điện thoại chưa đúng định dạng!', ToastAndroid.SHORT);
      return;
    }

    if (!inputEmail.match(regEmail) && isSelectEmail == true) {
      ToastAndroid.show('Email chưa đúng định dạng!', ToastAndroid.SHORT);
      return;
    }

    if (isSelectPhone == true) {
      const confirmation = await auth().signInWithPhoneNumber('+' + inputPhoneNumber);
      navigation.navigate('ConfirmOTP', { typeVerify: 'phoneNumber', valueVerify: inputPhoneNumber, authConfirm: confirmation });
    } else {
      navigation.navigate('ConfirmOTP', { typeVerify: 'email', valueVerify: inputEmail });
    }
  }

  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <HeaderTitle nav={navigation} titleHeader={'Quên mật khẩu'} colorHeader={'#FEF6E4'} />
      <View style={styles.container}>
        <Text style={styles.titleLarge}>
          Thay đổi mật khẩu
        </Text>
        <Text style={styles.textDetail}>
          Hãy nhập số điện thoại hoặc email{'\n'}của bạn để tiếp tục
        </Text>
        <View>
          <Text style={[{
            color: 'rgba(0, 24, 88, 0.80)',
          }, styles.titleInput]}>Số điện thoại của bạn</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={onSelectPhone}>
              {
                (isSelectPhone)
                  ?
                  <View>
                    <Feather name='circle' size={25} color={'rgba(0, 24, 88, 0.69)'} />
                    <FontAwesome name='circle' color={'#53BF2D'} style={styles.isSelectOption} size={11} />
                  </View>
                  : <Feather name='circle' size={25} color={'rgba(0, 24, 88, 0.69)'} />
              }
            </TouchableOpacity>
            <View>
              <TextInput style={styles.textInputSelect}
                keyboardType='number-pad' value={inputPhoneNumber}
                onChangeText={(input) => { onInputPhoneNumber(input) }}
                editable={isSelectPhone} />
              <Text style={[styles.plusTextInput, { left: 22 }]}>+</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={[{
            color: 'rgba(0, 24, 88, 0.80)',
          }, styles.titleInput]}>Email của bạn</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={onSelectEmail}>
              {
                (isSelectEmail)
                  ?
                  <View>
                    <Feather name='circle' size={25} color={'rgba(0, 24, 88, 0.69)'} />
                    <FontAwesome name='circle' color={'#53BF2D'} style={styles.isSelectOption} size={11} />
                  </View>
                  : <Feather name='circle' size={25} color={'rgba(0, 24, 88, 0.69)'} />
              }
            </TouchableOpacity>
            <TextInput style={styles.textInputSelect} value={inputEmail}
              onChangeText={(input) => { setinputEmail(input) }}
              keyboardType='email-address' editable={isSelectEmail} />
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