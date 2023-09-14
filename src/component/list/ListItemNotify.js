
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Image,  Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchNotices } from '../../redux/reducers/notice/NoticeReducer';
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID, userSelectStatus } from '../../redux/selectors/userSelectStatus';
import { listNotice } from '../../redux/selector';
const {width, height} = Dimensions.get('window');
const ListItem = ({ item }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  
  const dispatch = useDispatch();
  const notices = useSelector(listNotice);
  useEffect(() => {
    dispatch(fetchNotices());
  }, []);
  console.log("Notices in ListItem:", notices);
  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  return (
    <TouchableOpacity onPress={toggleDialog}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={notices.image} style={styles.image} />
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{notices.content}</Text>
            <View style={styles.timeContainer}>
              <Feather name='clock' size={13} color={'#001858'} />
              <Text style={styles.time}>{notices.time}</Text>
            </View>
          </View>
          <Text style={styles.content}>{notices.content}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Feather name='more-horizontal' size={30} color={'#001858'} />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDialogVisible}
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        animationOutTiming={800}
        animationInTiming={800}
        onRequestClose={toggleDialog}
        onBackButtonPress={() => {
          setIsVisibleModal(!isVisibleModal);
        }}
      >
        
        <View style={styles.modalContainer}>
          <ScrollView>
          <Icon onPress={toggleDialog} name="close" size={26} color="#999793" />
          <View style={styles.middleContainer}>
          <View style={styles.header}>
            <Text style={styles.titleModal}>{item.title}</Text>
            <View style={styles.timeModal}>
              <Feather name='clock' size={24} color={'#001858'} />
              <Text style={styles.modalTime}>{item.time}</Text>
            </View>
          </View>
          <Text style={styles.modalContent}>{item.content}</Text>
        </View>
          <Text style={styles.modalDetail}>{item.detail}</Text>
          
          <Image source={item.image} style={styles.modalImage} />
          <Text
          style={{
            color: '#001858',
            fontFamily: 'ProductSans',
          }}>
            From PertWord with love 😘
          </Text>
          

          <TouchableOpacity onPress={toggleDialog} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
          </ScrollView>
       
        </View>
      </Modal>
    </TouchableOpacity>
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
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
    width:180,
      color: '#001858',
      fontFamily: 'ProductSans',

  },
  timeContainer: {
   

    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    fontSize: 13,
    color: 'black',
    color: '#001858',
      fontFamily: 'ProductSans',
  },
  content: {
    fontSize: 14,
    color: 'black',
    color: '#001858',
      fontFamily: 'ProductSans',
  },



  modalContainer: {
    backgroundColor:'rgba(254, 246, 228,1)',
            flex: 1,
            position: 'absolute',
            width: width,
            height: height,
           
            top: -20,
            bottom: -20,
            left: -20,
            right: 0,
            padding:10,

  },
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#001858',
    fontFamily: 'ProductSans',
    marginLeft:5,
  },
  modalContent: {
    fontSize: 18,
margin:5,
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  modalDetail:{
    fontSize: 15,
    margin:5,
        color: '#001858',
        fontFamily: 'ProductSans',
  },
  timeModal:{
    marginLeft:50,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  
  modalTime: {
    fontSize: 17,
    marginLeft:10,
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
    marginTop:100,
    marginBottom:20,
  },
  closeButtonText: {
    color: '#001858',
    fontSize: 16,
    fontFamily: 'ProductSans',
    alignContent : 'center',
  },
});

export default ListItem;
