import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderNotify from '../../component/header/HeaderNotify';
import TabLayout from '../../component/tabLayout/tabMain/TabLayoutNotify';
import {useIsFocused} from '@react-navigation/native';
import HeaderLogo from '../../component/header/HeaderLogo';
export default function NotifyScreen({navigation}) {
  const isFocused = useIsFocused();

  return (
    <View style={{backgroundColor: 'rgba(254, 246, 228, 0.90)', flex: 1}}>
      <HeaderLogo
        nav={navigation}
        titleHeader="Notify Screen"
        colorHeader="#FEF6E4"
      />
      <View style={styles.container}>
        <TabLayout isFocused={isFocused} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -13,
    marginBottom: 50,
  },
});
