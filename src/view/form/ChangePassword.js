import {
  Text, View,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  ToastAndroid
} from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/form.style';
import HeaderTitle from '../../component/header/HeaderTitle';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ChangePassword({ navigation }) {
  const [passToggle, setpassToggle] = useState(true);
  const [confirmPassToggle, setconfirmPassToggle] = useState(true);
  const [inputNewPassword, setinputNewPassword] = useState('');
  const [inputConfirmPassword, setinputConfirmPassword] = useState('');

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

  function checkValidate(inputObj) {
    var regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=<>!]).{8,}/;
    
    if (!inputNewPassword.match(regPass)) {
      ToastAndroid.show('Mật khẩu chưa đúng định dạng!', ToastAndroid.SHORT);
      ToastAndroid.show('Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một số, chữ cái viết thường, chữ viết hoa và ký tự đặc biệt!', ToastAndroid.LONG);
      return false;
    }

    if (inputNewPassword != inputConfirmPassword) {
      ToastAndroid.show('Mật khẩu nhập lại không trùng!', ToastAndroid.SHORT);
      return false;
    }

    return true;
  }

  function onChangePass() {
    if (checkValidate() == false) {
      return;
    }

    ToastAndroid.show('Xác nhận', ToastAndroid.SHORT);
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <HeaderTitle nav={navigation} titleHeader={'Quên mật khẩu'} colorHeader={'#FEF6E4'} />
      <View style={styles.container}>
        <Text style={styles.titleLarge}>
          Thiết lập mật khẩu mới
        </Text>
        <Text style={styles.textDetail}>
          Hãy nhập mật khẩu mới của bạn.{'\n'}
          Mật khẩu cần dài ít nhất 8 ký tự. {'\n'}
          Bao gồm tối thiểu 1 chữ hoa,{'\n'}
          1 chữ thường, 1 số và 1 ký tự đặc biệt.
        </Text>

        <View style={{marginTop: 15}}>
          <Text style={[{
            color: 'rgba(0, 24, 88, 0.80)',
          }, styles.titleInput]}>Mật khẩu mới</Text>
          <View>
            <TextInput style={styles.textInputPass}
              secureTextEntry={passToggle} value={inputNewPassword}
              onChangeText={(input) => { setinputNewPassword(input) }} />
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
          }, styles.titleInput]}>Nhập lại mật khẩu mới</Text>
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

        <TouchableHighlight style={[styles.buttonConfirm, { marginTop: 75 }]}
          activeOpacity={0.5} underlayColor="#DC749C"
          onPress={onChangePass}>
          <Text style={styles.textButtonConfirm}>Xác nhận</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}