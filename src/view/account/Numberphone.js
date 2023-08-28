import { Text, View, ScrollView, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import  React from 'react';
import HeaderTitleAccount from '../../component/header/HeaderTitleAccount';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
export default function Account({ scrollRef, onScrollView }) {
  const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
      setIsPressed(true);
      setTimeout(() => {
        setIsPressed(false);
        navigation.navigate('PhoneVerification');
      }, 200); // Reset the state after 200ms
    };
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(254, 246, 228, 0.5)' }}>
      <ScrollView
        ref={scrollRef}
        onScroll={onScrollView}
        style={{ height: '100%', width: '100%', }}
      >
        <View style={localStyles.contentContainer}>
        <HeaderTitleAccount
          style={localStyles.boder}
          nav={navigation}
          titleHeader="Nhập số điện thoại"
          colorHeader="#FEF6E4"
        />
        <View style={localStyles.textContainer}>
          <View style={localStyles.textWrapper}>
            <Text style={localStyles.text}>
              Chúng tôi sử dụng số điện thoại của bạn để cải thiện trải nghiệm
              app cho bạn gồm kết nối với những người bạn biết, cá nhân hóa...{' '}
              <Text style={localStyles.boldText}>Tìm hiểu thêm</Text>
            </Text>
          </View>
        </View>
        <View style={localStyles.inputContainer}>
          <TextInput
            style={localStyles.input}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
          />
        </View>
        <View style={localStyles.logoutContainer}>
          
        <TouchableOpacity style={localStyles.logoutButton} onPress={handlePress}>
          <Text style={localStyles.logoutButtonText}>Gửi mã</Text>
        </TouchableOpacity>
       
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'rgba(254, 246, 228, 0.90)',
    
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Khoảng cách giữa header và đoạn văn bản
  },
  textWrapper: {
    width: 350,
    flexDirection: 'row',
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
  input: {
    height: 50,
    borderColor: '#F3D2C1',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
      color: '#001858',
      fontFamily: 'ProductSans',
  
  },
  logoutContainer: {
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#F582AE',
    marginLeft: 50,
    marginRight: 50,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FEF6E4',
    fontSize: 23,
  },
});
