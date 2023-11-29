import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
export default function SilderItem({item}) {
  const data = item?.data;
  const navigation = useNavigation()
  const renderText = () => {
    if (item?.distribute === 'discount' && data?.type === 0) {
      return (
        <>
          <Text style={styles.h1}>Giảm giá{`\nđến ${data.discount}`}%</Text>
          <Text style={styles.h2}>
            {'Top Thú Cưng\ngiảm giá nhiều nhất nhất!'}
          </Text>
        </>
      );
    }
    if (item?.distribute === 'sold' && data?.type === 0) {
      return (
        <>
          <Text style={styles.h1}>
            Đã bán được{`\n${data.quantitySold}`} sản phẩm
          </Text>
          <Text style={styles.h2}>{'Top Thú Cưng bán chạy nhất!'}</Text>
        </>
      );
    }
    if (item?.distribute === 'discount' && data?.type === 1) {
      return (
        <>
          <Text style={styles.h1}>Giảm giá{`\nđến ${data.discount}`}%</Text>
          <Text style={styles.h2}>
            {'Top sản phẩm\ngiảm giá nhiều nhất nhất!'}
          </Text>
        </>
      );
    }
    if (item?.distribute === 'sold' && data?.type === 1) {
      return (
        <>
          <Text style={styles.h1}>
            Đã bán được{`\n${data.quantitySold}`} sản phẩm
          </Text>
          <Text style={styles.h2}>{'Top sản phẩm bán chạy nhất!'}</Text>
        </>
      );
    }
  };
  return (
    <Pressable
      onPress={() =>
        navigation.push('DetailProduct', {id: data?._id, type: data?.type})
      }
      style={styles.container}>
      <Image
        source={{
          uri: item?.data?.arrProduct
            ? item?.data?.arrProduct[0]
            : item?.data?.imagesPet[0],
        }}
        style={styles.img}
      />
      <LinearGradient
        style={styles.content}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['rgba(243, 210, 193,1)', 'rgba(254, 246, 228,0.2)']}>
        {renderText()}
        <Text style={styles.h3}>{'Click để biết thêm thông tin chi tiết'}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  img: {
    flex: 1,
    width: '89%',
    borderRadius: 8,
  },
  content: {
    borderRadius: 8,
    padding: 20,
    position: 'absolute',
    flex: 1,
    width: '89%',
    height: 200,
  },
  h1: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
    fontSize: 25,
  },
  h2: {
    fontFamily: 'ProductSans',
    color: '#001858',
    fontSize: 13,
  },
  h3: {
    fontFamily: 'ProductSans',
    color: '#333233',
    fontSize: 10,
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
});
