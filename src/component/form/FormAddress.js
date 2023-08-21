import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React from 'react';

export default function FormAddress() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin liên hệ</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Nhập tên"
          placeholderTextColor="#656565"
          style={styles.input}
        />
        <TextInput
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#656565"
          style={styles.input}
        />
      </View>
      <Text style={styles.title}>Thông tin địa chỉ</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Nhập địa chỉ"
          placeholderTextColor="#656565"
          multiline={true}
          style={styles.input}
        />
      </View>
      <Pressable style={styles.button}>
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
