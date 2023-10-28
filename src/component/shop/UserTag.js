import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import EvillCons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
export default function UserTag({data, disabled}) {
  const navigation = useNavigation();
  return (
    <Pressable
      disabled={disabled ? disabled : false}
      onPress={() => navigation.navigate('ListAddress')}>
      <View style={styles.container}>
        <EvillCons
          name="location"
          size={28}
          color="#001858"
          style={styles.iconLocation}
        />
        <View style={styles.info}>
          <Text style={styles.textName}>
            {data.fullName} ,{' '}
            <Text style={styles.textPhone}>0{data.phoneNumber}</Text>
          </Text>
          <Text style={styles.textLocation}>{data.location}</Text>
        </View>
        <EvillCons
          name="chevron-right"
          size={35}
          color="#001858"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        />
      </View>
      <View style={styles.line}>
        <Image source={require('../../assets/images/lineSummary.png')} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    bottom: 15,
  },
  textLocation: {
    fontFamily: 'ProductSans',
    color: '#001858',
    fontSize: 15,
    paddingRight: 50,
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
