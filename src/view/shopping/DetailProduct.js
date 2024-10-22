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
  Image,
  FlatList,
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
  addProductToCart,
  setStatusMessageCart,
} from '../../redux/reducers/shop/CartReduces';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import SetAppointment from '../../component/modals/SetAppointment';
import Loading from '../../component/Loading';
import {
  GetDetailProduct,
  AddFavorite,
  DeleteFavorite,
  GetRating,
} from '../../api/RestApi';
import ReviewsItems from '../../component/detailProduct/ReviewsItem';
import ImageView from 'react-native-image-viewing';
const {width} = Dimensions.get('screen');

function DetailProduct({navigation, route}) {
  const {id, type} = route.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const listProduct = useSelector(listProductSelector);
  const [status, setStatus] = useState('idle');
  const category = useSelector(selectFilterIdSelector);
  const statusAdd = useSelector(statusAddProductToCart);
  const countCart = useSelector(listCartSelector);
  const [count, setCount] = useState(countCart?.length);
  const message = useSelector(messageCart);
  const [like, setLike] = useState(false);
  const [showDes, setShowDes] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isShowSetApm, setIsShowSetApm] = useState(false);
  const [page, setPage] = useState(1);
  const [rate, setRate] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [enableMore, setEnableMore] = useState(true);
  const [listImageProduct, setListImageProduct] = useState([]);

  const listImage = product?.arrProduct
    ? product?.arrProduct
    : product?.imagesPet;

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const AnimatedPressible = Animated.createAnimatedComponent(Pressable);
  const iconlike = like ? 'heart' : 'heart-outline';

  const handleLike = () => {
    setLike(!like);
    try {
      if (!like) {
        dispatch(AddFavorite({idProduct: product?._id}));
      } else {
        dispatch(DeleteFavorite({idProduct: product?._id}));
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
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

  const onOpenSetAppointment = () => {
    setIsShowSetApm(!isShowSetApm);
  };

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
  }, [navigation, statusAdd, countCart]);

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

  const getDetailProduct = async () => {
    setStatus('loading');
    if (id || type) {
      const res = await GetDetailProduct({id, type});
      if (res) {
        setProduct(res.data);
        setLike(res.data?.favorite);
      }
      setStatus('idle');
    }
  };
  const getRate = async () => {
    if (id || type) {
      const res = await GetRating(id, page);
      const data = res.data;
      if (data) {
        if (data.length > 0) {
          setRate([...rate, ...res.data]);
        } else {
          setEnableMore(false);
        }
      }
    }
  };

  useEffect(() => {
    getDetailProduct();
    return () => {
      setProduct({});
    };
  }, []);

  useEffect(() => {
    getRate();
  }, [page]);

  const loadMoreData = async () => {
    if (!isLoadingMore && enableMore) {
      setIsLoadingMore(true);
      setPage(page + 1);
      setIsLoadingMore(false);
    }
  };
  return (
    <>
      {product?.status !== 0 && status === 'idle' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#F3D2C1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../../assets/error.png')} />
          <Text style={[styles.textButton, {marginTop: 10}]}>
            Hiện sản phẩm này không còn bán
          </Text>
          <Pressable
            style={{
              width: '30%',
              height: 30,
              backgroundColor: '#F582AE',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={() => {
              navigation.goBack();
              setIsVisible(!isVisible);
            }}>
            <Text style={styles.textButton}>Thoát</Text>
          </Pressable>
        </View>
      ) : (
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
              style={[
                styles.iconBack,
                {backgroundColor: headerIconBackground},
              ]}>
              <AnimatedIcon name="arrow-back" size={24} color={headerIcon} />
            </AnimatedPressible>
            <AnimatedPressible
              onPress={() => {
                navigation.navigate('CartScreen');
              }}
              style={[
                styles.iconBack,
                {backgroundColor: headerIconBackground},
              ]}>
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
                  right: 0,
                  zIndex: 999,
                }}>
                <Text style={{fontSize: 12, fontFamily: 'ProductSans'}}>
                  {count}
                </Text>
              </View>
              <AnimatedIcon name="cart-outline" size={24} color={headerIcon} />
            </AnimatedPressible>
          </Animated.View>
          {statusAdd === 'loading' ? <Loading /> : null}
          <ScrollView
            style={{flex: 1, backgroundColor: '#FEF6E4'}}
            scrollEnabled={status === 'idle' ? true : false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}>
            <View>
              {status === 'idle' ? (
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
                {status === 'idle' ? (
                  priceDiscount(
                    product?.pricePet
                      ? product?.pricePet
                      : product?.priceProduct,
                    product?.discount,
                  )
                ) : (
                  <ShimmerPlaceHolder shimmerStyle={styles.loaderPrice} />
                )}
              </Text>

              {status === 'idle' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'ProductSansBold',
                      fontSize: 20,
                      color: '#001858',
                    }}>
                    {product?.namePet ? product?.namePet : product?.nameProduct}
                  </Text>
                  <Icon
                    onPress={handleLike}
                    name={iconlike}
                    size={24}
                    color="#F582AE"
                  />
                </View>
              ) : (
                <ShimmerPlaceHolder shimmerStyle={styles.loaderName} />
              )}
              {status === 'idle' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {product?.avgProduct ? (
                      <>
                        <Icon name="star-sharp" size={16} color="#fcba03" />
                        <Text style={{color: '#001858', marginLeft: 5}}>
                          {product?.avgProduct?.toFixed(1)}
                        </Text>

                        <Text
                          style={{
                            marginLeft: 5,
                            marginRight: 5,
                            color: '#ccc',
                          }}>
                          |
                        </Text>
                      </>
                    ) : null}

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
                      {product?.quantitySold?.toString()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginRight: 5,
                      color: '#001858',
                      fontFamily: 'ProductSans',
                    }}>
                    Số lượng:{' '}
                    {typeof product?.amountProduct != 'undefined'
                      ? product.amountProduct?.toString()
                      : product.amountPet?.toString()}
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
              {status === 'idle' ? (
                <Text style={styles.textColor}>Thông tin chi tiết</Text>
              ) : (
                <ShimmerPlaceHolder
                  shimmerStyle={[styles.loaderName, styles.textColor]}
                />
              )}
              <View style={styles.line}></View>
              {status === 'idle' ? (
                <View style={styles.content}>
                  {type === 0 ? (
                    <View
                      style={{
                        fontFamily: 'ProductSans',
                        color: '#656565',
                        flexDirection: 'column',
                      }}>
                      <Text style={styles.lineHeight}>
                        Tên thú cưng: {product.namePet}
                        {'\n'}
                        Kích cỡ:{' '}
                        {product.sizePet === 1
                          ? 'Nhỏ'
                          : product.sizePet === 2
                          ? 'Vừa'
                          : product.sizePet === 3
                          ? 'Lớn'
                          : product.sizePet}{' '}
                        {'\n'}Kích thước: Cân nặng {product.weightPet} chiều cao{' '}
                        {product.heightPet}
                      </Text>
                      {showDes ? (
                        <Text style={styles.lineHeight}>
                          Chi tiết: {product.detailPet}
                        </Text>
                      ) : (
                        <Text>...</Text>
                      )}
                    </View>
                  ) : (
                    <Text style={styles.lineHeight}>
                      Tên sản phẩm: {product?.nameProduct}
                      {'\n'}
                      {showDes ? (
                        <Text style={styles.lineHeight}>
                          Chi tiết: {product?.detailProduct}
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
              {status === 'idle' ? (
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
              <ShopTag data={product?.idShop} isLoading={status} />
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
                  title="Sản phẩm khác"
                  isLoader={status}
                  type={1}
                />
              </View>
            </Animated.View>
            {rate?.length > 0 ? (
              <Text
                style={{
                  fontFamily: 'ProductSansBold',
                  fontSize: 20,
                  color: '#001858',
                  marginLeft: 20,
                }}>
                Đánh giá
              </Text>
            ) : null}
            <FlatList
              data={rate}
              scrollEnabled={false}
              renderItem={({item}) => (
                <ReviewsItems
                  item={item}
                  setListImage={value => setListImageProduct(value)}
                />
              )}
              ListFooterComponent={
                isLoadingMore ? (
                  <ActivityIndicator
                    size="large"
                    color={'#F582AE'}
                    style={{marginBottom: 10}}
                  />
                ) : null
              }
              contentContainerStyle={{paddingBottom: 10}}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
            />
          </ScrollView>
          {status === 'idle' ? (
            <View style={styles.bottomButton}>
              <TouchableOpacity
                style={[styles.buttonContact, styles.buttonSheet]}>
                <Icon name="chatbubbles-outline" size={24} color={'#001858'} />
                <Text style={styles.textButton}> Liên hệ</Text>
              </TouchableOpacity>
              {type === 0 ? (
                <TouchableOpacity
                  onPress={onOpenSetAppointment}
                  style={[styles.buttonBooking, styles.buttonSheet]}>
                  <Icon name="bookmarks-outline" size={22} color={'#001858'} />
                  <Text style={styles.textButton}>Đặt lịch</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (product?.amountProduct > 0) {
                      dispatch(
                        addProductToCart({idProduct: product._id, amount: 1}),
                      );
                    } else {
                      ToastAndroid.show(
                        'Sản phẩm đã hết hàng',
                        ToastAndroid.SHORT,
                      );
                    }
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
                onPress={() => {
                  if (product?.amountProduct > 0 || product?.amountPet > 0) {
                    navigation.navigate('BuyNow', {item: product});
                  } else {
                    ToastAndroid.show(
                      'Sản phẩm đã hết hàng',
                      ToastAndroid.SHORT,
                    );
                  }
                }}>
                <Text style={[styles.textButton, styles.textButtonBuy]}>
                  Mua ngay
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {isShowSetApm && type == 0 ? (
            <SetAppointment
              isShow={isShowSetApm}
              callBack={onOpenSetAppointment}
              pet={product}
              shop={product.idShop}
            />
          ) : (
            ''
          )}
        </>
      )}
      <ImageView
        images={listImageProduct}
        imageIndex={0}
        visible={listImageProduct?.length > 0}
        onRequestClose={() => setListImageProduct([])}
      />
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
    flexBasis: 150,
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
    color: '#656565',
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
