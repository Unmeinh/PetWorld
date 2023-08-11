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
import ListProductScreen from '../view/shopping/ListProductScreen';
import NewPost from '../view/blog/NewBlog';
import DetailProduct from '../view/shopping/DetailProduct';
import NotifyScreen from '../view/notify/NotifyScreen';
import SettingNotify from '../view/notify/SettingNotify';
import AccountScreen from '../view/account/AccountScreen';
const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({headerShown: false})}
        initialRouteName="LoginScreen">
        <Stack.Screen name="SlashScreen" component={SlashScreen} />
        <Stack.Screen name="OrboadScreen" component={OrboadScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="NaviTabSreen" component={NaviTabSreen} />
        <Stack.Screen name="SearchFilters" component={SearchFilters} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ListProductScreen" component={ListProductScreen} />
        <Stack.Screen name="NewPost" component={NewPost} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="SettingNotify" component={SettingNotify} />
        <Stack.Screen name="NotifyScreen" component={NotifyScreen} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
