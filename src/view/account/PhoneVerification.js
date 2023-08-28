import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import HeaderTitleAccount from '../../component/header/HeaderTitleAccount';

export default function Email({ scrollRef, onScrollView, navigation }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 200); // Reset the state after 200ms
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(254, 246, 228, 0.5)' }}>
      <ScrollView
        ref={scrollRef}
        onScroll={onScrollView}
        style={{ height: '100%', width: '100%' }}
      >
       
        <HeaderTitleAccount
          style={localStyles.boder}
          nav={navigation}
          titleHeader="Nhập mã xác minh"
          colorHeader="#FEF6E4"
        />
         <View style={localStyles.contentContainer}>
          
         </View>
        <View style={localStyles.textContainer}>
          <Text style={localStyles.textWrapper1}>
          Hãy nhập mã xác minh 6 số  đã được gửi đến 09***684
          </Text>
          <View style={localStyles.textWrapper}>
            <Text style={localStyles.text}>
              Chưa nhận được mã? <Text style={localStyles.boldText}> Gửi lại!</Text>
            </Text>
          </View>
        </View>
        <View style={localStyles.inputContainer}>
          {/* 6 ô nhập mã OTP */}
          <View style={localStyles.otpContainer}>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <TextInput
                key={index}
                style={localStyles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>
        </View>
        <View style={localStyles.logoutContainer}>
          <TouchableOpacity
            style={[
              localStyles.logoutButton,
              isPressed && { backgroundColor: '#656565' },
            ]}
            onPress={handlePress}
          >
            <Text style={localStyles.logoutButtonText}>Gửi mã</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {},
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textWrapper: {
    width: 250,
    flexDirection: 'row',
  },
  textWrapper1: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    flex: 1,
    height: 50,
    borderColor: '#F3D2C1',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderWidth: 1, // Thêm viền cho ô nhập
    borderRadius: 8, 
    marginLeft:5,
    // Góc bo tròn cho ô nhập
  },
  logoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F582AE',
  },
  logoutButtonText: {
    color: '#FEF6E4',
    fontSize: 23,
  },
});
