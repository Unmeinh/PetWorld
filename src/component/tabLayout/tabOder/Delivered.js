import React from 'react';
import { View, Text, FlatList, Image,StyleSheet } from 'react-native';
import ListItem from '../../list/ListItemOder';

const data = [
  {
    id: '1',
    namePrd: 'Bóng bay',
    distance:' Khoảng cách :0.5km',
    intomoney:'Thành tiền : 44.000.000.000',
    // image: require('../../assets/image/product/demo1.png'),
    endow:'Uu đãi lên đến 100k',
    quatity:'số lượng : 11',
    status:'Chờ xác nhận',
    detailedStatus:'Đơn hàng đang chờ xác nhận',
    price:'4.000.000',
    cost:'4.500.000',
  },
  
];


const Delivered = () => {
  // Render item for FlatList
const renderItem = ({ item }) => <ListItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
     padding:10,
      flex: 1,// Add a border of 10
      borderRadius:10,// Border color can be changed to your desired color
    },
  });
  

export default Delivered;
