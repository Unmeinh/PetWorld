import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import BillScreen from '../view/Bills/BillScreen';
import PhoneVerification from '../view/account/PhoneVerification';
import Email from '../view/account/Email';
import {createStackNavigator} from '@react-navigation/stack';
import SettingNotify from '../view/notify/SettingNotify';
import MyPetScreen from '../view/account/MyPetScreen';
import {navigationRef} from './rootNavigation';
import BuyNowScreen from '../view/shopping/BuyNowScreen';
import DetailBill from '../view/shopping/DetailBill';
import MomoPayment from '../view/payment/MomoPayment';
import Favorite from '../view/account/Favorite';
const Stack = createStackNavigator();

export default function StackScreen() {
  const animated = {
    gestureEnabled: false,
    transitionSpec: {
      open: {animation: 'timing', config: {duration: 300}},
      close: {animation: 'timing', config: {duration: 300}},
    },
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={() => ({headerShown: false})}
        initialRouteName="SlashScreen">
        <Stack.Screen
          name="SlashScreen"
          component={SlashScreen}
          options={animated}
        />
        <Stack.Screen
          name="OrboadScreen"
          component={OrboadScreen}
          options={animated}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={animated}
        />
        <Stack.Screen
          name="NaviTabScreen"
          component={NaviTabScreen}
          options={animated}
        />
        <Stack.Screen
          name="SearchFilters"
          component={SearchFilters}
          options={animated}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={animated}
        />
        <Stack.Screen
          name="RegisterPassword"
          component={RegisterPassword}
          options={animated}
        />
        <Stack.Screen
          name="ConfirmOTP"
          component={ConfirmOTP}
          options={animated}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={animated}
        />
        <Stack.Screen
          name="ListProductScreen"
          component={ListProductScreen}
          options={animated}
        />
        <Stack.Screen name="NewBlog" component={NewBlog} options={animated} />
        <Stack.Screen name="EditBlog" component={EditBlog} options={animated} />
        <Stack.Screen
          name="DetailProduct"
          component={DetailProduct}
          options={animated}
        />
        <Stack.Screen
          name="ShopScreen"
          component={ShopScreen}
          options={animated}
        />
        <Stack.Screen name="MyPage" component={MyPage} options={animated} />
        <Stack.Screen name="ViewPage" component={ViewPage} options={animated} />
        <Stack.Screen
          name="ListFollow"
          component={ListFollow}
          options={animated}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={animated}
        />
        <Stack.Screen
          name="SummaryBill"
          options={animated}
          component={SummaryBill}
        />
        <Stack.Screen
          name="ListAddress"
          options={animated}
          component={ListAddress}
        />
        <Stack.Screen
          name="AddNewAddress"
          options={animated}
          component={AddNewAddress}
        />
        <Stack.Screen
          name="ChatScreen"
          options={animated}
          component={ChatScreen}
        />
        <Stack.Screen
          name="InfoManager"
          options={animated}
          component={InfoManager}
        />
        <Stack.Screen name="EditUser" component={EditUser} options={animated} />
        <Stack.Screen
          name="EditAccount"
          options={animated}
          component={EditAccount}
        />
        <Stack.Screen
          name="AppointmentScreen"
          options={animated}
          component={AppointmentScreen}
        />
        <Stack.Screen
          name="DetailAppointment"
          options={animated}
          component={DetailAppointment}
        />
        <Stack.Screen
          name="SettingNotify"
          options={animated}
          component={SettingNotify}
        />
        <Stack.Screen
          name="NotifyScreen"
          options={animated}
          component={NotifyScreen}
        />
        <Stack.Screen
          name="AccountScreen"
          options={animated}
          component={AccountScreen}
        />
        <Stack.Screen
          name="BillScreen"
          options={animated}
          component={BillScreen}
        />
        <Stack.Screen
          name="InformationAccount"
          options={animated}
          component={InformationAccount}
        />
        <Stack.Screen
          name="Information"
          options={animated}
          component={Information}
        />
        <Stack.Screen
          name="NumberPhone"
          options={animated}
          component={NumberPhone}
        />
        <Stack.Screen
          name="PhoneVerification"
          options={animated}
          component={PhoneVerification}
        />

        <Stack.Screen name="Email" component={Email} options={animated} />
        <Stack.Screen
          name="EmailVerification"
          options={animated}
          component={EmailVerification}
        />
        <Stack.Screen
          name="MyPetScreen"
          options={animated}
          component={MyPetScreen}
        />
        <Stack.Screen
          name="BuyNow"
          options={animated}
          component={BuyNowScreen}
        />
        <Stack.Screen
          name="DetailBill"
          options={animated}
          component={DetailBill}
        />
        <Stack.Screen
          name="MomoPayment"
          options={animated}
          component={MomoPayment}
        />
        <Stack.Screen name="Favorite" options={animated} component={Favorite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
