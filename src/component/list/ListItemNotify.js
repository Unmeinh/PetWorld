import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {getDateTimeVietnamese} from '../../function/functionDate';
const {width, height} = Dimensions.get('window');
const ListItem = ({item, callBack}) => {
  return (
    <TouchableOpacity onPress={() => callBack(item, true)}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={require('../../assets/ic_launcher.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.middleContainer}>
          {/* <View style={styles.header}>
          </View> */}
            <Text style={styles.title} numberOfLines={1}>{item?.content}</Text>
          <Text style={styles.content} numberOfLines={2}>
            {item?.detail}
          </Text>
          <View style={styles.timeContainer}>
            <Feather name="clock" size={13} color={'rgba(0, 0, 0, 0.65)'} />
            <Text style={styles.time} numberOfLines={1}>
              {getDateTimeVietnamese(item?.createdAt)} 
            </Text>
          </View>
        </View>
        {/* <View style={styles.rightContainer}>
          <Feather name="more-horizontal" size={30} color={'#001858'} />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF6E490',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    borderRadius: 10,
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
    marginTop: 2,
    width: 40, // Chiều rộng cố định
    marginLeft: 10,
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
  },
  image: {
    width: 40,
    height: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    fontSize: 10,
    marginLeft: 4,
    color: 'rgba(0, 0, 0, 0.65)',
    fontFamily: 'ProductSans',
  },
  content: {
    marginVertical: 3,
    fontSize: 14,
    color: 'black',
    color: '#001858',
    fontFamily: 'ProductSans',
  },

  modalContainer: {
    backgroundColor: 'rgba(254, 246, 228,1)',
    flex: 1,
    position: 'absolute',
    width: width,
    height: height,

    top: -20,
    bottom: -20,
    left: -20,
    right: 0,
    padding: 10,
  },
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#001858',
    fontFamily: 'ProductSans',
    marginLeft: 5,
  },
  modalContent: {
    fontSize: 18,
    margin: 5,
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  modalDetail: {
    fontSize: 15,
    margin: 5,
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  timeModal: {
    marginLeft: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  modalTime: {
    fontSize: 17,
    marginLeft: 10,
    color: '#001858',
    fontFamily: 'ProductSans',
    alignItems: 'center',
    alignContent: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#F582AE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center', // Canh giữa theo chiều ngang
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#001858',
    fontSize: 16,
    fontFamily: 'ProductSans',
    alignContent: 'center',
  },
});

export default ListItem;
