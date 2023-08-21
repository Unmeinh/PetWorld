import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ListTicket({data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phiếu giảm giá</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const iconName = item.isSelect
            ? 'checkbox-blank-circle-outline'
            : 'check-circle';
          return (
            <View>
              <Image
                source={require('../../assets/images/BackgroudTicket.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.level}>{item.level}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.checkBox}>
                <Icon name={iconName} size={24} color="#F582AE" />
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.dontDiscount}>
        <Text style={styles.textDiscount}>Không sử dụng mã giảm giá</Text>
        <Icon name="checkbox-blank-circle-outline" size={24} color="#F582AE" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  textDiscount: {
    fontFamily: 'ProductSans',
    color: '#001858',
    fontSize: 14,
  },
  dontDiscount: {
    marginHorizontal: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    marginTop: 14,
  },

  checkBox: {
    position: 'absolute',
    right: 30,
    top: 50,
  },
  time: {
    fontFamily: 'ProductSans',
    color: '#F582AE',
    fontSize: 14,
    marginTop: 5,
  },
  level: {
    fontFamily: 'ProductSans',
    color: '#001858',
    fontSize: 14,
    width: 300,
    marginTop: 6,
  },
  name: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
    fontSize: 16,
  },
  content: {
    position: 'absolute',
    left: 30,
    top: 20,
  },
  image: {
    marginLeft: 15,
    marginTop: 8,
  },
  title: {
    fontFamily: 'ProductSansBold',
    fontSize: 15,
    marginLeft: 15,
    marginTop: 10,
    color: '#001858',
  },
});
