import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotices } from '../../redux/reducers/notice/NoticeReducer';
import { listNotice } from '../../redux/selector';
const { width, height } = Dimensions.get('window');

export default function HeaderNotify({ titleHeader, colorHeader }) {
  const [isPressed, setIsPressed] = useState(false);
  // const dispatch = useDispatch();
  // const notices = useSelector(listNotice);

  // useEffect(() => {
  //   console.log('Dữ liệu đã update từ Redux:', notices);
  // }, [notices]);

  const navigation = useNavigation();
  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      navigation.navigate('SettingNotify');
    }, 200); // Reset the state after 200ms
  };
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
   
    dispatch(updateNotices());
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={{
        backgroundColor: '#F582AE',
        padding: 20,
        flexDirection: 'row',
        paddingBottom: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
        shadowColor: '#000',
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: '#001858',
          fontFamily: 'ProductSans',
          fontWeight: 'bold',
          marginLeft: 100,
        }}
      >
        Thông báo
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name='checkmark-done' size={24} color={'#001858'} style={{ marginRight: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name='settings-outline' size={24} color={'#001858'} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={{ color: '#001858', fontFamily: 'ProductSans', marginBottom: 20, alignItems: 'center' }}>
            Đánh dấu tất cả thông báo đã đọc thành công
          </Text>
          {/* Add your settings options here */}
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={{ color: 'red', fontSize: 16 }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(254, 246, 228, 0.90)',
    padding: 22,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 5,
    alignItems: 'center',
  },
});
