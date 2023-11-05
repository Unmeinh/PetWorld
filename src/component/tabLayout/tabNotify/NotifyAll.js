import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import { fetchNotices } from '../../../redux/reducers/notice/NoticeReducer';
import { useSelector, useDispatch } from 'react-redux';
import { listNotice } from '../../../redux/selector';

const NotifyAll = () => {
  const dispatch = useDispatch();
  const notices = useSelector(listNotice);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    dispatch(fetchNotices()).then(() => {
      setDataReady(true);
    });
  }, []);
  console.log("Notices TabLayout:", notices);
  // Hàm render item
  const renderItem = ({ item }) => {
    console.log("Hàm renderItem được gọi."); // Thêm dòng này để kiểm tra
    return (
      <View style={styles.item}>
        <Text>{item.detail}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
    {dataReady ? (
      <FlatList
        data={notices}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => (
          <View>
            <Text>Không có thông báo nào.</Text>
          </View>
        )}
      />
    ) : (
      <ActivityIndicator /> 
    )}
  </View>
  );
};

const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 10,
    
//   },
//   item: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EAEAEA',
//     padding: 10,
//     fontSize:20,
//   },
});

export default NotifyAll;