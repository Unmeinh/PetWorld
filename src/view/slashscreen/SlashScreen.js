import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SlashScreen({navigation}) {
  return (
    <View>
      <Button
        title="Go to Orboad"
        onPress={() => navigation.navigate('OrboadScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
