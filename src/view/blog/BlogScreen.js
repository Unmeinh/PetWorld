import {
  ScrollView, Text,
  View, ActivityIndicator,
  SafeAreaView, TouchableOpacity,
  TouchableHighlight, Image, FlatList
} from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import styles from '../../styles/blog.style';
import ItemBlog from '../../component/items/ItemBlog';
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import { useSelector, useDispatch } from "react-redux";
import { selectUserLogin, userSelectStatus } from '../../redux/selectors/userSelector';
import { listBlogSelector, blogSelectStatus } from '../../redux/selectors/blogSelector';
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer';
import { fetchBlogs } from '../../redux/reducers/blog/blogReducer';
import { RefreshControl } from "react-native-gesture-handler";
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const BlogScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoLogin = useSelector(selectUserLogin);
  const blogs = useSelector(listBlogSelector);
  const [extraBlogs, setextraBlogs] = useState([]);
  const [isFocusBlog, setisFocusBlog] = useState(false);
  const uSelectStatus = useSelector(userSelectStatus);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/loading.png'));
  const [isLoader, setisLoader] = useState(true);
  const [page, setpage] = useState(1);
  const [canLoadingMore, setcanLoadingMore] = useState(false);
  const [isLoadingMore, setisLoadingMore] = useState(false);

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
      } else {
        if (blogs.length <= 0) {
          setisLoader(true);
          dispatch(fetchBlogs(0));
        }
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
      setcanLoadingMore(false);
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
      navigation.navigate('NewBlog', { arr_Picked: response });
    } catch (error) {
      console.log(error);
    }
  }

  function onLoadMore() {
    if (!isLoadingMore) {
      let pageMore = page + 1;
      setcanLoadingMore(true);
      setpage(pageMore);
      dispatch(fetchBlogs(pageMore));
      setisLoadingMore(true);
    }
  }

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
                    shimmerStyle={styles.textHint} />
                </View>
                <ShimmerPlaceHolder
                  shimmerStyle={{ width: 27, height: 27 }} />
              </>
              :
              <>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                    <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                      style={styles.imageAvatar} />
                  </TouchableOpacity>
                  <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} onPress={OpenNewBlog} activeOpacity={0.5}>
                    <Text style={styles.textHint}>Bạn muốn chia sẻ điều gì?</Text>
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
                (blogs.length > 0)
                  ?
                  <FlatList data={blogs} scrollEnabled={true}
                    extraData={extraBlogs}
                    ListFooterComponent={
                      canLoadingMore ? (
                        <ActivityIndicator
                          size="large"
                          color={'#F582AE'}
                          style={{ marginBottom: 145, marginTop: 10 }}
                        />
                      ) : null
                    }
                    onEndReachedThreshold={0.1}
                    onEndReached={onLoadMore}
                    initialNumToRender={5}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={5}
                    windowSize={10}
                    renderItem={({ item, index }) =>
                      <ItemBlog key={index} blog={item}
                        index={index} info={infoLogin} listLength={blogs.length} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                      <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={0} />
                    } />
                  :
                  <View style={styles.viewOther}>
                    <MaterialCommunityIcons name='post-outline' size={70} color={'rgba(0, 0, 0, 0.5)'} />
                    <Text style={styles.textHint}>Không có bài viết nào..</Text>
                  </View>
              }
            </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default memo(BlogScreen);