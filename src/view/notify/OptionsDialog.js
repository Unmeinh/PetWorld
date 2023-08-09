import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionsDialog = ({ isVisible, onCloseDialog }) => {
    console.log('OptionsDialog isVisible:', isVisible);
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => console.log('Đánh dấu đã đọc')}>
        <Text>Đánh dấu đã đọc</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => console.log('Xóa thông báo')}>
        <Text>Xóa Thông báo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={onCloseDialog}>
        <Text>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
  },
  option: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
});

export default OptionsDialog;
