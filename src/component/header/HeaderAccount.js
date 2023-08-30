import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

export default function HeaderBlog() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftHeader}>
        <Image style={styles.avatarImage} source={require('../../assets/images/logoApp/logo.png')} />
      </View>
      <View style={styles.centerHeader}>
      <Text style={styles.nameAccount}>Vergil.</Text>
       <View  style={styles.centerFlow}>
       <Text style={styles.textFlow}>Người theo dõi 11</Text>
       <Text style={styles.textFlow}>|</Text>
        <Text style={styles.textFlow}> Đang theo dõi 11</Text>
       </View >
        <Text style={styles.nameText}>Xem trang cá nhân</Text>
      </View>
      <View >
     <View style={styles.rightHeader} >
     <Feather 
     style={styles.rightHeaderIcon}
     name='settings' size={24} color={'#001858'} />
      <Feather 
      style={styles.rightHeaderIconCart}
      name='shopping-cart' size={24} color={'#001858'} />
     </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Xếp hàng ngang
    alignItems: 'center', // Canh giữa theo chiều dọc
    backgroundColor: '#F582AE',
  
    padding:20,
  },

  centerHeader:{
    marginLeft:10,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 22.5,
  },
  nameContainer: {
    flex: 1, // Chia đều không gian còn lại
    marginRight: 10,
  },
  centerFlow:{
    flexDirection: 'row', // Xếp hàng ngang
    alignItems: 'center',
  },
  rightHeader:{
    flexDirection: 'row', // Xếp hàng ngang
    alignItems: 'top',
    marginLeft:10,
    marginTop:-30,
  },
  nameAccount:{
    fontWeight: 'bold',
    marginLeft:5,
    marginTop:5,
    fontSize: 20,
    color: '#001858',
  },
  nameText: {
    marginLeft:5,
    marginTop:5,
    fontSize: 15,
  
    color: '#001858',
  },
  textFlow:{
    marginLeft :5,
    fontSize: 12,
    color: '#001858',
  },
  rightHeaderIcon:{
   
  },
  rightHeaderIconCart:{
    marginLeft:10,
  },
  pngContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center', // Canh giữa theo chiều dọc
    alignItems: 'center', // Canh giữa theo chiều ngang
  },
  pngImage: {
    color:'black',
    width: 50,
    height: 50,
    fontSize:30,
  },
});
