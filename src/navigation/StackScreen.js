import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
import InformationAccount from '../view/account/InformationAccount';
import Information from '../view/account/Information';
import NumberPhone from '../view/account/Numberphone';
import EmailVerification from '../view/account/EmailVerification';
import OderScreen from '../view/oder/OderScreen';
import PhoneVerification from '../view/account/PhoneVerification';
import Email from '../view/account/Email';
const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({ headerShown: false })}
        initialRouteName="SlashScreen">
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
        <Stack.Screen name="OderScreen" component={OderScreen} />
        <Stack.Screen name="InformationAccount" component={InformationAccount} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="NumberPhone" component={NumberPhone} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
