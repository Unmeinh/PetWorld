import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  userMessage,
  userSelectStatus,
} from '../../redux/selectors/userSelector';
export default function FormAddress({action, value}) {
  const {fullName, _id, location, phoneNumber} =
    value.data == undefined
      ? {fullName: '', _id: '', location: '', phoneNumber: ''}
      : value.data;
  const [fullname, setFullName] = useState(fullName);
  const [phoneNumberForm, setPhoneNumber] = useState("0"+phoneNumber.toString());
  const [address, setAddress] = useState(location);
  const status = useSelector(userSelectStatus);
  const message = useSelector(userMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status !== 'loading' && message.length > 0) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, [status, message]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin liên hệ</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Nhập tên"
          placeholderTextColor="#656565"
          style={styles.input}
          maxLength={24}
          onChangeText={t => setFullName(t)}
          value={fullname}
        />
        <TextInput
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#656565"
          style={styles.input}
          maxLength={12}
          keyboardType="numeric"
          textContentType="telephoneNumberForm"
          value={phoneNumberForm.toString()}
          onChangeText={t => setPhoneNumber(t)}
        />
      </View>
      <Text style={styles.title}>Thông tin địa chỉ</Text>
      <View style={styles.containerInput}>
        <TextInput
          value={address}
          placeholder="Nhập địa chỉ"
          placeholderTextColor="#656565"
          multiline={true}
          style={styles.input}
          onChangeText={t => setAddress(t)}
        />
      </View>
      {status === 'loading' ? (
        <ActivityIndicator size={'large'} color="#F582AE" />
      ) : null}
      <Pressable
        style={styles.button}
        onPress={() => {
          if (
            fullname.trim().length == 0 ||
            address.trim().length == 0 ||
            phoneNumberForm.trim().length == 0
          ) {
            Alert.alert('Không được bỏ trống');
            return;
          }
          if (isNaN(phoneNumberForm)) {
            Alert.alert('Số điện thoại phải là số');
            return;
          }
          if (
            phoneNumberForm.trim().length > 11 ||
            phoneNumberForm.trim().length < 9
          ) {
            Alert.alert('Số điện thoại phải từ 11-9 số');
            return;
          }

          if(value.data === undefined){
            dispatch(
              action({
                fullName: fullname.trim(),
                phoneNumber: phoneNumberForm.trim(),
                location: address.trim(),
                isSelected: false,
              }),
            );
            setAddress('');
            setPhoneNumber('');
            setFullName('');
          }else{
            dispatch(action({
              fullName: fullname.trim(),
                phoneNumber: phoneNumberForm.trim(),
                location: address.trim(),
                idLocation:_id
            }))
          }
        }}>
        <Text style={styles.textButton}>Lưu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textButton: {fontFamily: 'ProductSansBold', fontSize: 16, color: '#001858'},
  button: {
    height: 50,
    backgroundColor: '#F582AE',
    width: '100%',
    borderRadius: 3,
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'rgba(101, 101, 101,0.2)',
    fontFamily: 'ProductSans',
    fontSize: 17,
  },
  title: {
    fontFamily: 'ProductSansBold',
    color: '#656565',
    fontSize: 16,
  },
  containerInput: {
    backgroundColor: 'rgba(187, 115, 8,0.2)',
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
