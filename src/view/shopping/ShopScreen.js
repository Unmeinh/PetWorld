import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
export default function ShopScreen({navigation, route}) {
  const data = route.params.data;
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-back" size={26} color="#001858" />
          </Pressable>
          <Pressable style={styles.headerSearch}>
            <Icon name="search" size={26} color="#001858" />
            <Text>Tìm kiếm trong cửa hàng</Text>
          </Pressable>
          <Icon name="cart-outline" size={26} color="#001858" />
        </SafeAreaView>
        <View style={styles.tagShop}>
          <Image source={data.avatar} style={styles.image} />
          <View style={styles.titleShop}>
            <View style={styles.flexRow}>
              <Text style={styles.textShop}>{data.nameShop}</Text>
              <Icon name="chevron-forward" size={20} color={'#001858'} />
            </View>
            <View style={[styles.flexRow, styles.content]}>
              <View style={[styles.flexRow, {marginRight: 10}]}>
                <Icon name="star" size={16} color={'#FFC20F'} />
                <Text>{data.rate}</Text>
              </View>
              <Text style={{fontFamily: 'ProductSans'}}>
                Đã bán {data.quantity}
              </Text>
            </View>
          </View>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Trò chuyện</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textButton: {fontFamily: 'ProductSans', color: '#F582AE'},
  button: {
    width: 100,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#F582AE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 8,
  },
  textShop: {
    fontSize: 18,
    fontFamily: 'ProductSansBold',
    color: '#001858',
  },
  titleShop: {
    flexGrow: 1,
    marginLeft: 10,
  },
  tagShop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 14,
    alignItems: 'center',
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 36,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  container: {
    backgroundColor: '#FEF6E4',
    flex: 1,
  },
  headerSearch: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(176, 174, 175,0.6)',
    marginHorizontal: 10,
    height: 38,
    paddingHorizontal: 10,
  },
});
