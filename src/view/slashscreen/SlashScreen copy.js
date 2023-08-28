import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import OrboadScreen from '../orboardscreen/OrboadScreen';

export default function SplashScreen() {
  const isMounted = useRef(true);
  const stepAnimation = new Animated.Value(0);
  const [footPrintPositions, setFootPrintPositions] = useState([]);
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
  const [logoVisible, setLogoVisible] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const hideLogo = () => {
      setTimeout(() => {
        setLogoVisible(false);
        showName();
      }, 3000);    
    };

    const showName = () => {
      setTimeout(() => {
        setNameVisible(true);
        setTimeout(navigateToOrboadScreen,1000);
      }, 500);
    };

    moveFootPrint();
    hideLogo();

    return () => {
      isMounted.current = false; // Đánh dấu component đã bị hủy
      stepAnimation.stopAnimation();    };
  }, [footPrintPositions]);

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
  const hideLogo = () => {
    setTimeout(() => {
      if (isMounted.current) { // Kiểm tra isMounted trước khi setState
        setLogoVisible(false);
        showName();
      }
    }, 3000);
  };

  const footPrintContainerStyles = {
    position: 'absolute',
    bottom: screenHeight * 0.4, 
    transform: [
      {
        rotate: '90deg', 
      },
      {
        translateX: stepAnimation.interpolate({
          inputRange: [0, totalSteps],
          outputRange: [0, totalSteps * (footPrintContainerWidth + stepDistance)], 
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
  const navigateToOrboadScreen = () => {
    navigation.navigate('OrboadScreen'); 
  };

  return (
    <View style={styles.container} pointerEvents="none">
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
