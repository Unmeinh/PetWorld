import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { storageMMKV } from '../../storage/storageMMKV';
import { useNavigation } from '@react-navigation/native';
import axiosGet from '../../api/axios.config';

export default function SplashScreen() {
  const navigation = useNavigation();
  const logoSize = 150;
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const bottomPosition = screenHeight * 0.6 - logoSize / 2;
  const bottomPosition1 = screenHeight * 0.33 - logoSize / 2;
  const bottomPosition2 = screenHeight * 0.3 - logoSize / 2;
  const nameBottomPosition = screenHeight * 0.4;

  const nameImageWidth = screenWidth * 0.7;
  const nameImageHeight = (nameImageWidth * logoSize) / logoSize;

  const footprintContainerWidth = 24;
  const stepDistance = 3.7; // Khoảng cách giữa các bước chân
  const totalSteps = Math.ceil(screenWidth / (footprintContainerWidth + stepDistance)); // Tổng số bước chân cần di chuyển

  const stepAnimation = new Animated.Value(0);
  const [footprintPositions, setFootPrintPositions] = useState([]);
  const [logoVisible, setLogoVisible] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);
  const [isRunningAnimated, setisRunningAnimated] = useState(true);

  useEffect(() => {
    if (isRunningAnimated) {
      const moveFootPrint = () => {
        Animated.timing(stepAnimation, {
          toValue: totalSteps,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            setFootPrintPositions([...footprintPositions, footprintPositions.length]);
          }
        });
      };

      const hideLogo = () => {
        setTimeout(() => {
          setLogoVisible(false);
          showName();
        }, 2000);
      };

      const showName = () => {
        setTimeout(() => {
          setNameVisible(true);
        }, 300); // Hiển thị phần nameImageContainer sau khi logo biến mất 0.5 giây
      };

      moveFootPrint();
      hideLogo();

    } else {
      autoNavigate();
    }
  }, [footprintPositions]);

  function onLayoutPaw(event) {
    const { x, y, height, width } = event.nativeEvent.layout;
    if (x >= Dimensions.get('window').width) {
      setisRunningAnimated(false);
    }
  }

  function autoNavigate() {
    if (storageMMKV.checkKey('login.isFirstTime')) {
      if (!storageMMKV.getBoolean('login.isFirstTime')) {
        if (storageMMKV.checkKey('login.isLogin')) {
          if (storageMMKV.getBoolean('login.isLogin')) {
            if (storageMMKV.checkKey('login.token')) {
              if (storageMMKV.getString('login.token')) {
                //axios check token
                navigation.navigate('NaviTabScreen');
                // axiosGet.get('/user/token/' + storageMMKV.getString('login.token'))
                //   .then((res) => {
                //     if (res.data.success) {
                //       navigation.navigate('NaviTabScreen');
                //     } else {
                //       navigation.navigate('LoginScreen');
                //     }
                //   })
                //   .catch((err) => {
                //     navigation.navigate('LoginScreen');
                //   })
              } else {
                navigation.navigate('LoginScreen');
              }
            } else {
              navigation.navigate('LoginScreen');
            }
          } else {
            navigation.navigate('LoginScreen');
          }
        } else {
          navigation.navigate('LoginScreen');
        }
      } else {
        navigation.navigate('OrboadScreen');
      }
    } else {
      navigation.navigate('OrboadScreen');
    }
  }

  const footprintContainerStyles = {
    position: 'absolute',
    bottom: screenHeight * 0.4,
    transform: [
      {
        rotate: '90deg',
      },
      {
        translateX: stepAnimation.interpolate({
          inputRange: [0, totalSteps],
          outputRange: [0, totalSteps * (footprintContainerWidth + stepDistance)],
        }),
      },
      {
        scaleX: stepAnimation.interpolate({
          inputRange: [0, totalSteps],
          outputRange: [1, -1], // Thay đổi tỷ lệ kích thước theo chiều ngang để tạo hiệu ứng đối xứng
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {logoVisible && (
        <Animatable.Image
          animation={{
            from: { scale: 0 },
            to: { scale: 1 },
          }}
          duration={3000}
          source={require('../../assets/images/logoApp/logo.png')}
          style={[
            styles.logo,
            { width: logoSize, height: logoSize, bottom: bottomPosition },
          ]}
        />
      )}
      {nameVisible && (
        <Animatable.View animation="fadeIn" duration={1000} style={[styles.nameImageContainer, { bottom: nameBottomPosition }]}>
          <Image
            source={require('../../assets/images/logoApp/name.png')}
            style={{ width: nameImageWidth, height: nameImageHeight }}
            resizeMode="contain"
          />
        </Animatable.View>
      )}
      {footprintPositions.map((position, index) => (
        <View onLayout={onLayoutPaw} key={position} style={[styles.footprintContainer, { left: position * (footprintContainerWidth + stepDistance) }]}>
          <Image
            source={require('../../assets/images/logoApp/footprint.png')}
            style={[
              styles.footprintImage,
              {
                bottom: index % 2 === 0 ? bottomPosition1 : bottomPosition2,
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF6E4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
  },
  nameImageContainer: {
    position: 'absolute',
  },
  footprintContainer: {
    position: 'absolute',
    bottom: 0,
  },
  footprintImage: {
    width: 24,
    height: 24,
  },
});