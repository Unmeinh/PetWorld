import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  listProductSelector,
  productSelector,
  selectFilterIdSelector,
  shopOftheProductSelector,
} from '../../redux/selector';
import {useSelector} from 'react-redux';
import SliderImage from '../../component/detailProduct/SliderImage';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SharedElement} from 'react-navigation-shared-element';
import ShopTag from '../../component/shop/ShopTag';
import ListHorizontal from '../../component/list/ListHorizontal';
const {width} = Dimensions.get('screen');

function DetailProduct({navigation}) {
  const product = useSelector(productSelector);
  const shop = useSelector(shopOftheProductSelector);
  const listProduct = useSelector(listProductSelector);
  const category = useSelector(selectFilterIdSelector);
  const [like, setLike] = useState(false);
  const [showDes, setShowDes] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const listImage = product.imagePet ? product.imagePet : product.imageProduct;
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const handleLike = like ? 'heart' : 'heart-outline';
  const iconDes = showDes ? 'chevron-up-outline' : 'chevron-down-outline';
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <Text style={styles.price}>
          {(price - (price * discount) / 100).toLocaleString('vi-VN') + 'đ'}{' '}
          <Text style={styles.discount}>
            {price.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.price}>{price.toLocaleString('vi-VN') + 'đ'}</Text>
      );
    }
  };

  const slideAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 60;
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: ['rgba(254, 246, 228, 0)', 'rgba(254, 246, 228, 1)'],
    extrapolate: 'clamp',
  });

  const headerIconBackground = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: ['rgba(145, 142, 144, 0.49)', 'rgba(254, 246, 228, 0)'],
    extrapolate: 'clamp',
  });
  const headerIcon = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: ['#FEF6E4', '#f582ae'],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            height: HEADER_MAX_HEIGHT,
            backgroundColor: headerBackgroundColor,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setIsVisible(!isVisible);
          }}
          style={[styles.iconBack, {backgroundColor: headerIconBackground}]}>
          <AnimatedIcon name="arrow-back" size={24} color={headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          
          style={[styles.iconBack, {backgroundColor: headerIconBackground}]}>
          <AnimatedIcon name="cart-outline" size={24} color={headerIcon} />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        style={{flex: 1, backgroundColor: '#FEF6E4'}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <View>
          <SharedElement id={`item.${product.id}.image`}>
            <SliderImage data={listImage} />
          </SharedElement>
        </View>
        <View style={styles.content}>
          <SharedElement id={`item.${product.id}.price`}>
            <Text
              style={{
                fontFamily: 'ProductSansBold',
                fontSize: 20,
                color: '#F582AE',
              }}>
              <SharedElement id={`item.${product.id}.price`}>
                {priceDiscount(
                  product.pricePet ? product.pricePet : product.priceProduct,
                  product.discount,
                )}
              </SharedElement>
            </Text>
          </SharedElement>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <SharedElement id={`item.${product.id}.name`}>
              <Text
                style={{
                  fontFamily: 'ProductSansBold',
                  fontSize: 20,
                  color: '#001858',
                }}>
                {product.namePet ? product.namePet : product.nameProduct}
              </Text>
            </SharedElement>
            <Icon
              onPress={() => setLike(!like)}
              name={handleLike}
              size={24}
              color="#F582AE"
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Icon name="star-sharp" size={16} color="#fcba03" />
            <SharedElement id={`item.${product.id}.rate`}>
              <Text style={{color: '#001858', marginLeft: 5}}>
                {product.rate}/5
              </Text>
            </SharedElement>

            <Text style={{marginLeft: 5, marginRight: 5, color: '#ccc'}}>
              |
            </Text>
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
        <Animated.View
          style={{
            opacity: opacityAnimation,
            transform: [
              {
                translateY: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
          }}>
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
                Tên thú cưng: {product.namePet + '\n'}Giống: Lai Mĩ{'\n'}Tuổi:
                18 tháng
              </Text>
              {showDes ? (
                <Text style={styles.lineHeight}>
                  Mô tả: Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </Text>
              ) : (
                <Text>...</Text>
              )}
            </View>
          </View>
          <View style={[styles.line, {marginTop: 8}]}></View>
          <TouchableOpacity
            onPress={() => setShowDes(!showDes)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
            }}>
            <Text style={{fontFamily: 'ProductSans', color: '#F582AE'}}>
              {showDes ? 'Thu gọn' : 'Xem thêm'}
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
            }}
          />
          <ShopTag data={shop} />
          <View
            style={{
              width: width,
              height: 8,
              backgroundColor: '#ccc',
              opacity: 0.5,
              marginTop: 8,
            }}
          />
          <View style={{marginBottom: 10}}>
            <ListHorizontal
              data={listProduct}
              title="Sản phẩm liên quan"
              isLoader={false}
            />
          </View>
        </Animated.View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <TouchableOpacity style={[styles.buttonContact, styles.buttonSheet]}>
          <Icon name="chatbubbles-outline" size={24} color={'#001858'} />
          <Text style={styles.textButton}> Liên hệ</Text>
        </TouchableOpacity>
        {category === 1 ? (
          <TouchableOpacity style={[styles.buttonBooking, styles.buttonSheet]}>
            <Icon name="bookmarks-outline" size={22} color={'#001858'} />
            <Text style={styles.textButton}>Đặt lịch</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.buttonBooking,
              styles.buttonSheet,
              {flexDirection: category === 1 ? 'row' : 'column'},
            ]}>
            <Icon name="cart-outline" size={24} color={'#001858'} />
            <Text style={[styles.textButton, {fontSize: 12}]}>
              Thêm vào giỏ hàng
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.buttonBuy, styles.buttonSheet]}>
          <Text style={[styles.textButton, styles.textButtonBuy]}>
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    zIndex: 1,
    padding: 10,
  },
  textButtonBuy: {
    fontSize: 18,
  },
  textButton: {
    fontFamily: 'ProductSansBold',
    fontSize: 15,
    color: '#001858',
  },
  buttonSheet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'row',
  },
  buttonContact: {
    backgroundColor: '#F3D2C1',
    flexBasis: 100,
  },
  buttonBooking: {
    backgroundColor: '#F3D2C1',
    flexBasis: 110,
    borderLeftWidth: 1,
    borderColor: '#656565',
  },
  buttonBuy: {
    backgroundColor: '#F582AE',
    flexBasis: 200,
  },
  bottomButton: {
    width: width,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  lineHeight: {
    lineHeight: 20,
  },
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#F582AE',
    fontSize: 18,
  },
  discount: {
    fontFamily: 'ProductSans',
    marginLeft: 10,
    color: '#656565',
    textDecorationLine: 'line-through',
    fontSize: 13,
  },
  iconBack: {
    backgroundColor: 'rgba(145, 142, 144, 0.49)',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
});

export default React.memo(DetailProduct);
