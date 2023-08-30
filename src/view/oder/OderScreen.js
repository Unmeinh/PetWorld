import React, { useEffect } from 'react';
import { View, Button,StyleSheet } from 'react-native';
import HeaderTitleAccount from '../../component/header/HeaderTitleAccount';
import TabLayoutOder from '../../component/tabLayout/tabMain/TabLayoutOder';


export default function OderScreen({ navigation }) {
 

  return (
    <View style={{ backgroundColor: 'rgba(254, 246, 228, 0.90)', flex: 1 }}>
      <HeaderTitleAccount nav={navigation} titleHeader="Đơn mua" colorHeader="#FEF6E4" />
     <View style={styles.container}>
     <TabLayoutOder 
       />
     </View>
      {/* <Button title="Gửi Token lên Firebase" onPress={sendTokenToFirebase} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:-13,
  }
});
