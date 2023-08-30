import {StyleSheet, Text, View, Image,Pressable} from 'react-native';
import React from 'react';
import EvillCons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
export default function UserTag({data}) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={()=>navigation.navigate('ListAddress')}>
      <View style={styles.container}>
        <EvillCons
          name="location"
          size={28}
          color="#001858"
          style={styles.iconLocation}
        />
        <View style={styles.info}>
          <Text style={styles.textName}>
            {data.name} <Text style={styles.textPhone}>{data.phoneNumber}</Text>
          </Text>
          <Text style={styles.textLocation}>{data.location}</Text>
        </View>
        <EvillCons name="chevron-right" size={35} color="#001858" />
      </View>
      <View  style={styles.line}>
      <Image
        source={require('../../assets/images/lineSummary.png')}
      />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  line: {
    position:'absolute'
    ,bottom:15
  },
  textLocation: {
    width: 160,
    fontFamily: 'ProductSans',
    color: '#001858',
    fontSize: 15,
  },
  textPhone: {
    fontFamily: 'ProductSans',
    color: '#001858',
    fontSize: 15,
  },
  textName: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
    fontSize: 15,
  },
  iconLocation: {
    marginLeft: 10,
  },
  info: {
    flexGrow: 1,
  },
  container: {
    width: 'auto',
  
    backgroundColor: '#F4EBD9',
    height: 109,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    
  },
});
