import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  userMessage,
  userSelectStatus,
} from '../../redux/selectors/userSelector';
import Loading from '../Loading';
import {
  getDistrict,
  getProvince,
  getWards,
} from '../../redux/reducers/shop/billSlice';
import {billSelector} from '../../redux/selector';
import {Dropdown} from 'react-native-element-dropdown';

export default function FormAddress({action, value}) {
  const {fullName, _id, location, phoneNumber} =
    value.data == undefined
      ? {fullName: '', _id: '', location: '', phoneNumber: ''}
      : value.data;
  const [fullname, setFullName] = useState(fullName);
  const [phoneNumberForm, setPhoneNumber] = useState(
    '0' + phoneNumber.toString(),
  );
  const [address, setAddress] = useState(getDataEdit()[0]);
  const status = useSelector(userSelectStatus);
  const message = useSelector(userMessage);
  const billdetail = useSelector(billSelector);
  const dispatch = useDispatch();
  const [valueProvince, setValueProvince] = useState(null);
  const [valueDistrict, setValueDistrict] = useState(null);
  const [valueWard, setValueWard] = useState(null);
  useEffect(() => {
    if (status !== 'loading' && message.length > 0) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, [status, message]);

  useEffect(() => {
    if (billdetail.province?.length === 0) {
      dispatch(getProvince());
    }
    if (valueProvince?.value) {
      setValueDistrict(null);
      setValueWard(null);
      dispatch(getDistrict(valueProvince.value));
    }
  }, [valueProvince]);
  useEffect(() => {
    if (valueDistrict?.value) {
      setValueWard(null);
      dispatch(getWards(valueDistrict.value));
    }
  }, [valueDistrict]);

  function getDataEdit() {
    if (value.data) {
      const arrLocation = value.data.location.split(', ');
      return arrLocation;
    }
    return [];
  }

  const handleSave = () => {
    if (
      fullname.trim().length == 0 ||
      address.trim().length == 0 ||
      phoneNumberForm.trim().length == 0
    ) {
      ToastAndroid.show('Không được bỏ trống', ToastAndroid.SHORT);
      return;
    }
    if (value.data) {
      if (!valueWard && !valueDistrict && !valueProvince) {
        return dispatch(
          action({
            fullName: fullname.trim(),
            phoneNumber: phoneNumberForm.trim(),
            location: `${address}, ${getDataEdit()[1]}, ${getDataEdit()[2]}, ${
              getDataEdit()[3]
            }`,
            idLocation: _id,
          }),
        );
      } else {
        if (
          valueProvince == null ||
          valueDistrict == null ||
          valueWard == null
        ) {
          ToastAndroid.show('Không được bỏ trống', ToastAndroid.SHORT);
          return;
        }
        return dispatch(
          action({
            fullName: fullname.trim(),
            phoneNumber: phoneNumberForm.trim(),
            location: `${address}, ${valueWard?.label ?? getDataEdit()[1]}, ${
              valueDistrict?.label ?? getDataEdit()[2]
            }, ${valueProvince?.label ?? getDataEdit()[3]}`,
            idLocation: _id,
          }),
        );
      }
    }

    if (valueProvince == null || valueDistrict == null || valueWard == null) {
      ToastAndroid.show('Không được bỏ trống', ToastAndroid.SHORT);
      return;
    }
    if (isNaN(phoneNumberForm)) {
      ToastAndroid.show('Số điện thoại phải là số', ToastAndroid.SHORT);
      return;
    }
    if (
      phoneNumberForm.trim().length > 11 ||
      phoneNumberForm.trim().length < 9
    ) {
      ToastAndroid.show('Số điện thoại phải từ 11-9 số', ToastAndroid.SHORT);
      return;
    }

    if (value.data === undefined) {
      dispatch(
        action({
          fullName: fullname.trim(),
          phoneNumber: phoneNumberForm.trim(),
          location: `${address.trim()}, ${valueWard?.label}, ${
            valueDistrict?.label
          }, ${valueProvince?.label}`,
          isSelected: false,
        }),
      );
      setAddress('');
      setPhoneNumber('');
      setFullName('');
      setValueDistrict(null);
      setValueProvince(null);
      setValueWard(null);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
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
        <Text style={styles.titleDropdown}>Tỉnh/Thành Phố</Text>
        <Dropdown
          labelField={'label'}
          valueField={'value'}
          style={styles.dropdown}
          placeholderStyle={styles.textMedium}
          itemTextStyle={styles.textMedium}
          selectedTextStyle={styles.textMedium}
          placeholder={getDataEdit() ? getDataEdit()[3] : null}
          selectedTextProps={getDataEdit() ? getDataEdit()[3] : null}
          data={billdetail.province}
          onChange={item => {
            setValueProvince(item);
          }}
        />
        <Text style={styles.titleDropdown}>Quận/Huyện</Text>

        <Dropdown
          labelField={'label'}
          valueField={'value'}
          placeholderStyle={styles.textMedium}
          itemTextStyle={styles.textMedium}
          selectedTextStyle={styles.textMedium}
          style={styles.dropdown}
          placeholder={!valueProvince ? getDataEdit()[2] : ''}
          selectedTextProps={!valueProvince ? getDataEdit()[2] : ''}
          data={billdetail.district}
          onChange={item => {
            setValueDistrict(item);
          }}
        />
        <Text style={styles.titleDropdown}>Xã/Phường</Text>

        <Dropdown
          labelField={'label'}
          valueField={'value'}
          placeholderStyle={styles.textMedium}
          itemTextStyle={styles.textMedium}
          selectedTextStyle={styles.textMedium}
          style={styles.dropdown}
          placeholder={!valueDistrict ? getDataEdit()[1] : ''}
          selectedTextProps={!valueDistrict ? getDataEdit()[1] : ''}
          data={billdetail.wards}
          onChange={item => {
            setValueWard(item);
          }}
        />
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
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.textButton}>Lưu</Text>
        </Pressable>
      </ScrollView>

      {status === 'loading' || billdetail.status ? <Loading /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  textButton: {fontFamily: 'ProductSansBold', fontSize: 16, color: '#001858'},
  button: {
    height: 50,
    backgroundColor: '#F582AE',
    width: '100%',
    borderRadius: 3,
    marginTop: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'rgba(101, 101, 101,0.2)',
    fontFamily: 'ProductSans',
    fontSize: 17,
    color: 'rgba(101, 101, 101,0.5)',
  },
  title: {
    fontFamily: 'ProductSansBold',
    color: '#656565',
    fontSize: 16,
  },
  titleDropdown: {
    fontFamily: 'ProductSans',
    color: '#656565',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  containerInput: {
    backgroundColor: 'rgba(187, 115, 8,0.2)',
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  textMedium: {
    fontFamily: 'ProductSans',
    color: '#b3aaaa',
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: '#F582AE',
  },
});
