import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {openPicker} from '@baronha/react-native-multiple-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Loading from '../../component/Loading';
import {CreateRating} from '../../api/RestApi';
import {useDispatch} from 'react-redux';
import {
  getBillDelivered,
  getBillReview,
} from '../../redux/reducers/shop/billSlice';
const Rating = ({navigation, route}) => {
  const idProduct = route.params?.items;
  const type = route.params?.type;
  const idBill = route.params?.idBill;
  const [rating, setRating] = useState([true, true, true, true, true]);
  const [feedback, setFeedback] = useState('Rất tốt');
  const [review, setReview] = useState('');
  const [listImage, setListImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChangeText = text => {
    if (text.length <= 300) {
      setReview(text);
    }
  };
  const updateFeedback = (newRating = 5) => {
    const filledStars = newRating.filter(isStarFilled => isStarFilled).length;
    switch (filledStars) {
      case 1:
        setFeedback('Không hài lòng');
        break;
      case 2:
        setFeedback('Tệ');
        break;
      case 3:
        setFeedback('Hài lòng');
        break;
      case 4:
        setFeedback('Tốt');
        break;
      case 5:
        setFeedback('Rất tốt');
        break;
      default:
        setFeedback('Rất tốt');
    }
  };
  const handleStarClick = (index = 5) => {
    const newRating = rating.map((_, i) => i <= index);
    setRating(newRating);
    updateFeedback(newRating);
  };
  const converData = () => {
    if (type === 0) {
      return idProduct?.map(item => item[0]._id);
    } else {
      return idProduct?.map(item => item._id);
    }
  };
  const onImagePicked = async () => {
    try {
      if (listImage.length >= 5) {
        Toast.show({
          type: 'error',
          text1: 'Bạn chỉ có thể thêm tối đa 5 ảnh!',
          position: 'top',
        });
      } else {
        let response = await openPicker({
          mediaType: 'image',
          selectedAssets: 'Images',
          doneTitle: 'Xong',
          maxSelectedAssets: 5 - listImage.length,
        });
        for (let i = 0; i < response.length; i++) {
          const res = response[i];
          if (
            res?.path.indexOf('file://') < 0 &&
            res?.path.indexOf('content://') < 0
          ) {
            res.path = 'file://' + res.path;
            response.splice(i, 1, res);
          }
        }
        setListImage([...listImage, ...response]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ImageHorizontal = ({item, index, callBack}) => {
    function RemoveImage() {
      let i = index;
      let length = listImage.length;
      let images = [];
      if (length <= 1) {
        images = [];
        setListImage(images);
      } else {
        images = [...listImage];
        images.splice(i, 1);
        setListImage(images);
      }
    }

    return (
      <View style={{marginLeft: 10}}>
        <Image
          style={{height: 65, width: 65, borderRadius: 5}}
          source={{uri: item.path}}
          key={item.index}
        />
        <View style={styles.viewDeleteImage}>
          <TouchableOpacity
            style={styles.buttonDeleteImage}
            onPress={RemoveImage}>
            <Feather name="x" size={12} color={'#001858'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleRating = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append(
      'ratingNumber',
      rating.filter(value => value === true).length,
    );
    formData.append('contentReview', review);
    if (listImage.length > 0) {
      for (const element of listImage) {
        let dataImage = {
          uri:
            Platform.OS === 'android'
              ? element.path
              : element.path.replaceAll('file://', ''),
          name: element.fileName,
          type: 'multipart/form-data',
        };
        formData.append('imageReview', dataImage);
      }
    }

    for (const element of converData()) {
      formData.append('idProduct', element);
    }
    const result = await CreateRating(
      formData,
      {
        'Content-Type': 'multipart/form-data',
      },
      idBill,
    );

    if (result.success) {
      dispatch(getBillDelivered());
      dispatch(getBillReview());
      navigation.goBack();
    } else {
      console.log(result.message);
    }

    setLoading(false);
  };
  useEffect(() => {
    const requestExternalStoragePermission = async () => {
      if (Platform.OS === 'android') {
        const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (result === RESULTS.DENIED) {
          const permissionResult = await request(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          );
          if (permissionResult === RESULTS.GRANTED) {
            console.log('Quyền truy cập bộ nhớ được cấp.');
          }
        }
      }
    };

    requestExternalStoragePermission();
  }, []);

  return (
    <View style={{backgroundColor: '#FEF6E4', flex: 1}}>
      <HeaderTitle nav={navigation} colorHeader="#FEF6E4" />
      <View style={{padding: 16}}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'ProductSansBold',
            color: '#001858',
            fontSize: 16,
          }}>
          Vui lòng đánh giá sản phẩm
        </Text>
      </View>
      {feedback !== '' && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#F582AE',

            fontFamily: 'ProductSansBold',
          }}>
          {feedback}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        {rating.map((isStarFilled, index) => (
          <IconAnt
            key={index.toString()}
            name={isStarFilled ? 'star' : 'staro'}
            color={'#FFC529'}
            size={40}
            onPress={() => handleStarClick(index)}
          />
        ))}
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Hãy viết đánh giá của bạn"
          multiline
          value={review}
          onChangeText={handleChangeText}
        />
        <Text style={styles.characterCount}>{review.length}/300</Text>
      </View>
      <View style={{padding: 16}}>
        <Text
          style={[
            {
              color: 'rgba(0, 24, 88, 0.80)',
              marginLeft: 10,
            },
            styles.titleInput,
          ]}>
          Ảnh sản phẩm (Tối đa 5 ảnh)
        </Text>
        <View style={{height: 75, paddingTop: 10, flexDirection: 'row'}}>
          <TouchableOpacity onPress={onImagePicked}>
            <View
              style={{
                backgroundColor: '#F3D2C1',
                height: '100%',
                aspectRatio: 1 / 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                overflow: 'hidden',
              }}>
              <Entypo name="camera" size={23} color={'rgba(0, 24, 88, 0.80)'} />
            </View>
          </TouchableOpacity>
          {listImage.length > 0 ? (
            <FlatList
              horizontal
              data={listImage}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ImageHorizontal index={index} item={item} />
              )}
            />
          ) : (
            ''
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRating}>
        <Text style={styles.textButton}>Xác nhận</Text>
      </TouchableOpacity>
      {loading ? <Loading /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    height: 150,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    color: '#888',
  },
  viewDeleteImage: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  buttonDeleteImage: {
    backgroundColor: '#fff',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {fontFamily: 'ProductSansBold', fontSize: 16, color: '#001858'},
  button: {
    height: 40,
    backgroundColor: '#F582AE',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 5,
  },
});

export default Rating;
