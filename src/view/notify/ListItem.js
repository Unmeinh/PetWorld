
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ListItem = ({ item }) => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    return (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
      <Image source={item.image} style={styles.image} />
    </View>
    <View style={styles.middleContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.timeContainer}>
          <Image source={require('../../assets/image/iconHeader/clock.png')} style={styles.clockImage} />
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>
    </View>
    <View style={styles.rightContainer}>
      <Image source={require('../../assets/image/iconHeader/more.png')}  />
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FEF6E490',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    borderRadius:10,
  },
  leftContainer: {
    width: 40, // Chiều rộng cố định
    marginRight: 10,
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
  },
  middleContainer: {
    flex: 1,
  },
  rightContainer: {
    marginTop:2,
    width: 40, // Chiều rộng cố định
    marginLeft: 10,
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
  },
  image: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  timeContainer: {
    marginLeft: 120, 

    flexDirection: 'row',
    alignItems: 'center',
  },
  clockImage: {
    width: 10,
    height: 10,
    marginRight: 5, // Cách đồng hồ 15px
  },
  time: {
    fontSize: 10,
    color: 'black',
  },
  content: {
    fontSize: 12,
    color: 'black',
  },
});

export default ListItem;
