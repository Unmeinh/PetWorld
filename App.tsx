import React from 'react';
import StackScreen from './src/navigation/StackScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ToastLayout} from './src/component/layout/ToastLayout';
import pushNotification from './src/services/pushNotification';
// import {useAppState} from '@react-native-community/hooks'

// const currentAppState = useAppState()
pushNotification.backGroundHandle();
pushNotification.notifeeBackGroundEvent();

export default function App() {
  return (
    <Provider store={store}>
      <StackScreen />
      <ToastLayout />
    </Provider>
  );
}
