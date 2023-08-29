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
import ShopScreen from '../view/shopping/ShopScreen';
import MyPage from '../view/blog/MyPage';
import ViewPage from '../view/blog/ViewPage';
import ListFollow from '../view/blog/ListFollow';
import CartScreen from '../view/shopping/CartScreen';
import SummaryBill from '../view/shopping/SummaryBill';
import ListAddress from '../view/account/ListAddress';
import AddNewAddress from '../view/account/AddNewAddress';
import ChatScreen from '../view/chat/ChatScreen';
import test from '../view/appointment/test';
import InfoManager from '../view/blog/InfoManager';
import EditInfo from '../view/blog/EditInfo';
import AppointmentScreen from '../view/appointment/AppointmentScreen';
import DetailAppointment from '../view/appointment/DetailAppointment';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
const Stack = createSharedElementStackNavigator();

export default function StackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({ headerShown: false })}
        initialRouteName="NewPost">
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
          sharedElements={route => {
            const { id } = route.params.item;
            const objAni = (feild, animation = 'fade-in', resize = 'clip') => {
              return {
                id: `item.${id}.${feild}`,
                animation: animation,
                resize: resize,
              }
            };
            return [objAni('image'), objAni('name'), objAni('price'), objAni('rate')];
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
        <Stack.Screen name="EditInfo" component={EditInfo} />
        <Stack.Screen name="test" component={test} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
        <Stack.Screen name="DetailAppointment" component={DetailAppointment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}