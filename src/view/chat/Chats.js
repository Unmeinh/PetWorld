import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import data from '../../data/listUser';
export default function Chats({navigation}) {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatScreen',{item})}
        style={styles.item}>
        <View>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          <View style={styles.dotAvatar} />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>Bạn: Hello sir</Text>
        </View>
        <View style={styles.dotMessage} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <Pressable style={styles.buttonSearch}>
        <Icon name="search" size={24} color="#474747" />
        <Text style={styles.textButton}>Tìm kiếm</Text>
      </Pressable>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    fontFamily: 'ProductSans',
    color: '#7e827d',
  },
  name: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
    fontSize: 16,
  },
  dotMessage: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F582AE',
  },
  content: {flexGrow: 1, marginLeft: 10, justifyContent: 'center'},
  dotAvatar: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3efc21',
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  item: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {width: 60, height: 60, borderRadius: 30},
  textButton: {fontSize: 15, fontFamily: 'ProductSansBold', color: '#474747'},
  buttonSearch: {
    flexDirection: 'row',
    backgroundColor: '#d1cfcf',
    height: 35,
    marginHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    padding: 4,
    marginTop: 8,
  },
  header: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'ProductSansBold',
    fontSize: 20,
    color: '#001858',
  },
  container: {
    flex: 1,
    backgroundColor: '#FEF6E4',
  },
});
