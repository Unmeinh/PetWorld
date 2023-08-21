import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function PetAISupport() {
  const [offset, setoffset] = useState(0);
  const scrollRef = useRef(null);
  const fadeValue = useRef(new Animated.Value(1)).current;
  const duration = 150;
  const navigation = useNavigation()
  function animatedFaded() {
    Animated.timing(fadeValue, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={{opacity: fadeValue}}>
      <TouchableOpacity style={styles.floatingAI} onPress={()=>navigation.navigate('ChatScreen')}>
        <Image style={styles.floatingPaw}
          source={require('../assets/images/pawAI.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatingAIClose} onPress={animatedFaded}>
        <AntDesign name='close' color={'#000'} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({

  floatingPaw: {
    width: 35,
    height: 42,
    transform: [{ rotate: '35deg' }],
    marginBottom: 2, marginLeft: 7
  },

  floatingAI: {
    position: 'absolute',
    bottom: 90, right: 20,
    backgroundColor: '#8BD3DD',
    width: 65, height: 65,
    borderRadius: 35,
    justifyContent: "flex-end",
    overflow: 'hidden',
    elevation: 10,
    shadowColor: "#001858",
  },

  floatingAIClose: {
    position: 'absolute',
    bottom: 137, right: 17,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 0.7,
    borderRadius: 50,
    padding: 1.8
  }

})