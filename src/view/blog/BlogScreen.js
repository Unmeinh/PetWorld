import {
  ScrollView, Text,
  View, FlatList,
  ActivityIndicator,
  SafeAreaView, TouchableOpacity,
  TouchableHighlight, Image, 
} from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import styles from '../../styles/blog.style';
import ItemBlog from '../../component/items/ItemBlog';
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import { useSelector, useDispatch } from "react-redux";
import { selectUserLogin, userSelectStatus } from '../../redux/selectors/userSelector';
import { listBlogSelector, blogCanLoadMore } from '../../redux/selectors/blogSelector';
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer';
import { fetchBlogs, fetchBlogsPage } from '../../redux/reducers/blog/blogReducer';
import { RefreshControl } from "react-native-gesture-handler";
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

const BlogScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoLogin = useSelector(selectUserLogin);
  const canLoadingMore = useSelector(blogCanLoadMore);
  const blogs = useSelector(listBlogSelector);
  const [extraBlogs, setextraBlogs] = useState([]);
  const [isFocusBlog, setisFocusBlog] = useState(false);
  const uSelectStatus = useSelector(userSelectStatus);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
  const [isLoader, setisLoader] = useState(true);
  const [page, setpage] = useState(1);
  const [isLoadingMore, setisLoadingMore] = useState(false);

  function OpenAccount() {
    navigation.navigate('MyPage');
  }

  function OpenNewBlog() {
    navigation.navigate('NewBlog');
  }

  async function PickingImage() {
    try {
      var response = await openPicker({
        mediaType: 'image',
        selectedAssets: 'Images',
        doneTitle: 'Xong',
      });
      for (let i = 0; i < response.length; i++) {
        const res = response[i];
        if (res?.path.indexOf('file://') < 0 && res?.path.indexOf('content://') < 0) {
          res.path = 'file://' + res.path;
          response.splice(i, 1, res);
        }
      }
      navigation.navigate('NewBlog', { arr_Picked: response });
    } catch (error) {
      console.log(error);
    }
  }

  function onLoadMore() {
    if (canLoadingMore) {
      if (!isLoadingMore) {
        let pageMore = page + 1;
        setpage(pageMore);
        dispatch(fetchBlogs(pageMore));
        setisLoadingMore(true);
      }
    } else {
      Toast.show({
        type: 'warning',
        position: 'top',
        text1: 'Đã xem hết blog hiện có!'
      })
    }
  }

  useEffect(() => {
    if (isFocusBlog) {
      if (uSelectStatus == 'being idle') {
        setsrcAvatar({ uri: String(infoLogin.avatarUser) })
      }
    }
  }, [uSelectStatus]);

  useEffect(() => {
    if (isFocusBlog) {
      if (!blogs) {
        setisLoader(true);
        dispatch(fetchBlogs(0));
      }
      if (blogs.length <= 0) {
        setisLoader(true);
        dispatch(fetchBlogs(0));
      }
      if (blogs.length > 0 && page > 1) {
        dispatch(fetchBlogsPage([page, true]));
      }
    }
  }, [isFocusBlog]);

  useEffect(() => {
    if (blogs != undefined) {
      let clone = [...extraBlogs];
      clone = blogs;
      setextraBlogs(clone);
      setisLoader(false);
      setisRefreshing(false);
      setisLoadingMore(false);
    }
  }, [blogs]);

  // useEffect(() => {
  //   if (canLoadingMore) {
  //     dispatch(fetchBlogs(page));
  //   }
  // }, [page, canLoadingMore]);

  useEffect(() => {
    const unsubFocus = navigation.addListener('focus', () => {
      dispatch(fetchInfoLogin());
      setisFocusBlog(true);
      return () => {
        unsubFocus.remove();
      };
    });

    const unsubBlur = navigation.addListener('blur', () => {
      setisFocusBlog(false);
      return () => {
        unsubBlur.remove();
      };
    });

    const unsubRemove = navigation.addListener('beforeRemove', () => {
      setisFocusBlog(false);
      return () => {
        unsubRemove.remove();
      };
    });

  }, [navigation]);

  const ReloadData = React.useCallback(() => {
    setisRefreshing(true);
    setisLoadingMore(false);
    setpage(1);
    dispatch(fetchBlogs(0));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <View style={styles.container}>
        <View style={[styles.viewInfoHead, { shadowColor: '#000', elevation: 3 }]}>
          {
            (isLoader)
              ?
              <>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <ShimmerPlaceHolder
                    shimmerStyle={styles.imageAvatar} />
                  <ShimmerPlaceHolder
                    shimmerStyle={[styles.textHint, { marginTop: 0, borderRadius: 5, }]} />
                </View>
                <ShimmerPlaceHolder
                  shimmerStyle={{ width: 27, height: 27, borderRadius: 5, }} />
              </>
              :
              <>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                      style={styles.imageAvatar} />
                  </TouchableOpacity>
                  <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} onPress={OpenNewBlog} activeOpacity={0.5}>
                    <Text style={[styles.textHint, { marginTop: 0 }]}>Bạn muốn chia sẻ điều gì?</Text>
                  </TouchableHighlight>
                </View>
                <TouchableHighlight underlayColor={'#8BD3DD'} onPress={PickingImage} activeOpacity={0.5}>
                  <Entypo name='folder-images' size={27} color={'#001858'} />
                </TouchableHighlight>
              </>
          }

        </View>
        {
          (isLoader)
            ?
            <ScrollView>
              <View style={{ marginBottom: 65 }}>
                <ItemBlogLoader />
                <ItemBlogLoader />
              </View>
            </ScrollView>
            :
            <View>
              {
                (blogs)
                  ? <FlatList data={blogs} scrollEnabled={true}
                    extraData={extraBlogs}
                    ListFooterComponent={
                      (canLoadingMore && blogs.length > 0) ? (
                        <ActivityIndicator
                          size="large"
                          color={'#F582AE'}
                          style={{ marginBottom: 145, marginTop: 10 }}
                        />
                      ) : <View style={{ marginBottom: 135 }} />
                    }
                    ListEmptyComponent={<View style={styles.viewOther}>
                      <LottieView
                        source={require('../../assets/viewBlog.json')}
                        autoPlay loop
                        style={{ width: '100%', aspectRatio: 1 }}
                      />
                      <Text style={[styles.textHint, { marginTop: 30 }]}>Không có blog nào..</Text>
                    </View>}
                    onEndReachedThreshold={0.1}
                    onEndReached={onLoadMore}
                    initialNumToRender={5}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={5}
                    // windowSize={10}
                    renderItem={({ item, index }) =>
                      <ItemBlog key={index} blog={item}
                        index={index} info={infoLogin} listLength={blogs.length} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                      <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={0} />
                    } />
                  : <View style={styles.viewOther}>
                    <LottieView
                      source={require('../../assets/viewBlog.json')}
                      autoPlay loop
                      style={{ width: '100%', aspectRatio: 1 }}
                    />
                    <Text style={[styles.textHint, { marginTop: 30 }]}>Không có blog nào..</Text>
                  </View>
              }
            </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default memo(BlogScreen);