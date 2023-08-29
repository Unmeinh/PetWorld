import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import OrboadScreen from '../orboardscreen/OrboadScreen';

export default function SplashScreen() {
  const isMounted = useRef(true); // Sử dụng useRef để theo dõi mount/unmount
  const stepAnimation = new Animated.Value(0);
  const [footPrintPositions, setFootPrintPositions] = useState([]);
  // ... Các biến và hàm khác

  useEffect(() => {
    // ... Các hàm khác

    // Sử dụng isMounted để kiểm tra trạng thái của component trước khi thực hiện các hành động trong useEffect
    moveFootPrint();
    hideLogo();

    return () => {
      isMounted.current = false; // Đánh dấu component đã bị hủy
      stepAnimation.stopAnimation();
    };
  }, [footPrintPositions]);

  

  const moveFootPrint = () => {
    // ... Các hành động di chuyển dấu chân
    Animated.timing(stepAnimation, {
      toValue: totalSteps,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && isMounted.current) { // Kiểm tra isMounted trước khi setState
        setFootPrintPositions([...footPrintPositions, footPrintPositions.length]);
      }
    });
  };

  const hideLogo = () => {
    setTimeout(() => {
      if (isMounted.current) { // Kiểm tra isMounted trước khi setState
        setLogoVisible(false);
        showName();
      }
    }, 3000);
  };

  // ... Các hàm khác và phần còn lại của component
}
