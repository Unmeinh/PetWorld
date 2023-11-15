import React, {useState} from 'react';
import {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {getDateTimeVietnamese} from '../../function/functionDate';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const ListItem = ({item, callBack}) => {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const handleLike = like ? 'heart-outline' : 'heart';
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <SharedElement id={`item.${item.id}.price`}>
          <Text style={styles.price}>
            {(price - (price * discount) / 100).toLocaleString('vi-VN') + 'đ'}{' '}
            <Text style={styles.discount}>
              {price.toLocaleString('vi-VN') + 'đ'}
            </Text>
          </Text>
        </SharedElement>
      );
    } else {
      return (
        <SharedElement id={`item.${item.id}.price`}>
          <Text style={styles.price}>
            {price?.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </SharedElement>
      );
    }
  };
  const { status, data: favoriteData } = useSelector((state) => state.listFavorite);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);
  const handleDeleteFavorite = (favoriteId) => {
    dispatch(deleteFavorite(favoriteId));
  };
  const discountShow = discount => {
    if (discount > 0) {
      return (
        <Text
          style={{
            fontFamily: 'ProductSansBold',
            fontSize: 12,
            color: '#F582AE',
          }}>
          Ưu đãi lên đến {discount}%
        </Text>
      );
    }
  };
  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor="#00185830"
        onPress={() => {
          navigation.push('DetailProduct', {id: item._id, type: item.type});
        }}>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 14,
            marginBottom: 8,
            flexDirection: 'row',
          }}>
          <Image
            // source={{
            //   uri: item?.imagesPet ? item?.imagesPet[0] : item?.arrProduct[0],
            // }}
            style={{width: 90, height: 90, borderRadius: 10}}
          />

          <View style={{marginLeft: 12}}>
            {discountShow(item?.discount)}

            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'ProductSansBold',
                fontSize: 16,
                color: '#001858',
                marginTop: 6,
              }}>
                aaaaaaaaaa
              {item?.namePet ? item?.namePet : item?.nameProduct}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'ProductSans',
                  marginRight: 10,
                }}>
                20 phút
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: '#001858',
                  marginRight: 8,
                  borderRadius: 2,
                }}
              />
              <Text
                style={{
                  fontFamily: 'ProductSans',
                  marginRight: 10,
                }}>
                1.7 Km
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: '#001858',
                  marginRight: 8,
                  borderRadius: 2,
                }}
              />
              <AntDesign name="star" size={14} color="#FFC20F" />

              <Text style={{flexGrow: 1}}>{item?.rate}</Text>
            </View>
            <View>
              {priceDiscount(
                item?.pricePet ? item?.pricePet : item?.priceProduct,
                item?.discount,
              )}
            </View>
            <Icon
                onPress={() => handleDeleteFavorite(item.id)}
                name={handleLike}
                size={24}
                color="#F582AE"
              />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#001858',
  },
  discount: {
    fontFamily: 'ProductSans',
    marginLeft: 10,
    color: '#656565',
    textDecorationLine: 'line-through',
  },
});
export default ListItem;