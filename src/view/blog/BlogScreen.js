import {
  ScrollView,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, memo} from 'react';
import styles from '../../styles/blog.style';
import ItemBlog from '../../component/items/ItemBlog';
import ItemBlogLoader from '../../component/items/ItemBlogLoader';
import AutoHeightImage from 'react-native-auto-height-image';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID } from '../../redux/selectors/userSelector';
import { selectInfoLogin } from '../../redux/actions/userAction';
import { RefreshControl } from "react-native-gesture-handler";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const BlogScreen = ({scrollRef, onScrollView}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoLogin = useSelector(selectUserByID);
  const arr_blog = useSelector((state) => state.listBlog);
  const [isRefreshing, setisRefreshing] = useState(false);
  const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
  const [srcAvatar, setsrcAvatar] = useState(
    require('../../assets/images/error.png'),
  );
  const [isLoader, setisLoader] = useState(() => true);
  React.useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      dispatch(selectInfoLogin('001'));
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

  function PickingImage() {}

  return (
    <SafeAreaView style={{backgroundColor: '#FEF6E4', flex: 1}}>
      <ScrollView
        style={{width: '100%'}}
        ref={scrollRef}
        onScroll={onScrollView}>
        <View style={styles.container}>
          <View
            style={[styles.viewInfoHead, {shadowColor: '#000', elevation: 3}]}>
            {isLoader
              ? [
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ShimerPlaceHolder
                      shimmerColors={colorLoader}
                      shimmerStyle={styles.imageAvatar}
                    />
                    <ShimerPlaceHolder
                      shimmerColors={colorLoader}
                      shimmerStyle={styles.textHint}
                    />
                  </View>,

                  <ShimerPlaceHolder
                    shimmerColors={colorLoader}
                    shimmerStyle={{width: 27, height: 27}}
                  />,
                ]
              : [
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                      <Image
                        source={srcAvatar}
                        onError={() =>
                          setsrcAvatar(require('../../assets/images/error.png'))
                        }
                        style={styles.imageAvatar}
                      />
                    </TouchableOpacity>
                    <TouchableHighlight
                      underlayColor={'rgba(0, 0, 0, 0.2)'}
                      onPress={OpenNewPost}
                      activeOpacity={0.5}>
                      <Text style={styles.textHint}>
                        Bạn muốn chia sẻ điều gì?
                      </Text>
                    </TouchableHighlight>
                  </View>,

                  <TouchableHighlight
                    underlayColor={'#8BD3DD'}
                    onPress={PickingImage}
                    activeOpacity={0.5}>
                    <Entypo name="folder-images" size={27} color={'#001858'} />
                  </TouchableHighlight>,
                ]}
          </View>
          {isLoader ? (
            <View>
              <ItemBlogLoader />
              <ItemBlogLoader />
            </View>
          ) : (
            <View>
              {arr_blog.length > 0 ? (
                <FlatList
                  data={arr_blog}
                  scrollEnabled={false}
                  renderItem={({item, index}) => (
                    <ItemBlog
                      key={item._id}
                      blog={item}
                      navigation={navigation}
                      info={userLogin}
                      openAcc={OpenAccount}
                      isRefresh={isRefresh}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <View style={styles.viewOther}>
                  {/* <AutoHeightImage source={require('../../assets/images/no_post.png')}
                        width={(Dimensions.get("window").width * 75) / 100} /> */}
                  <Text style={styles.textHint}>Không có bài viết nào..</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(BlogScreen);
