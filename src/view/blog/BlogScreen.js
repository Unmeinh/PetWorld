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
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID, userSelectStatus } from '../../redux/selectors/userSelector';
import { selectBlogs, blogSelectStatus } from '../../redux/selectors/blogSelector';
import { fetchInfoLogin } from '../../redux/reducers/user/userReducer';
import { fetchBlogs } from '../../redux/reducers/blog/blogReducer';
import { RefreshControl } from "react-native-gesture-handler";
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';

const BlogScreen = ({ scrollRef, onScrollView }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoLogin = useSelector(selectUserByID);
  const arr_blog = useSelector(selectBlogs);
  const uSelectStatus = useSelector(userSelectStatus);
  const bSelectStatus = useSelector(blogSelectStatus);
  const [isRefreshing, setisRefreshing] = useState(false);
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
  const [srcAvatar, setsrcAvatar] = useState(require('../../assets/images/error.png'));
  const [isLoader, setisLoader] = useState(true);
  console.log("Render BlogScreen");

  useEffect(() => {
    if (bSelectStatus == 'being idle') {
      setisLoader(false);
    }
  }, [bSelectStatus]);

  useEffect(() => {
    if (uSelectStatus == 'being idle') {
      setsrcAvatar({uri: String(infoLogin.avatarUser)})
    }
  }, [uSelectStatus]);


  React.useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      dispatch(fetchInfoLogin());
      dispatch(fetchBlogs());
      return () => {
        unsub.remove();
      };
    });

    return unsub;
  }, [navigation]);

  function OpenAccount() {
    navigation.navigate('MyPage');
  }

  function OpenNewPost() {
    navigation.navigate('NewPost');
  }

  function PickingImage() {

  }

  const ReloadData = React.useCallback(() => {
    setisRefreshing(true);
    setTimeout(() => {
      setisRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <ScrollView style={{ width: '100%' }} ref={scrollRef}
        onScroll={onScrollView}>
        <View style={styles.container}>
          <View style={[styles.viewInfoHead, { shadowColor: '#000', elevation: 3 }]}>
            {
              (isLoader)
                ?
                [
                  <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <ShimmerPlaceHolder
                      shimmerColors={colorLoader}
                      shimmerStyle={styles.imageAvatar} />
                    <ShimmerPlaceHolder
                      shimmerColors={colorLoader}
                      shimmerStyle={styles.textHint} />
                  </View>,

                  <ShimmerPlaceHolder
                    shimmerColors={colorLoader}
                    shimmerStyle={{ width: 27, height: 27 }} />
                ]
                :
                [
                  <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                      <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/images/error.png'))}
                        style={styles.imageAvatar} />
                    </TouchableOpacity>
                    <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} onPress={OpenNewPost} activeOpacity={0.5}>
                      <Text style={styles.textHint}>Bạn muốn chia sẻ điều gì?</Text>
                    </TouchableHighlight>
                  </View>,

                  <TouchableHighlight underlayColor={'#8BD3DD'} onPress={PickingImage} activeOpacity={0.5}>
                    <Entypo name='folder-images' size={27} color={'#001858'} />
                  </TouchableHighlight>
                ]
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
                  (arr_blog.length > 0)
                    ?
                    <FlatList data={arr_blog} scrollEnabled={false}
                      renderItem={({ item, index }) => <ItemBlog key={item._id} blog={item} navigation={navigation}
                        info={infoLogin} openAcc={OpenAccount} />}
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