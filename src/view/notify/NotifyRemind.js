import React from 'react';
import { View, Text, FlatList, Image,StyleSheet } from 'react-native';
import ListItem from './ListItem';

const data = [
  {
    id: '1',
    title: 'Item 1',
    content: 'Content of Item 1Content of Item 1Content of Item 1Content of Item 1Content of Item 1',
    time: '10:00 AM',
    image: require('../../assets/image/logoApp/footPrint.png'), // Replace with actual image source
  },
  {
    id: '2',
    title: 'Item 2',
    content: 'Content of Item 2',
    time: '11:30 AM',
    image: require('../../assets/image/logoApp/footPrint.png'), // Replace with actual image source
  },
  {
    id: '3',
    title: 'Item 3',
    content: 'Content of Item 3',
    time: '02:45 PM',
    image: require('../../assets/image/logoApp/footPrint.png'),
    // Replace with actual image source
  },
  // Add more items as needed
];

const Tab2 = () => {
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
  

export default Tab2;
