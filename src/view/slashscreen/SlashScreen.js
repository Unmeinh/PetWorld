import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import OrboadScreen from '../orboardscreen/OrboadScreen';

export default function SplashScreen() {
  const logoSize = 150; 
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

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
          }}></Animatable.Image>)}
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