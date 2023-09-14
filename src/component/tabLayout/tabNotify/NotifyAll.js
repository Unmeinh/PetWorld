// Tab1.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ListItem from '../../list/ListItemNotify';

const Tab1 = ({ notices }) => { 
  const renderItem = ({ item }) => <ListItem item={item} notices={notices} />;

  // console.log("Notices in Tab1:", notices);


  return (
    <View style={styles.container}>
      <FlatList
        data={notices}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    borderRadius: 10,
  },
});

export default Tab1;
