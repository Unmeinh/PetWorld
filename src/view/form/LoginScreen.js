import {
  Image, Text, View,
  TouchableHighlight
} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles/form.style';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';

export default function LoginScreen({ navigation }) {
  const [selectedTab, setselectedTab] = useState(0);

  function onCallBackChangeTab() {
    if (selectedTab == 0) {
      setselectedTab(1);
    } else {
      setselectedTab(0);
    }
  }

  return (
    <View style={{flex: 1}}>
      {
        (selectedTab == 0)
        ? <LoginTab callback={onCallBackChangeTab} nav={navigation}/>
        : <RegisterTab callback={onCallBackChangeTab}/>
      }
      
    </View>
  );
}
