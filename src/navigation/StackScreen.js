import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SlashScreen from '../view/slashscreen/SlashScreen';
import OrboadScreen from '../view/orboardscreen/OrboadScreen';
import LoginScreen from '../view/form/LoginScreen';
import NaviTabScreen from './NaviTabScreen';
import SearchFilters from '../view/search/SearchFilters';
import ForgetPassword from '../view/form/ForgetPassword';
import ConfirmOTP from '../view/form/ConfirmOTP';
import ChangePassword from '../view/form/ChangePassword';
import RegisterPassword from '../view/form/RegisterPassword';
import ListProductScreen from '../view/shopping/ListProductScreen';
import NewBlog from '../view/blog/NewBlog';
import EditBlog from '../view/blog/EditBlog';
import DetailProduct from '../view/shopping/DetailProduct';
import ShopScreen from '../view/shopping/ShopScreen';
import MyPage from '../view/blog/MyPage';
import ViewPage from '../view/blog/ViewPage';
import ListFollow from '../view/blog/ListFollow';
import CartScreen from '../view/shopping/CartScreen';
import SummaryBill from '../view/shopping/SummaryBill';
import ListAddress from '../view/account/ListAddress';
import AddNewAddress from '../view/account/AddNewAddress';
import ChatScreen from '../view/chat/ChatScreen';
import InfoManager from '../view/blog/InfoManager';
import EditUser from '../view/blog/EditUser';
import EditAccount from '../view/blog/EditAccount';
import AppointmentScreen from '../view/appointment/AppointmentScreen';
import DetailAppointment from '../view/appointment/DetailAppointment';
import NotifyScreen from '../view/notify/NotifyScreen';
import AccountScreen from '../view/account/AccountScreen';
import InformationAccount from '../view/account/InformationAccount';
import Information from '../view/account/Information';
import NumberPhone from '../view/account/Numberphone';
import EmailVerification from '../view/account/EmailVerification';
import OderScreen from '../view/oder/OderScreen';
import PhoneVerification from '../view/account/PhoneVerification';
import Email from '../view/account/Email';
import { createStackNavigator } from '@react-navigation/stack';
import SettingNotify from '../view/notify/SettingNotify';
import MyPetScreen from '../view/account/MyPetScreen';
import { navigationRef } from './rootNavigation';
const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={() => ({ headerShown: false })}
        initialRouteName="SlashScreen">
        <Stack.Screen name="SlashScreen" component={SlashScreen} />
        <Stack.Screen name="OrboadScreen" component={OrboadScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="NaviTabScreen" component={NaviTabScreen} />
        <Stack.Screen name="SearchFilters" component={SearchFilters} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ListProductScreen" component={ListProductScreen} />
        <Stack.Screen name="NewBlog" component={NewBlog} />
        <Stack.Screen name="EditBlog" component={EditBlog} />
        <Stack.Screen
          name="DetailProduct"
          component={DetailProduct}
          options={{
            gestureEnabled: true,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 300 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          }}     
        />
        <Stack.Screen name="ShopScreen" component={ShopScreen} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="ViewPage" component={ViewPage} />
        <Stack.Screen name="ListFollow" component={ListFollow} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="SummaryBill" component={SummaryBill} />
        <Stack.Screen name="ListAddress" component={ListAddress} />
        <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="InfoManager" component={InfoManager} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
        <Stack.Screen name="DetailAppointment" component={DetailAppointment} />
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
        <Stack.Screen name="MyPetScreen" component={MyPetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}