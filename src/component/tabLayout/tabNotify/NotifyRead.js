import React from 'react';
import { View, Text, FlatList, Image,StyleSheet } from 'react-native';
import ListItem from '../../list/ListItemNotify';

const data = [
  {
    id: '1',
    title: 'Cho thú cưng ăn',
    content: 'Đến lúc thú cưng ăn rồi! Hãy sẵn sàng thức ăn và nước cho thú cưng của bạn.',
    time: '10:00 AM',
    image: require('../../assets/image/logoApp/logo.png'),// Replace with actual image source
  },
  {
    id: '2',
    title: 'Cho thú cưng ăn',
    content: 'Đến lúc thú cưng ăn rồi! Hãy sẵn sàng thức ăn và nước cho thú cưng của bạn.',
    time: '11:30 AM',
    image: require('../../assets/image/logoApp/logo.png'),// Replace with actual image source
  },
  {
    id: '3',
    title: 'Cho thú cưng ăn',
    content: 'Đến lúc thú cưng ăn rồi! Hãy sẵn sàng thức ăn và nước cho thú cưng của bạn.',
    time: '02:45 PM',
    image: require('../../assets/image/logoApp/logo.png'),
    // Replace with actual image source
  },
  // Add more items as needed
];

const Tab3 = () => {
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
      flex: 1,
      borderRadius:10,
     
    },
  });
  

export default Tab3;
