import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import { fetchNotices } from '../../../redux/reducers/notice/NoticeReducer';
import { useSelector, useDispatch } from 'react-redux';
import { listNotice } from '../../../redux/selector';

export default function YourComponent() {

  const dispatch = useDispatch();
  const notices = useSelector(listNotice);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    dispatch(fetchNotices()).then(() => {
      setDataReady(true);
    });
  }, []);
  
  // Giả sử bạn đã lấy dữ liệu từ máy chủ và gán vào biến responseData
  // const responseData = {
  //   "data": [],
  //   "message": "",
  //   "notices": [
  //     {
  //       "__v": 0,
  //       "_id": "64fe7748a33f79c51fc62a43",
  //       "content": "chào bạn",
  //       "createdAt": "2023-09-11T02:11:20.473Z",
  //       "detail": "detail neeeeeeeeeee",
  //       "idUser": [Object],
  //       "image": [Array],
  //       "status": 2
  //     },
  //     {
  //       "__v": 0,
  //       "_id": "64fe7748a33f79c51fc62a43",
  //       "content": "chào bạn",
  //       "createdAt": "2023-09-11T02:11:20.473Z",
  //       "detail": "detail neeeeeeeeeee",
  //       "idUser": [Object],
  //       "image": [Array],
  //       "status": 2
  //     },

  //   ],
  //   "status": "idle"
  // };
  
  // Cập nhật state data với dữ liệu từ máy chủ khi component được tạo
  // useEffect(() => {
  //   setData(responseData.notices);
  // }, []);

  // Hàm render cho mỗi mục trong FlatList
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.container1}>{item.content}</Text>
      <Text style={styles.container1}>{item.detail}</Text>
      {/* Các thông tin khác */}
    </View>
  );

  return (
    <View>
      <FlatList
        data={notices}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FEF6E490',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    borderRadius:10,
  },
  container1:{
    color:'red',
  }

});
