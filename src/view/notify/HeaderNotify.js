import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SettingNotify from './SettingNotify';

import { Modal } from 'react-native';

export default function HeaderNotify({ nav, titleHeader, colorHeader }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigateToSettingNotify = () => {
    nav.navigate('SettingNotify');
  };

  const toggleModal = () => {
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
      <TouchableOpacity onPress={() => { nav.goBack() }}>
        <AntDesign name='arrowleft' size={30} color={'#001858'} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          color: '#001858',
          fontFamily: 'ProductSans',
          fontWeight: 'bold',
          marginLeft: 20,
        }}
      >
        {titleHeader}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={require('../../assets/image/iconHeader/double_check.png')} style={{ marginRight: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToSettingNotify}>
        <Image source={require('../../assets/image/iconHeader/setting.png')} style={{ marginLeft: 5 }} />
      </TouchableOpacity>
      </View>

      {/* React Native Modal */}
      {/* <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text>dax doc</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    color: 'red',
    marginTop: 10,
  },
});
