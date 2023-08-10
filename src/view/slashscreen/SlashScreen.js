import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import OrboadScreen from '../orboardscreen/OrboadScreen';

export default function SplashScreen() {
  const logoSize = 150; 
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const bottomPosition = screenHeight * 0.6 - logoSize / 2;
  const bottomPosition1 = screenHeight * 0.33 - logoSize / 2;
  const bottomPosition2 = screenHeight * 0.3 - logoSize / 2;
  const nameBottomPosition = screenHeight * 0.4;

  const nameImageWidth = screenWidth * 0.7; 
  const nameImageHeight = (nameImageWidth * logoSize) / logoSize; 

  const footPrintContainerWidth = 24;
  const stepDistance = 3.7;
  const totalSteps = Math.ceil(screenWidth / (footPrintContainerWidth + stepDistance));

  const stepAnimation = useRef(new Animated.Value(0)).current;
  const [footPrintPositions, setFootPrintPositions] = useState([]);
  const [logoVisible, setLogoVisible] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);
  const isEffectRunning = useRef(false); // Thêm biến ref

  const navigation = useNavigation();

  useEffect(() => {
    const moveFootPrint = () => {
      Animated.timing(stepAnimation, {
        toValue: totalSteps,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setFootPrintPositions([...footPrintPositions, footPrintPositions.length]);
        }
      });
    };

    const hideLogoAndShowName = () => {
      setTimeout(() => {
        setLogoVisible(false);
        setNameVisible(true);
        setTimeout(() => {
          navigateToOrboadScreen();
          isEffectRunning.current = false; // Đánh dấu là đã chạy xong
        }, 1000);
      }, 3000);
    };

    // Kiểm tra xem useEffect() đã chạy hay chưa
    if (!isEffectRunning.current) {
      moveFootPrint();
      hideLogoAndShowName();
      isEffectRunning.current = true; // Đánh dấu là đang chạy
    }

    return () => {
      stepAnimation.stopAnimation();
    };
  }, [footPrintPositions]);

  const navigateToOrboadScreen = () => {
    navigation.navigate('OrboadScreen'); 
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
          source={require('../../assets/image/logoApp/logo.png')}
          style={[
            styles.logo,
            { width: logoSize, height: logoSize, bottom: bottomPosition },
          ]}
        />
      )}
      {nameVisible && (
        <Animatable.View animation="fadeIn" duration={1000} style={[styles.nameImageContainer, { bottom: nameBottomPosition }]}>
          <Image
            source={require('../../assets/image/logoApp/name.png')}
            style={{ width: nameImageWidth, height: nameImageHeight }}
            resizeMode="contain"
          />
        </Animatable.View>
      )}
      {footPrintPositions.map((position, index) => (
        <View key={position} style={[styles.footPrintContainer, { left: position * (footPrintContainerWidth + stepDistance) }]}>
          <Image
            source={require('../../assets/image/logoApp/footPrint.png')}
            style={[
              styles.footPrintImage,
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
    backgroundColor:'#FEF6E4',
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
  footPrintContainer: {
    position: 'absolute',
    bottom: 0,
  },
  footPrintImage: {
    width: 24,
    height: 24,
  },
});
