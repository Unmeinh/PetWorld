import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { storageMMKV } from '../../storage/storageMMKV';
import { useNavigation } from '@react-navigation/native';
import { onAxiosGet } from '../../api/axios.function';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/reducers/user/userReducer';
import LottieView from 'lottie-react-native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logoSize = 150;
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const bottomPosition1 = screenHeight * 0.33 - logoSize / 2;
  const bottomPosition2 = screenHeight * 0.3 - logoSize / 2;

  const pawContainerWidth = 25;
  const stepDistance = 3.5;
  const totalSteps = Math.ceil(screenWidth / (pawContainerWidth + stepDistance)); // Tổng số bước chân cần di chuyển

  const stepAnimation = new Animated.Value(0);
  const [pawPositions, setPawPositions] = useState([]);
  const [nameVisible, setNameVisible] = useState(false);
  const [isFinishedOneTime, setisFinishedOneTime] = useState(false);
  const [nextScreen, setnextScreen] = useState('');

  useEffect(() => {
    const movePaw = () => {
      Animated.timing(stepAnimation, {
        toValue: totalSteps,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setPawPositions([...pawPositions, pawPositions.length]);
        }
      });
    };

    movePaw();
  }, [pawPositions]);

  function onLayoutPaw(event) {
    const { x, y, height, width } = event.nativeEvent.layout;
    if (x >= Dimensions.get('window').width) {
      if (!isFinishedOneTime) {
        setisFinishedOneTime(true);
      }
      stepAnimation.setValue(0);
      setPawPositions([]);
    }
  }

  async function getNavigate() {
    if (storageMMKV.checkKey('login.isFirstTime')) {
      if (!storageMMKV.getBoolean('login.isFirstTime')) {
        if (storageMMKV.checkKey('login.isLogin')) {
          if (storageMMKV.getBoolean('login.isLogin')) {
            if (storageMMKV.checkKey('login.token')) {
              if (storageMMKV.getString('login.token')) {
                let res = await onAxiosGet('/user/autoLogin')
                if (res) {
                  dispatch(setUserLogin(res.data));
                  setnextScreen('NaviTabScreen');
                } else {
                  storageMMKV.setValue('login.token', "");
                  setnextScreen('LoginScreen');
                }
              } else {
                storageMMKV.setValue('login.token', "");
                setnextScreen('LoginScreen');
              }
            } else {
              storageMMKV.setValue('login.token', "");
              setnextScreen('LoginScreen');
            }
          } else {
            storageMMKV.setValue('login.token', "");
            setnextScreen('LoginScreen');
          }
        } else {
          storageMMKV.setValue('login.token', "");
          setnextScreen('LoginScreen');
        }
      } else {
        storageMMKV.setValue('login.token', "");
        setnextScreen('LoginScreen');
      }
    } else {
      storageMMKV.setValue('login.token', "");
      setnextScreen('LoginScreen');
    }
  }

  const showNameApp = () => {
    setTimeout(() => {
      setNameVisible(true);
    }, 500);
  };

  React.useEffect(() => {
    if (isFinishedOneTime && nextScreen != '') {
      navigation.replace(nextScreen);
      if (storageMMKV.checkKey('login.isFirstTime') && storageMMKV.getBoolean('login.isFirstTime')) {
        storageMMKV.setValue('login.isFirstTime', false);
      }
    }
  }, [isFinishedOneTime, nextScreen]);

  React.useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      getNavigate();
      showNameApp();
      return () => {
        unsub.remove();
      };
    });

    return unsub;
  }, [navigation]);

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <LottieView source={require('../../assets/logo.json')}
        loop={true} autoPlay={true}
        style={{ width: "100%", aspectRatio: 1, marginBottom: '65%' }} />
      {nameVisible && (
        <Animatable.View animation="zoomIn" duration={2000} style={{ position: 'absolute', top: '57%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 45, color: '#001858', fontWeight: '500' }}>PETW</Text> */}
            <View style={{ borderRadius: 50, borderColor: '#001858', borderWidth: 3, width: 50, height: 50, alignItems: 'center', padding: 5 }}>
              <View style={{ width: 40, height: 45 }}>
                <FontAwesome6 name='dog' size={35} color={'#001858'}
                  style={{}} />
                <FontAwesome6 name='cat' size={20} color={'#8BD3DD'}
                  style={{ position: 'absolute', bottom: 10, left: 6 }} />
              </View>
            </View>
            <Text style={{ fontSize: 45, color: '#001858', fontWeight: '500' }}>URPET</Text>
          </View>
        </Animatable.View>
      )}
      {pawPositions.map((position, index) => (
        <View onLayout={onLayoutPaw} key={position} style={{ position: 'absolute', left: position * (pawContainerWidth + stepDistance), bottom: 0 }}>
          <Foundation name='paw' size={25} color={"#000"} style={{
            bottom: index % 2 === 0 ? bottomPosition1 : bottomPosition2,
            height: 25,
            width: 25,
            transform: [{ rotate: '90deg' }],
          }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF6E4'
  },
});
