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
import { useNavigation } from '@react-navigation/native';
import { axiosJSON } from '../../api/axios.config';
import Toast from 'react-native-toast-message';
import { ToastLayout } from '../../component/layout/ToastLayout';

export default function RegisterPassword({ route }) {
  const navigation = useNavigation();
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

  function checkValidate() {
    var regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;

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

  async function onChangePass() {
    if (checkValidate() == false) {
      return;
    }

    let objData = {};
    objData = route.params.objUser;
    objData.passWord = inputNewPassword;

    Toast.show({
      type: 'loading',
      position: 'top',
      text1: "Đang đăng ký tài khoản...",
      bottomOffset: 20,
      autoHide: false
    });

    var response = await axiosJSON.post('/user/register', objData)
      .catch((e) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: String(e.response.data.message),
          bottomOffset: 20
        });

      });
    if (response != undefined) {
      if (response.status == 201) {
        var data = response.data;
        try {
          if (data.success) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: String(data.message),
              bottomOffset: 20
            });
            setTimeout(() =>
              navigation.navigate('LoginScreen'), 1000)
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        var data = response.data;
        try {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: String(data.message),
            bottomOffset: 20
          });
        } catch (error) {
          console.log(error);
        }

      }
    }
  }

  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <HeaderTitle nav={navigation} titleHeader={'Đăng ký tài khoản'} colorHeader={'#FEF6E4'} />
      <View style={styles.container}>
        <Text style={styles.titleLarge}>
          Nhập mật khẩu mới
        </Text>
        <Text style={styles.textDetail}>
          Hãy nhập mật khẩu mới của bạn.{'\n'}
          Mật khẩu cần dài ít nhất 8 ký tự. {'\n'}
          Bao gồm tối thiểu 1 chữ hoa,{'\n'}
          1 chữ thường và 1 số.
        </Text>

        <View style={{ marginTop: 15 }}>
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
                  <Entypo name='eye' color={'#001858'} size={22} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.togglePassword}
                  onPress={onChangeConfirmPassToggle}>
                  <Entypo name='eye-with-line' color={'#001858'} size={22} />
                </TouchableOpacity>
            }
          </View>
        </View>

        <TouchableHighlight style={[styles.buttonConfirm, { marginTop: 75 }]}
          activeOpacity={0.5} underlayColor="#DC749C"
          onPress={onChangePass}>
          <Text style={styles.textButtonConfirm}>Đăng ký</Text>
        </TouchableHighlight>
      </View>
      <ToastLayout />
    </View>
  )
}