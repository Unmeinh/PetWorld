import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  listProductSelector,
  selectFilterIdSelector,
  statusAddProductToCart,
  messageCart,
  listCartSelector,
} from '../../redux/selector';
import {useDispatch, useSelector} from 'react-redux';
import SliderImage from '../../component/detailProduct/SliderImage';
import Icon from 'react-native-vector-icons/Ionicons';
import ShopTag from '../../component/shop/ShopTag';
import ListHorizontal from '../../component/list/ListHorizontal';
import {
  addCart,
  addProductToCart,
  setStatusMessageCart,
} from '../../redux/reducers/shop/CartReduces';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
const {width} = Dimensions.get('screen');

function DetailProduct({navigation, route}) {
  const {item} = route.params;
  const type = item.type;
  const dispatch = useDispatch();
  const listProduct = useSelector(listProductSelector);
  const statusDetail = 'idle';
  const category = useSelector(selectFilterIdSelector);
  const statusAdd = useSelector(statusAddProductToCart);
  const countCart = useSelector(listCartSelector);
  const [count, setCount] = useState(countCart?.length);
  const message = useSelector(messageCart);
  const [like, setLike] = useState(false);
  const [showDes, setShowDes] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const listImage = item.arrProduct ? item.arrProduct : item.imagesPet;
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const AnimatedPressible = Animated.createAnimatedComponent(Pressable);
  const handleLike = like ? 'heart' : 'heart-outline';
  const iconDes = showDes ? 'chevron-up-outline' : 'chevron-down-outline';
  const priceDiscount = (price, discount) => {
    if (discount > 0) {
      return (
        <Text style={styles.price}>
          {(price - (price * discount) / 100)?.toLocaleString('vi-VN') + 'đ'}{' '}
          <Text style={styles.discount}>
            {price.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.price}>{price?.toLocaleString('vi-VN') + 'đ'}</Text>
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
    ext0rapolate: 'clamp',
  });
  const textColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: ['#f582ae', '#001858'],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    const slideAnimationAni = Animated.timing(slideAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    });

    const opacityAnimationAni = Animated.timing(opacityAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    });

    const animation = Animated.parallel([
      slideAnimationAni,
      opacityAnimationAni,
    ]);
    animation.start();

    return () => {
      animation.stop();
      slideAnimation.setValue(0);
      opacityAnimation.setValue(0);
    };
  }, [isVisible]);
  useEffect(() => {
    setCount(countCart?.length);
  }, [navigation, statusAdd]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(setStatusMessageCart(''));
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, [message]);
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
        <AnimatedPressible
          onPress={() => {
            navigation.goBack();
            setIsVisible(!isVisible);
          }}
          style={[styles.iconBack, {backgroundColor: headerIconBackground}]}>
          <AnimatedIcon name="arrow-back" size={24} color={headerIcon} />
        </AnimatedPressible>
        <AnimatedPressible
          onPress={() => {
            navigation.navigate('CartScreen');
          }}
          style={[styles.iconBack, {backgroundColor: headerIconBackground}]}>
          <View
            style={{
              width: 16,
              height: 16,
              position: 'absolute',
              backgroundColor: '#F582AE',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              top: 2,
              right:0,
              zIndex:999
            }}>
            <Text style={{fontSize: 12, fontFamily: 'ProductSans'}}>
              {count}
            </Text>
          </View>
          <AnimatedIcon name="cart-outline" size={24} color={headerIcon} />
        </AnimatedPressible>
      </Animated.View>
      {statusAdd === 'loading' ? (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              zIndex: 2,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          {statusAdd == 'loading' ? (
            <ActivityIndicator size="large" color="#F582AE" />
          ) : null}
        </View>
      ) : null}
      <ScrollView
        style={{flex: 1, backgroundColor: '#FEF6E4'}}
        scrollEnabled={statusDetail === 'idle' ? true : false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <View>
          {statusDetail === 'idle' ? (
            <SliderImage data={listImage} />
          ) : (
            <ShimmerPlaceHolder shimmerStyle={styles.loaderImage} />
          )}
        </View>
        <View style={styles.content}>
          <Text
            style={{
              fontFamily: 'ProductSansBold',
              fontSize: 20,
              color: '#F582AE',
            }}>
            {statusDetail === 'idle' ? (
              priceDiscount(
                item.pricePet ? item.pricePet : item.priceProduct,
                item.discount,
              )
            ) : (
              <ShimmerPlaceHolder shimmerStyle={styles.loaderPrice} />
            )}
          </Text>

          {statusDetail === 'idle' ? (
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
                {item.namePet ? item.namePet : item.nameProduct}
              </Text>
              <Icon
                onPress={() => setLike(!like)}
                name={handleLike}
                size={24}
                color="#F582AE"
              />
            </View>
          ) : (
            <ShimmerPlaceHolder shimmerStyle={styles.loaderName} />
          )}
          {statusDetail === 'idle' ? (
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon name="star-sharp" size={16} color="#fcba03" />
              <Text style={{color: '#001858', marginLeft: 5}}>
                {item.rate}/5
              </Text>

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
                {item?.quantitySold?.toString()}
              </Text>
            </View>
          ) : (
            <ShimmerPlaceHolder shimmerStyle={styles.loaderName} />
          )}
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
          {statusDetail === 'idle' ? (
            <Text style={styles.textColor}>Thông tin chi tiết</Text>
          ) : (
            <ShimmerPlaceHolder
              shimmerStyle={[styles.loaderName, styles.textColor]}
            />
          )}
          <View style={styles.line}></View>
          {statusDetail === 'idle' ? (
            <View style={styles.content}>
              {type === 0 ? (
                <View
                  style={{
                    fontFamily: 'ProductSans',
                    color: '#656565',
                    flexDirection: 'column',
                  }}>
                  <Text style={styles.lineHeight}>
                    Tên thú cưng:
                    {item.namePet}
                    {'\n'}
                    Kích cỡ: {item.sizePet} {'\n'}Kích thước: rộng{' '}
                    {item.weightPet} cao {item.heightPet}
                  </Text>
                  {showDes ? (
                    <Text style={styles.lineHeight}>
                      Chi tiết: {item.detailPet}
                    </Text>
                  ) : (
                    <Text>...</Text>
                  )}
                </View>
              ) : (
                <Text style={styles.lineHeight}>
                  Tên sản phẩm:
                  {item?.nameProduct}
                  {'\n'}
                  {showDes ? (
                    <Text style={styles.lineHeight}>
                      Chi tiết: {item?.detailProduct}
                    </Text>
                  ) : (
                    <Text>...</Text>
                  )}
                </Text>
              )}
            </View>
          ) : (
            <>
              <ShimmerPlaceHolder
                shimmerStyle={[styles.loaderName, styles.textColor]}
              />
              <ShimmerPlaceHolder
                shimmerStyle={[styles.loaderName, styles.textColor]}
              />
            </>
          )}
          <View style={[styles.line, {marginTop: 8}]}></View>
          {statusDetail === 'idle' ? (
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
          ) : null}
          <View
            style={{
              width: width,
              height: 8,
              backgroundColor: '#ccc',
              opacity: 0.5,
              marginTop: 8,
            }}
          />
          <ShopTag data={item.idShop} isLoading={statusDetail} />
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
              isLoader={statusDetail}
              type={1}
            />
          </View>
        </Animated.View>
      </ScrollView>
      {statusDetail === 'idle' ? (
        <View style={styles.bottomButton}>
          <TouchableOpacity style={[styles.buttonContact, styles.buttonSheet]}>
            <Icon name="chatbubbles-outline" size={24} color={'#001858'} />
            <Text style={styles.textButton}> Liên hệ</Text>
          </TouchableOpacity>
          {type === 0 ? (
            <TouchableOpacity
              style={[styles.buttonBooking, styles.buttonSheet]}>
              <Icon name="bookmarks-outline" size={22} color={'#001858'} />
              <Text style={styles.textButton}>Đặt lịch</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                dispatch(addProductToCart({idProduct: item._id, amount: 1}));
              }}
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

          <TouchableOpacity
            style={[styles.buttonBuy, styles.buttonSheet]}
            onPress={() => navigation.navigate('BuyNow', {item: item})}>
            <Text style={[styles.textButton, styles.textButtonBuy]}>
              Mua ngay
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
    justifyContent: 'flex-end',
    zIndex: 2,
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
  loaderImage: {
    width,
    height: 240,
  },
  loaderPrice: {
    width: 100,
    height: 12,
    borderRadius: 8,
  },
  loaderName: {
    width: 130,
    height: 12,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default DetailProduct;
