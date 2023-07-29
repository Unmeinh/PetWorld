import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SlashScreen from '../view/slashscreen/SlashScreen';
import OrboadScreen from '../view/orboardscreen/OrboadScreen';
import LoginScreen from '../view/form/LoginScreen';
import NaviTabSreen from './NaviTabSreen';
import SearchFilters from '../view/search/SearchFilters';
import ForgetPassword from '../view/form/ForgetPassword';
import ConfirmOTP from '../view/form/ConfirmOTP';
import ChangePassword from '../view/form/ChangePassword';

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
        <Stack.Screen name="NaviTabSreen" component={NaviTabSreen} />
        <Stack.Screen name="SearchFilters" component={SearchFilters} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
