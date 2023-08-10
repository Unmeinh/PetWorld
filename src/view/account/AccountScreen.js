import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import React from 'react';
import HeaderAccount from '../account/HeaderAccount';
import TabLayout from './TabLayout';

export default function AccountScreen({ scrollRef, onScrollView, navigation }) {
  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
        <HeaderAccount nav={navigation} titleHeader="Account" colorHeader="#FF0000" />
        
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarStatusContainer}>
            <Image 
              style={styles.avatarImage}
              source={require('../account/avatar.png')} 
            />
            <Image style={styles.statusImage} source={require('../account/status.png')} />
          </View>

          <View style={styles.userInfoTextContainer}>
            <Text style={styles.userNameText}>Vergil. (Storm)</Text>
          </View>
        </View>
        
        <View style={styles.actionContainer}>
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>Nhắn tin</Text>
          </View>
         
          <View style={styles.actionButton}>
            <Image style={styles.checkImage} source={require('../account/check.png')} />
            <Text style={styles.actionText}>Đang theo dõi</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>2</Text>
            <Text style={styles.statsText}>Bài viết</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>2</Text>
            <Text style={styles.statsText}>Đang theo dõi</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>2</Text>
            <Text style={styles.statsText}>Người theo dõi</Text>
          </View>
        </View>
       <View style={styles.leftTextContainer}>
  <Text style={styles.leftText}>
    I am the storm that is approaching
    Provoking black clouds in isolation
    I am reclaimer of my name
    Born in flames, I have been blessed
  </Text>
</View>
<TabLayout/>

        
    
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  avatarStatusContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statusImage: {
    width: 10,
    height: 10,
    marginLeft: -20,
    marginTop: 70,
  },
  userInfoTextContainer: {
    marginLeft: 20,
    marginTop: 15,
  },
  userNameText: {
    color: '#001858',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 50,
    marginTop: -35,
  },
  userEmailText: {
    fontSize: 14,
    color: 'gray',
  },
  actionContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    paddingHorizontal: 20,
    marginTop: -50,
    marginLeft: 100,
  },
  actionButton: {
    flexDirection: 'row', 
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center', 
    marginRight: 10,
    marginLeft: 10,
  },
  actionText: {
    color: '#001858',
    fontSize: 16,
    color: 'gray',
    marginLeft: 5,
  },
  checkImage: {
    width: 10,
    height: 7.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Canh đều các cột
    paddingHorizontal: 20,
  },
  statsItem: {
    flex: 1, // Chia đều không gian cho mỗi cột
    alignItems: 'center', // Canh giữa theo chiều dọc
    paddingHorizontal: 10,
  
  },
  statsNumber: {
    color: '#001858',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsText: {
    fontSize: 14,
    color: '#001858',

  },
  leftTextContainer:{
    color: '#001858',
    margin:10,
   marginLeft:50,
    marginRight:100,
  },
  leftText:{
    color: '#001858',
  }
});
