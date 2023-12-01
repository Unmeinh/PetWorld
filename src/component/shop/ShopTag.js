import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ShimmerPlaceHolder from '../layout/ShimmerPlaceHolder';
import {useNavigation} from '@react-navigation/native';
import IconIcons from 'react-native-vector-icons/Ionicons';

export default function ShopTag({data, isLoading}) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.tagContainer}>
        {isLoading === 'idle' ? (
          <View style={styles.img}>
            <Image source={{uri: data?.avatarShop}} style={styles.img} />
            {data?.status ? <View style={styles.dot} /> : null}
          </View>
        ) : (
          <ShimmerPlaceHolder shimmerStyle={styles.img} />
        )}
        {isLoading === 'idle' ? (
          <Text style={styles.title}>
            {data?.nameShop}
            {'\n'}
            <Text style={styles.titleDes}>
              {data?.status ? 'Đang hoạt động' : 'Offline'}
            </Text>
            {'\n'}
            <Icon name="location-pin" size={16} color="#656565" />
            <Text style={styles.titleDes}> {data?.locationShop}</Text>
          </Text>
        ) : (
          <ShimmerPlaceHolder shimmerStyle={styles.title} />
        )}
        {isLoading === 'idle' ? (
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('ShopScreen', {data});
            }}>
            <Text style={styles.titleButton}>Xem Shop</Text>
          </Pressable>
        ) : null}
      </View>
      {isLoading === 'idle' ? (
        <View style={styles.desContainer}>
          <Text style={styles.textDes}>
            {data?.quantity}{' '}
            <Text style={styles.textDes2}>Sản phẩm {data?.count}</Text>
          </Text>
          <Text style={styles.textDes}>
            {data?.rate}{' '}
            <Text style={styles.textDes2}>
              Đánh giá {data?.avgRating?.toFixed(1)}
            </Text>
            <IconIcons name="star-sharp" size={16} color="#fcba03" />
          </Text>
        </View>
      ) : (
        <ShimmerPlaceHolder shimmerStyle={styles.title} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  dot: {
    width: 14,
    height: 14,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 3,
    right: 3,
    borderRadius: 7,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  title: {
    fontFamily: 'ProductSans',
    color: '#001858',
    flexGrow: 1,
    marginLeft: 5,
    lineHeight: 21,
    fontSize: 16,
    borderRadius: 20,
  },
  button: {
    width: 90,
    height: 30,
    borderWidth: 1,
    borderColor: '#F582AE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  titleButton: {
    fontFamily: 'ProductSans',
    color: '#F582AE',
  },
  titleDes: {
    color: '#656565',
    fontSize: 13,
  },
  desContainer: {
    flexDirection: 'row',
    marginLeft: 18,
    marginTop: -8,
    alignItems: 'center',
  },
  textDes: {
    fontFamily: 'ProductSans',
    color: '#F582AE',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDes2: {
    color: '#3E3E3E',
    marginLeft: 8,
  },
});
