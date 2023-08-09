import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {productSelector} from '../../redux/selector';
import {useSelector} from 'react-redux';
import SliderImage from '../../component/detailProduct/SliderImage';
import Icon from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('screen');
export default function DetailProduct({navigation}) {
  const product = useSelector(productSelector);
  const [like, setLike] = useState(false);
  const [showDes, setShowDes] = useState(false)
  const handleLike = like ? 'heart' : 'heart-outline';
  const iconDes = showDes ?  'chevron-up-outline' : 'chevron-down-outline';
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FEF6E4'}}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(145, 142, 144, 0.49)',
            zIndex: 1,
            opacity: 1,
            width: 36,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 18,
            top: 12,
            left: 12,
          }}>
          <Icon name="arrow-back" size={24} color="#FEF6E4" />
        </TouchableOpacity>
        <SliderImage data={product.imagePet} />
      </View>
      <View style={styles.content}>
        <Text
          style={{
            fontFamily: 'ProductSansBold',
            fontSize: 20,
            color: '#F582AE',
          }}>
          {product.pricePet.toLocaleString('vi-VN') + 'đ'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'ProductSansBold',
              fontSize: 20,
              color: '#001858',
            }}>
            {product.namePet}
          </Text>
          <Icon
            onPress={() => setLike(!like)}
            name={handleLike}
            size={24}
            color="#F582AE"
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Icon name="star-sharp" size={16} color="#fcba03" />
          <Text style={{color: '#001858', marginLeft: 5}}>
            {product.rate}/5
          </Text>
          <Text style={{marginLeft: 5, marginRight: 5, color: '#ccc'}}>|</Text>
          <Text
            style={{
              marginLeft: 5,
              marginRight: 5,
              color: '#73726e',
              fontFamily: 'ProductSans',
            }}>
            Đã bán
          </Text>
          <Text
            style={{
              marginRight: 5,
              color: '#001858',
              fontFamily: 'ProductSans',
            }}>
            {product.sold}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width,
          height: 8,
          backgroundColor: '#ccc',
          opacity: 0.5,
          marginTop: 8,
        }}></View>

      <Text style={styles.textColor}>Thông tin chi tiết</Text>
      <View style={styles.line}></View>
      <View style={styles.content}>
        <View
          style={{
            fontFamily: 'ProductSans',
            color: '#656565',
            flexDirection: 'column',
          }}>
          <Text style={styles.lineHeight}>
            Tên thú cưng: {product.namePet + '\n'}Giống: Lai Mĩ{'\n'}Tuổi: 18 tháng
          </Text>
          {(showDes) ? <Text style={styles.lineHeight}>Mô tả: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.</Text>:<Text>...</Text>}
        </View>
      </View>
      <View style={[styles.line, {marginTop: 8}]}></View>
      <TouchableOpacity
        onPress={() => setShowDes(!showDes)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:8
        }}>
        <Text style={{fontFamily: 'ProductSans', color: '#F582AE'}}>
          {showDes ? 'Thu gọn':'Xem thêm'}
        </Text>
        <Icon name={iconDes} size={24} color="#F582AE" />
      </TouchableOpacity>
      <View
        style={{
          width: width,
          height: 8,
          backgroundColor: '#ccc',
          opacity: 0.5,
          marginTop: 8,
        }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
  },
  textColor: {
    fontFamily: 'ProductSansBold',
    color: '#001858',
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  line: {
    width: width,
    height: 1,
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  lineHeight:{
    lineHeight:20
  }
});
