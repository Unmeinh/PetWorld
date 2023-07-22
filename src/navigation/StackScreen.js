import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SlashScreen from '../view/slashscreen/SlashScreen';
import OrboadScreen from '../view/orboardscreen/OrboadScreen';
import LoginScreen from '../view/form/LoginScreen';
import HomeScreen from '../view/home/HomeScreen';
import NaviTabSreen from './NaviTabSreen';
const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({headerShown: false})}
        initialRouteName="SlashScreen">
        <Stack.Screen name="SlashScreen" component={SlashScreen} />
        <Stack.Screen name="OrboadScreen" component={OrboadScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={NaviTabSreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
