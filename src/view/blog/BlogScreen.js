import {
  ScrollView, Text,
  View, Dimensions,
  SafeAreaView, TouchableOpacity,
  TouchableHighlight, Image, FlatList
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
import { listBlogSelector, blogSelectStatus } from '../../redux/selectors/blogSelector';
import { fetchInfoLogin, changeStatusPending } from '../../redux/reducers/user/userReducer';
import { fetchBlogs } from '../../redux/reducers/blog/blogReducer';
import { RefreshControl } from "react-native-gesture-handler";
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const BlogScreen = ({ scrollRef, onScrollView }) => {
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
  console.log("Rendering BlogScreen");

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
        dispatch(fetchBlogs());
      } else {
        if (blogs.length <= 0) {
          setisLoader(true);
          dispatch(fetchBlogs());
        }
      }
    }
  }, [isFocusBlog]);

  useEffect(() => {
    if (blogs != undefined) {
      setextraBlogs(blogs);
      if (isRefreshing) {
        setisRefreshing(false);
      }
      if (isLoader) {
        setisLoader(false);
      }
    }
  }, [blogs]);

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

  function OpenNewPost() {
    navigation.navigate('NewPost');
  }

  async function PickingImage() {
    try {
      var response = await openPicker({
        mediaType: 'image',
        selectedAssets: 'Images',
        doneTitle: 'Xong',
      });
      navigation.navigate('NewPost', { arr_Picked: response });
    } catch (error) {
      console.log(error);
    }
  }

  const ReloadData = React.useCallback(() => {
    setisRefreshing(true);
    dispatch(fetchBlogs());
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <ScrollView style={{ width: '100%' }} ref={scrollRef}
        onScroll={onScrollView}>
        <View style={styles.container} key={"viewScrollView"}>
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
                    <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} onPress={OpenNewPost} activeOpacity={0.5}>
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
              <View>
                <ItemBlogLoader />
                <ItemBlogLoader />
              </View>
              :
              <View>
                {
                  (blogs.length > 0)
                    ?
                    <FlatList data={blogs} scrollEnabled={false}
                      extraData={extraBlogs}
                      renderItem={({ item, index }) =>
                        <ItemBlog key={index} blog={item} info={infoLogin} />}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={ReloadData} progressViewOffset={0} />
                      } />
                    :
                    <View style={styles.viewOther}>
                      {/* <AutoHeightImage source={require('../../assets/images/no_post.png')}
                        width={(Dimensions.get("window").width * 75) / 100} /> */}
                      <Text style={styles.textHint}>Không có bài viết nào..</Text>
                    </View>
                }
              </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default memo(BlogScreen);