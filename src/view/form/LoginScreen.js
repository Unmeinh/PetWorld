import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function LoginScreen({navigation}) {
  return (
    <View>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
