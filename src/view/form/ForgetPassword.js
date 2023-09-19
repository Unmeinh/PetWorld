import {
  TextInput,
  Text, View,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Pressable
} from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/form.style';
import HeaderTitle from '../../component/header/HeaderTitle';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PhoneSelect from '../../component/modals/PhoneSelect';
import { ToastLayout } from '../../component/layout/ToastLayout';
import { onSendOTPbyPhoneNumber, onSendOTPbyEmail } from '../../function/functionOTP';

export default function ForgetPassword({ navigation }) {
  const [inputPhoneCountry, setinputPhoneCountry] = useState('+84');
  const [inputPhoneNumber, setinputPhoneNumber] = useState('');
  const [inputEmail, setinputEmail] = useState('');
  const [isSelectPhone, setisSelectPhone] = useState(false);
  const [isSelectEmail, setisSelectEmail] = useState(false);
  const [isShowPhoneSelect, setisShowPhoneSelect] = useState(false);
  const [widthPhoneSelect, setwidthPhoneSelect] = useState(0);
  const [isDisableRequest, setisDisableRequest] = useState(false);

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

  function onInputPhoneCountry(input) {
    setinputPhoneCountry(input);
    setisShowPhoneSelect(false);
    // console.log(input);
  }

  async function onContinue() {
    var regEmail = /^(\w+@[a-zA-Z]+\.[a-zA-Z]{2,})$/;
    var regPhone = /^(\+\d{9,})$/;

    if (isSelectPhone == false && isSelectEmail == false) {
      Toast.show({
        type: 'error',
        text1: 'Phương thức xác minh chưa được chọn!',
        position: 'top',
      })
      return;
    }

    if (!(inputPhoneCountry + inputPhoneNumber).match(regPhone) && isSelectPhone == true) {
      Toast.show({
        type: 'error',
        text1: 'Số điện thoại cần đúng định dạng!\nVí dụ: +123456789',
        position: 'top',
      })
      return;
    }

    if (!inputEmail.match(regEmail) && isSelectEmail == true) {
      Toast.show({
        type: 'error',
        text1: 'Email cần đúng định dạng!\nVí dụ: abc@def.xyz',
        position: 'top',
      })
      return;
    }
    setisDisableRequest(true);

    if (isSelectPhone == true) {
      const response = await onSendOTPbyPhoneNumber(inputPhoneCountry + inputPhoneNumber);
      console.log(response);
      if (response != undefined && response.success) {
        setTimeout(() => {
          navigation.navigate('ConfirmOTP', { navigate: "ChangePassword", typeVerify: 'phoneNumber', valueVerify: inputPhoneCountry + inputPhoneNumber, authConfirm: response.confirm })
        }, 500)
      } else {
        setisDisableRequest(false);
      }
    } else {
      const response = await onSendOTPbyEmail(inputEmail);
      console.log(response);
      if (response) {
        navigation.navigate('ConfirmOTP', { navigate: "ChangePassword", typeVerify: 'email', valueVerify: inputEmail, authConfirm: null })
      } else {
        setisDisableRequest(false);
      }
    }
  }

  const onLayoutPhoneSelect = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setwidthPhoneSelect(width);
  }

  return (
    <Pressable onPress={() => {
      if (isShowPhoneSelect) {
        setisShowPhoneSelect(false);
      }
    }} style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
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
              <View style={styles.viewInputSelect}
                onLayout={onLayoutPhoneSelect}>
                <Pressable onPress={() => {
                  if (isSelectPhone) {
                    setisShowPhoneSelect(true);
                  }
                }}>
                  <TextInput style={styles.textInputPhoneCountry}
                    value={inputPhoneCountry}
                    editable={false} />
                </Pressable>
                <TextInput style={styles.textInputPhoneNumber}
                  keyboardType='number-pad' value={inputPhoneNumber}
                  onChangeText={(input) => { onInputPhoneNumber(input) }}
                  editable={isSelectPhone} />
                <FontAwesome name='sort-down' style={styles.dropdownSelect}
                  color={'#00185880'} size={13} />
              </View>
              <PhoneSelect isShow={isShowPhoneSelect} callBack={onInputPhoneCountry}
                width={widthPhoneSelect} />
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
            onPress={onContinue} disabled={isDisableRequest}>
            <Text style={styles.textButtonConfirm}>Tiếp tục</Text>
          </TouchableHighlight>
        </View>
      </View>
      <ToastLayout />
    </Pressable>
  )
}