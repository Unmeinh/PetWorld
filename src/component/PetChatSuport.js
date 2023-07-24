import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export default function PetChatSuport() {
  let message = 'Thú cưng của bạn hôm nay như thế nào';
  const [modalVisible, setModalVisible] = useState(true);
  const boxMessageAnimation = useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    if (modalVisible) {
      // Hiển thị modal
      Animated.parallel([
        Animated.timing(boxMessageAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [modalVisible]);
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 80,
          right: 20,
          display: modalVisible == false ? 'none' : 'flex',
        },
        {
          opacity: boxMessageAnimation,
          transform: [
            {
              translateX: boxMessageAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
        },
      ]}>
      <AnimatedPressable
        style={{
          backgroundColor: '#8BD3DD',
          width: 70,
          height: 70,
          borderRadius: 35,
        }}>
        <Image
          style={{
            position: 'absolute',
            bottom: 2,
            left: 5,
          }}
          source={require('../assets/image/iconHome/foot-chat-icon.png')}
        />

        <AnimatedPressable>
          <Icon
            onPress={toggleModal}
            name="close"
            size={16}
            style={{
              backgroundColor: '#FFF',
              width: 16,
              position: 'absolute',
              right: 3,
              borderRadius: 8,
            }}
          />
        </AnimatedPressable>
      </AnimatedPressable>
      <View style={[{position: 'absolute'}]}>
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 35,
            borderRightWidth: 35,
            borderBottomWidth: 20,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#F3D2C1',
            left: -80,
            bottom: -42,
          }}
        />
        <View
          style={{
            width: 150,
            height: 50,
            backgroundColor: '#F3D2C1',
            left: -175,
            bottom: 8,
            borderRadius: 20,
          }}>
          <Text
            style={{
              padding: 8,
              fontFamily: 'ProductSans',
              color: '#000',
              fontSize: 13,
            }}>
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
