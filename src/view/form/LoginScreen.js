import {
  View
} from 'react-native';
import React, { useState } from 'react';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';

export default function LoginScreen() {
  const [selectedTab, setselectedTab] = useState(0);
  const [inputUsername, setinputUsername] = useState("");

  function onCallBackChangeTab(userName) {
    setinputUsername(userName);
    if (selectedTab == 0) {
      setselectedTab(1);
    } else {
      setselectedTab(0);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {
        (selectedTab == 0)
          ? <LoginTab callback={onCallBackChangeTab} user={inputUsername} />
          : <RegisterTab callback={onCallBackChangeTab} user={inputUsername}/>
      }

    </View>
  );
}
